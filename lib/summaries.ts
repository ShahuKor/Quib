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

export const parseSection = (
  section: string,
): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();
  const points: String[] = [];

  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && !point.startsWith("#") && !point.startsWith("[Choose"),
    ),
  };
};
