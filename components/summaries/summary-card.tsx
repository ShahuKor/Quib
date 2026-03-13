import { Card } from "../ui/card";
import Link from "next/link";
import SummaryDeleteButton from "./summary-delete-button";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/lib/utils";
export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full px-3 md:px-4 ">
        <div className="absolute top-2 right-2">
          <SummaryDeleteButton summaryid={summary.id} />
        </div>

        <Link className="flex flex-col gap-4" href={`summaries/${summary.id}`}>
          <div className="flex gap-2 items-center">
            <FileText className="size-8 shrink-0" />
            <div>
              <h3 className="max-w-45 md:max-w-full text-base xl:text-lg font-semibold text-gray-900 truncate">
                {summary.title || formatFileName(summary.original_file_url)}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(summary.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">
            {summary.summary_text}
          </p>

          <span
            className={`text-xs font-medium px-2 py-1 rounded-full w-18 ${summary.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            {summary.status}
          </span>
        </Link>
      </Card>
    </div>
  );
}
