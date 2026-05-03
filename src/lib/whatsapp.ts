import { config } from 'dotenv';

config({ path: '.env.local' });

export function getWhatsappDeepLink(params: {
  tourName: string;
  bookingId: string;
  name: string;
}) {
  const message = `Hi, I just submitted a booking request for the ${params.tourName} tour. My reference is ${params.bookingId}. I am ${params.name}. Please let me know the next steps.`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encoded}`;
}
