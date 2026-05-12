export function bookingCreatedCustomerEmail(data: {
  customerName: string;
  tourName: string;
  bookingId: string;
  whatsappNumber: string;
}): { subject: string; html: string } {
  const subject = `Booking Confirmation - ${data.tourName}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your heritage journey awaits</p>
        </div>
        <div class="content">
          <h2>Hello ${data.customerName}!</h2>
          <p>Thank you for choosing Heritage Trail Tours. Your booking has been received and we're excited to help you discover authentic African heritage experiences.</p>

          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Tour:</strong> ${data.tourName}</p>
            <p><strong>Booking Reference:</strong> ${data.bookingId}</p>
            <p><strong>Status:</strong> Received - We'll contact you within 24 hours</p>
          </div>

          <p>Our team will reach out via WhatsApp at <strong>${data.whatsappNumber}</strong> to discuss the details, answer any questions, and finalize your arrangements.</p>

          <p>You can also contact us directly on WhatsApp for immediate assistance.</p>

          <a href="https://wa.me/${data.whatsappNumber.replace(/\D/g, '')}" class="button">
            💬 Contact Us on WhatsApp
          </a>

          <p>We look forward to creating unforgettable memories with you!</p>

          <p>Best regards,<br>The Heritage Trail Tours Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© 2024 Heritage Trail Tours. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}

export function bookingCreatedAdminEmail(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourName: string;
  bookingId: string;
  travelersCount: number;
  specialRequests?: string;
}): { subject: string; html: string } {
  const subject = `New Booking: ${data.tourName} - ${data.customerName}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Alert</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .details { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .urgent { color: #ff6b6b; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Booking Alert</h1>
          <p>Action required within 24 hours</p>
        </div>
        <div class="content">
          <h2 class="urgent">New booking received - Contact customer ASAP</h2>

          <div class="details">
            <h3>Customer Information:</h3>
            <p><strong>Name:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.customerEmail}">${data.customerEmail}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a></p>
          </div>

          <div class="details">
            <h3>Booking Details:</h3>
            <p><strong>Tour:</strong> ${data.tourName}</p>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Travelers:</strong> ${data.travelersCount}</p>
            ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p><strong>⚡ Action Required:</strong> Contact the customer within 24 hours via WhatsApp or phone to confirm details and provide next steps.</p>
          </div>

          <p>Please update the booking status in the admin panel once contacted.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}