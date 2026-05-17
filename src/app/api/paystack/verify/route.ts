import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { bookings } from "@/db/schema";
import { getEmailService } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings";
import {
  bookingCreatedCustomerEmail,
  bookingCreatedAdminEmail,
} from "@/lib/email-templates/booking";
import { logEmail } from "@/lib/email-logger";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}?error=missing-reference`,
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error(
      "PAYSTACK_SECRET_KEY is not configured in environment variables",
    );
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=payment-key-error`);
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      },
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Paystack API error:", {
        status: res.status,
        statusText: res.statusText,
        result,
      });

      // Check for specific Paystack error messages
      if (
        result?.message?.includes("Invalid Key") ||
        result?.code === "invalid_Key"
      ) {
        console.error("Paystack secret key is invalid or not authorized");
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}?error=payment-key-error`,
        );
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/?error=payment-failed`,
      );
    }

    if (result?.data?.status !== "success") {
      console.error(
        "Payment verification failed - transaction not successful:",
        result,
      );
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}?error=payment-failed`,
      );
    }

    const metadata = result.data.metadata;
    const trackingNumber = `BKG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const amount = result.data.amount;

    try {
      const db = getDb();

      const [created] = await db
        .insert(bookings)
        .values({
          name: metadata?.email?.split("@")[0] || "Guest",
          email:
            metadata?.email ||
            result.data.customer.email ||
            "no-email@example.com",
          phone: result.data.customer.phone || "",
          travelersCount: 1,
          paymentStatus: "PAID",
          paymentId: reference,
          paymentAmount: amount,
          paymentMethod: "card",
          termsAgreed: true,
          mediaConsent: false,
          isCustom: false,
        })
        .returning({ id: bookings.id });

      const bookingId = created.id;

      const emailService = getEmailService();
      const siteSettings = await getSiteSettings();

      if (emailService && siteSettings) {
        const customerEmail = bookingCreatedCustomerEmail({
          customerName: metadata?.email?.split("@")[0] || "Traveler",
          tourName: "Heritage Tour",
          bookingId,
          whatsappNumber: siteSettings.whatsappNumber,
        });

        await emailService.sendEmail(
          metadata?.email || result.data.customer.email,
          customerEmail.subject,
          customerEmail.html,
        );

        const adminEmail = bookingCreatedAdminEmail({
          customerName: metadata?.email?.split("@")[0] || "Guest",
          customerEmail: metadata?.email || result.data.customer.email || "",
          customerPhone: result.data.customer.phone || "",
          tourName: "Heritage Tour",
          bookingId,
          travelersCount: 1,
        });

        await emailService.sendEmail(
          siteSettings.contactEmail,
          adminEmail.subject,
          adminEmail.html,
        );
      }

      // logEmail({
      //   recipient: metadata?.email || result.data.customer.email || '',
      //   type: 'booking_confirmation',
      //   subject: customerEmail.subject,
      // });

      const existingBooking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.paymentId, reference))
        .limit(1)
        .then((res) => res[0]);

      if (existingBooking) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?ref=${reference}&bookingId=${existingBooking.id}`,
        );
      }
    } catch (dbError) {
      console.error("Database error while saving booking:", dbError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?ref=${reference}&error=db`,
      );
    }
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}?error=verification-failed`,
    );
  }
}
