import { Stripe } from "stripe";
import { getDbConnection } from "./db";
import { checkIfRepeatPlan } from "./user";

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const sql = await getDbConnection();
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id;
  const { amount_total, status, id } = session;

  if (!("email" in customer) || !priceId) {
    return { error: "Missing customer email or price ID", status: 400 };
  }

  const { email, name } = customer;

  // 1. Check if user was a subscriber before & what state they're in
  const repeatPlanStatus = await checkIfRepeatPlan({ email, priceId });

  // 2. If their plan is still active — block the checkout entirely
  if (repeatPlanStatus === "same_plan_active") {
    return { error: "You are already subscribed to this plan", status: 409 };
  }

  // 3. Active but on a different plan — this is an upgrade/downgrade
  //    You may want to handle this via Stripe's subscription update flow
  //    instead of a new checkout, but at minimum let it through and update
  if (repeatPlanStatus === "different_plan_active") {
    console.warn(`User ${email} is switching plans mid-cycle`);
    // Fall through to createOrUpdateUser which will update price_id
  }

  await createOrUpdateUser({
    sql,
    email: email as string,
    fullName: name as string,
    customerId,
    priceId: priceId as string,
    status: "active",
  });

  await createPayment({
    sql,
    amount: amount_total!,
    status: status!,
    stripe_payment_id: id,
    price_id: priceId,
    user_email: email as string,
  });
}

export async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      // New user
      await sql`
    INSERT INTO users (email, full_name, customer_id, price_id, status, total_uploads, upload_period_start) 
    VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status}, 0, NOW())
  `;
    } else {
      // Existing user resubscribing, reset period and uploads
      await sql`
    UPDATE users 
    SET 
      price_id = ${priceId},
      status = ${status},
      customer_id = ${customerId},
      total_uploads = 0,
      upload_period_start = NOW(),
      updated_at = NOW()
    WHERE email = ${email}
  `;
    }
  } catch (error) {
    console.log("Error creating user ", error);
  }
}

export async function createPayment({
  sql,
  amount,
  status,
  stripe_payment_id,
  price_id,
  user_email,
}: {
  sql: any;
  amount: number;
  status: string;
  stripe_payment_id: string;
  price_id: string;
  user_email: string;
}) {
  try {
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id,user_email )VALUES (${amount}, ${status}, ${stripe_payment_id}, ${price_id}, ${user_email}) `;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export async function handleSubscriptionDeleted({
  subscription,
}: {
  subscription: Stripe.Subscription;
}) {
  try {
    const sql = await getDbConnection();
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id=${subscription.customer}`;
    console.log("Subscription cancelled Successfully");
  } catch (error) {
    console.log("Error in deleting the user from the database", error);
  }
}
