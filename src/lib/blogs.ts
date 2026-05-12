import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogPosts } from "@/db/schema";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
  createdAt: Date;
};

export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = getDb();
    const data = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
    return data;
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = getDb();
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return post ?? null;
  } catch {
    return null;
  }
}