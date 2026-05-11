"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/db/client";
import { blogPosts, galleryImages, testimonials } from "@/db/schema";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getEmailService } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings";
import { blogPublishedEmail } from "@/lib/email-templates/blog";
import { logEmail } from "@/lib/email-logger";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const createBlogSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  slug: z.string().optional(),
});

export async function createBlogPostAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = createBlogSchema.safeParse(raw);
  if (!parsed.success) return;

  const coverImageFile = formData.get("coverImage") as File | null;
  const coverImageUrl = coverImageFile ? await uploadImageToCloudinary(coverImageFile) : null;

  const db = getDb();
  await db.insert(blogPosts).values({
    title: parsed.data.title,
    body: parsed.data.body,
    slug: parsed.data.slug?.trim() || slugify(parsed.data.title),
    coverImageUrl,
    published: formData.get("published") === "on",
  });

  revalidatePath("/admin/cms/blog");
}

export async function toggleBlogPublishedAction(formData: FormData) {
  const blogId = String(formData.get("blogId") ?? "");
  const published = formData.get("published") === "true";
  if (!blogId) return;

  const db = getDb();

  // Get blog details before update
  const [blog] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, blogId))
    .limit(1);

  if (!blog) return;

  // Update published status
  await db.update(blogPosts).set({ published: !published }).where(eq(blogPosts.id, blogId));

  // Send email notification if blog was just published
  if (!published && blog.published === false) {
    const emailService = getEmailService();
    const siteSettings = await getSiteSettings();

    if (emailService && siteSettings) {
      // For now, send to admin email as newsletter recipient
      // In future, this could be expanded to a newsletter subscriber list
      const newsletterEmail = blogPublishedEmail({
        blogTitle: blog.title,
        blogSlug: blog.slug,
        blogExcerpt: blog.body.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      });

      const emailSent = await emailService.sendEmail(
        siteSettings.contactEmail, // Could be newsletter list in future
        newsletterEmail.subject,
        newsletterEmail.html
      );

      await logEmail(
        siteSettings.contactEmail,
        'blog_published',
        newsletterEmail.subject,
        emailSent
      );
    }
  }

  revalidatePath("/admin/cms/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  const blogId = String(formData.get("blogId") ?? "");
  if (!blogId) return;

  const db = getDb();
  await db.delete(blogPosts).where(eq(blogPosts.id, blogId));
  revalidatePath("/admin/cms/blog");
}

const testimonialSchema = z.object({
  travelerName: z.string().min(2),
  quote: z.string().min(4),
  location: z.string().optional(),
});

export async function createTestimonialAction(formData: FormData) {
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return;

  const db = getDb();
  await db.insert(testimonials).values({
    travelerName: parsed.data.travelerName,
    quote: parsed.data.quote,
    location: parsed.data.location,
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/cms/testimonials");
}

export async function toggleTestimonialPublishedAction(formData: FormData) {
  const id = String(formData.get("testimonialId") ?? "");
  const published = formData.get("published") === "true";
  if (!id) return;

  const db = getDb();
  await db.update(testimonials).set({ published: !published }).where(eq(testimonials.id, id));
  revalidatePath("/admin/cms/testimonials");
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = String(formData.get("testimonialId") ?? "");
  if (!id) return;

  const db = getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/cms/testimonials");
}

export async function uploadGalleryImageAction(formData: FormData) {
  const caption = String(formData.get("caption") ?? "");
  const imageFile = formData.get("image") as File | null;
  if (!imageFile) return;

  const imageUrl = await uploadImageToCloudinary(imageFile);
  if (!imageUrl) return;

  const db = getDb();
  await db.insert(galleryImages).values({
    imageUrl,
    caption: caption || null,
  });

  revalidatePath("/admin/media/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  const id = String(formData.get("imageId") ?? "");
  if (!id) return;

  const db = getDb();
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  revalidatePath("/admin/media/gallery");
}
