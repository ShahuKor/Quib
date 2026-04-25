import { UploadForm } from "@/components/upload/fileupload";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail) {
    return redirect("/sign-up");
  }
  const { reachedUploadLimit } = await hasReachedUploadLimit({
    userEmail,
  });

  if (reachedUploadLimit) {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-2 py-24 sm:py-32 lg:px-8 ">
        <div className="flex flex-col items-center justify-center">
          <UploadHeader />
          <UploadForm email={userEmail} />
        </div>
      </div>
    </section>
  );
}
