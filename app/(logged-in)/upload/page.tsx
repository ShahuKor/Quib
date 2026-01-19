import { UploadForm } from "@/components/upload/fileupload";
import UploadHeader from "@/components/upload/upload-header";

export default function Page() {
  return (
    <section className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-2 py-24 sm:py-32 lg:px-8 ">
        <div className="flex flex-col items-center justify-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}
