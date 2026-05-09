import { getSiteSettingsValue } from "@/lib/site-settings";

export async function getWhatsappDeepLink(params: {
  tourName: string;
  bookingId: string;
  name: string;
}) {
  const settings = await getSiteSettingsValue();
  const message = `Hi, I just submitted a booking request for the ${params.tourName} tour. My reference is ${params.bookingId}. I am ${params.name}. Please let me know the next steps.`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${settings.whatsappNumber}?text=${encoded}`;
}
