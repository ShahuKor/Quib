import { Stripe } from "stripe";
import { getDbConnection } from "./db";

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
  if ("email" in customer && priceId) {
    const { email, name } = customer;

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
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status}) `;
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
