import { plansPricing } from "./constants";
import { getDbConnection } from "./db";
import { getUploadCount } from "./summaries";

export async function getUserPlanId(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email=${email} AND status='active'`;

  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit({
  userEmail,
}: {
  userEmail: string;
}) {
  const uploadCount = await getUploadCount(userEmail);
  const planId = await getUserPlanId(userEmail);

  const isPro =
    plansPricing.find((plan) => plan.priceId == planId)?.id === "pro";

  const uploadLimit: number = isPro ? 1000 : 5;

  return { reachedUploadLimit: uploadCount >= uploadLimit, uploadCount };
}
