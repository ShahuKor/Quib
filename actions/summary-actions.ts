"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryid,
}: {
  summaryid: string;
}) {
  try {
    const user = await currentUser();
    const userid = user?.id;

    if (!userid) {
      throw new Error("No user Found");
    }
    const sql = await getDbConnection();

    // delete from db
    const result = await sql`
  DELETE FROM pdf_summaries
  WHERE id = ${summaryid}
  AND user_id = ${userid}
  RETURNING id;
`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.log("Error deleting summary", error);
    return { success: false };
  }
}
