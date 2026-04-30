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

export async function userExists({ userEmail }: { userEmail: string }) {
  const sql = await getDbConnection();

  const result = await sql`
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE email = ${userEmail}
  ) AS exists;
`;

  return result[0].exists;
}

export async function getUserCustomerId({ email }: { email: string }) {
  const sql = await getDbConnection();

  const result =
    await sql`SELECT customer_id FROM users WHERE email = ${email}`;

  if (!result.length) {
    return null;
  }

  return result[0].customer_id;
}

export async function checkIfRepeatPlan({
  email,
  priceId,
}: {
  email: string | null;
  priceId: string | undefined;
}) {
  const sql = await getDbConnection();

  const priceIdstored =
    await sql`SELECT price_id FROM payments WHERE user_email=${email}`;

  if (!priceIdstored.length) {
    return null;
  }

  if (priceIdstored[0].price_id == priceId) {
    return true;
  } else {
    return false;
  }
}
