"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generateSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File Size is must be less than 20MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be PDF",
    ),
});

export function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setisLoading] = useState(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: () => {
      toast.error("Upload failed", {
        description: "Something went wrong. Please try again.",
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setisLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields
      const vaildatedFields = schema.safeParse({ file });
      console.log(vaildatedFields);
      if (!vaildatedFields.success) {
        toast.error("❌ Something Went wrong", {
          description:
            vaildatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File",
        });
        setisLoading(false);
        return;
      }

      toast("📄 Uploading PDF...", {
        description: "We are uploading your PDF!",
      });

      //upload the file to upload thing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setisLoading(false);
        return;
      }

      toast("📄 PDF is processing", {
        description: "Hang tight! Our AI is reading through your document ✨",
        descriptionClassName: "text-zinc-800",
      });

      //parse the pdf using LangChain and generate summary by open-ai / gemini
      const result = await generateSummary(resp);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast("📄 Saving PDF...", {
          description: "Hang tight! We are saving your summary ✨",
          descriptionClassName: "text-zinc-800",
        });

        if (data.summary) {
          //save summary to the database
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });

          toast("✨ Summary Generated!", {
            description:
              "Your PDF is saved in our database and successfully summarized✨",
            descriptionClassName: "text-zinc-800",
          });
          formRef.current?.reset();
        }
      }

      //summarize the PDF using Ai
      //save the su mmary to the database
      //redirect to the summary[id] page
    } catch (error) {
      console.error("An Error Occured ", error);
      formRef.current?.reset();
      setisLoading(false);
    }
  };
  return (
    <div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
