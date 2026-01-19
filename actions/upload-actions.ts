"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchandextractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-title";
import { auth } from "@clerk/nextjs/server";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generateSummary(
  uploadresponse: [
    {
      serverData: {
        userId: String;
        file: {
          url: string;
          name: string;
        };
      };
    },
  ],
) {
  if (!uploadresponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadresponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "No Pdf URL found",
      data: null,
    };
  }
  try {
    const pdfText = await fetchandextractPdfText(pdfUrl);

    let summary;
    //generate summary using openai
    try {
      summary = await generateSummaryFromOpenAi(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message == "RATE LIMIT EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API Failed after open ai quota exceeded",
            geminiError,
          );
          throw new Error(
            "Failed to generate summary from available AI Providers",
          );
        }
      }
    }
    if (!summary) {
      return {
        success: false,
        message: "Error while generating the summary",
        data: null,
      };
    }

    const formatedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "Summary generated Successfully",
      data: {
        title: formatedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error while parsing the PDF",
      data: null,
    };
  }
}

export async function savePDF({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  //sql inserting pdf summary
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
) VALUES (
 ${userId},
 ${fileUrl},
 ${summary},
 ${title},
 ${fileName} 
);`;
  } catch (error) {
    console.error("Error saving the summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savePDFSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User Not Found",
      };
    }
    savePDFSummary = await savePDF({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savePDFSummary) {
      return {
        success: false,
        message: "NULL",
      };
    }

    return {
      success: true,
      message: "PDF saved successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while storing the summary",
    };
  }
}
