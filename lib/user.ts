import { plansPricing } from "./constants";
import { getDbConnection } from "./db";

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
  const sql = await getDbConnection();

  // Only count uploads within the current billing period
  const result = await sql`
    SELECT u.total_uploads, u.upload_period_start, u.price_id
    FROM users u
    WHERE u.email = ${userEmail}
  `;

  if (!result.length) return { reachedUploadLimit: false, uploadCount: 0 };

  const { upload_period_start, price_id } = result[0];

  // Count uploads since the current period started
  const uploadCountResult = await sql`
    SELECT COUNT(*) as count 
    FROM pdf_summaries
    WHERE user_email = ${userEmail}
    AND created_at >= ${upload_period_start}  
  `;

  const uploadCount = Number(uploadCountResult[0].count);
  const isPro =
    plansPricing.find((plan) => plan.priceId == price_id)?.id === "pro";
  const uploadLimit = isPro ? 1000 : 5;

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

  // Check if user has an ACTIVE subscription with this exact price_id
  const result = await sql`
    SELECT u.price_id, u.status 
    FROM users u
    WHERE u.email = ${email}
    LIMIT 1
  `;

  if (!result.length) {
    return null; // Brand new user
  }

  const user = result[0];

  if (user.status === "active" && user.price_id === priceId) {
    return "same_plan_active"; // Already on this plan and it's active
  }

  if (user.status === "active" && user.price_id !== priceId) {
    return "different_plan_active"; // Active but upgrading/downgrading
  }

  // status is inactive/cancelled — they're allowed to re-subscribe
  return false;
}
