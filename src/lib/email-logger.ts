import { getDb } from "@/db/client";
import { emailLogs } from "@/db/schema";

export async function logEmail(
  recipient: string,
  type: string,
  subject: string,
  success: boolean,
  error?: string
): Promise<void> {
  try {
    const db = getDb();
    await db.insert(emailLogs).values({
      recipient,
      type,
      subject,
      success,
      error: error || null,
    });
  } catch (logError) {
    console.error("Failed to log email:", logError);
    // Don't throw - logging failure shouldn't break the main flow
  }
}