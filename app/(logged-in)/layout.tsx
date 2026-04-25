import UpgradeRequired from "@/components/common/upgrade-required";
import { checkActiveSubscription, userExists } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const isUserPresent = await userExists({ userEmail });
  const hasActiveSubscription = await checkActiveSubscription({ userEmail });
  if (!isUserPresent || hasActiveSubscription !== "active") {
    return <UpgradeRequired />;
  }
  return <div>{children}</div>;
}
