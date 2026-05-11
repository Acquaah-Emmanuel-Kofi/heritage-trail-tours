export function blogPublishedEmail(data: {
  blogTitle: string;
  blogSlug: string;
  blogExcerpt: string;
}): { subject: string; html: string } {
  const subject = `New Blog Post: ${data.blogTitle}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Blog Post</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .blog-preview { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .button { display: inline-block; background: #4facfe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📝 New Story Published</h1>
          <p>Fresh insights from our heritage journeys</p>
        </div>
        <div class="content">
          <h2>Discover Our Latest Story</h2>

          <div class="blog-preview">
            <h3>${data.blogTitle}</h3>
            <p>${data.blogExcerpt}</p>
          </div>

          <p>We're excited to share this new perspective on African heritage and cultural experiences. Each story brings you closer to the authentic narratives that make our tours special.</p>

          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://heritagetrailtours.com'}/blogs/${data.blogSlug}" class="button">
            📖 Read the Full Story
          </a>

          <p>Stay connected for more stories from the field!</p>

          <p>Best regards,<br>The Heritage Trail Tours Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}