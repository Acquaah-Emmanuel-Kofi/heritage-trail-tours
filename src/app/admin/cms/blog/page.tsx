import { desc } from "drizzle-orm";
import {
  createBlogPostAction,
  deleteBlogPostAction,
  toggleBlogPublishedAction,
} from "@/actions/cms";
import { getDb } from "@/db/client";
import { blogPosts } from "@/db/schema";

export default async function AdminBlogPage() {
  let posts: Array<(typeof blogPosts.$inferSelect)> = [];
  try {
    const db = getDb();
    posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  } catch {
    posts = [];
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Blog CMS</h1>
      <p className="mt-2 text-slate-300">Create and manage blog posts.</p>

      <form action={createBlogPostAction} className="mt-6 space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <input name="title" placeholder="Post title" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <input name="slug" placeholder="Slug (optional)" className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <textarea name="body" placeholder="Post content" required className="h-32 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <input type="file" name="coverImage" accept="image/*" className="block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" />
          Publish immediately
        </label>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Create post</button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-800">
                <td className="px-3 py-2">{post.title}</td>
                <td className="px-3 py-2">{post.slug}</td>
                <td className="px-3 py-2">{post.published ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-3">
                    <form action={toggleBlogPublishedAction}>
                      <input type="hidden" name="blogId" value={post.id} />
                      <input type="hidden" name="published" value={String(post.published)} />
                      <button className="text-sky-300 underline">{post.published ? "Unpublish" : "Publish"}</button>
                    </form>
                    <form action={deleteBlogPostAction}>
                      <input type="hidden" name="blogId" value={post.id} />
                      <button className="text-rose-300 underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
