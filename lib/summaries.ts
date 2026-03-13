import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at desc`;

  return summaries;
}

export async function getSummarybyID(summaryid: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`SELECT *, 
      (LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1) as wordcount 
      FROM pdf_summaries 
      WHERE id = ${summaryid}`;

    return summary;
  } catch (error) {
    console.log(`error fetching summary of id : ${summaryid} `, error);
    return null;
  }
}
