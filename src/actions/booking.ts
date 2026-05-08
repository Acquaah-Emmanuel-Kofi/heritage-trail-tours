"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db/client";
import { bookings } from "@/db/schema";
import { getWhatsappDeepLink } from "@/lib/whatsapp";

const bookingSchema = z.object({
  // Step 1
  tourId: z.string().optional(),
  travelersCount: z.coerce.number().int().min(1).max(50),
  arrivalDate: z.coerce.date().optional(),
  departureDate: z.coerce.date().optional(),
  flightDetails: z.string().optional(),
  accommodationAddress: z.string().optional(),
  pickupLocation: z.string().optional(),
  preferredTourDate: z.coerce.date().optional(),
  privateTour: z.coerce.boolean().default(false),

  // Step 2
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  guests: z.array(z.object({
    name: z.string().min(1),
    age: z.coerce.number().optional(),
    gender: z.string().optional(),
    nationality: z.string().optional(),
    passportNumber: z.string().optional(),
    occupation: z.string().optional(),
  })).default([]),

  // Step 3
  specialInterests: z.string().optional(),
  medicalConditions: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  physicalLimitations: z.string().optional(),
  specialAssistance: z.string().optional(),
  preferences: z.string().max(1000).optional(),

  // Step 4
  paymentOption: z.enum(['pay_now', 'on_arrival']),
  promoCode: z.string().optional(),
  termsAgreed: z.coerce.boolean().refine(val => val, 'Terms must be agreed'),
  mediaConsent: z.coerce.boolean().default(false),

  // Additional
  tourName: z.string().min(2),
  isCustom: z.coerce.boolean().default(false),
});

export async function createBookingAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/booking/success?error=validation");
  }

  const {
    name, email, phone, travelersCount, preferences, tourId, tourName, isCustom,
    emergencyContactName, emergencyContactPhone, guests, arrivalDate, departureDate,
    flightDetails, accommodationAddress, pickupLocation, preferredTourDate, privateTour,
    specialInterests, medicalConditions, dietaryRestrictions, physicalLimitations, specialAssistance,
    paymentOption, promoCode, termsAgreed, mediaConsent
  } = parsed.data;

  let bookingId = crypto.randomUUID();
  try {
    const db = getDb();
    const [created] = await db
      .insert(bookings)
      .values({
        name,
        email,
        phone,
        travelersCount,
        preferences: preferences || specialInterests || medicalConditions || dietaryRestrictions || physicalLimitations || specialAssistance,
        tourId: isCustom ? null : tourId,
        isCustom,
        emergencyContactName,
        emergencyContactPhone,
        guests,
        arrivalDate,
        departureDate,
        flightDetails,
        accommodationAddress,
        pickupLocation,
        preferredTourDate,
        privateTour,
        paymentStatus: paymentOption === 'pay_now' ? 'PAID' : 'ON_ARRIVAL',
        promoCode,
        termsAgreed: termsAgreed,
        mediaConsent: mediaConsent,
      })
      .returning({ id: bookings.id });
    bookingId = created.id;
  } catch {
    // Non-blocking fallback for environments without DB during early setup.
  }

  const whatsappLink = getWhatsappDeepLink({ tourName, bookingId, name });
  revalidatePath("/admin");
  redirect(`/booking/success?bookingId=${bookingId}&tourName=${encodeURIComponent(tourName)}&wa=${encodeURIComponent(whatsappLink)}`);
}
