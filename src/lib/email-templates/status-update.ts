export function bookingStatusChangedEmail(data: {
  customerName: string;
  tourName: string;
  bookingId: string;
  newStatus: string;
  whatsappNumber: string;
}): { subject: string; html: string } {
  const subject = `Booking Update - ${data.tourName}`;

  const statusMessages = {
    CONTACTED: "We've contacted you and discussed your booking details",
    CONFIRMED: "Your booking has been confirmed and arrangements are in progress",
    CANCELLED: "Your booking has been cancelled as requested",
  };

  const message = statusMessages[data.newStatus as keyof typeof statusMessages] || `Your booking status has been updated to: ${data.newStatus}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Status Update</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .status { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Booking Status Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${data.customerName}!</h2>

          <div class="status">
            <h3>Status Update for ${data.tourName}</h3>
            <p><strong>Booking Reference:</strong> ${data.bookingId}</p>
            <p><strong>New Status:</strong> ${data.newStatus}</p>
            <p>${message}</p>
          </div>

          <p>If you have any questions about your booking, please don't hesitate to contact us.</p>

          <a href="https://wa.me/${data.whatsappNumber.replace(/\D/g, '')}" class="button">
            💬 Contact Us on WhatsApp
          </a>

          <p>Best regards,<br>The Heritage Trail Tours Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}