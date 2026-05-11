import { getSiteSettings } from "@/lib/site-settings";

export async function getWhatsappDeepLink(params: {
  tourName: string;
  bookingId: string;
  name: string;
}): Promise<string | null> {
  const settings = await getSiteSettings();
  if (!settings?.whatsappNumber) {
    console.warn("WhatsApp number not configured in site settings or environment");
    return null;
  }
  const message = `Hi, I just submitted a booking request for the ${params.tourName} tour. My reference is ${params.bookingId}. I am ${params.name}. Please let me know the next steps.`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${settings.whatsappNumber}?text=${encoded}`;
}
