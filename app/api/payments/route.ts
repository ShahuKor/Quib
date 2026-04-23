import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  if (endPointSecret) {
    const signature = req.headers.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        endPointSecret,
      );
      switch (event.type) {
        case "checkout.session.completed":
          console.log("Checkout Completed");
          const session = event.data.object;
          console.log(session);
          break;
        case "customer.subscription.deleted":
          console.log("User Subscription Deleted");
          const subscription = event.data.object;
          console.log(subscription);
          break;

        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return NextResponse.json({
        status: 400,
      });
    }
  }

  return NextResponse.json({ status: 200, message: "Api is healthy" });
}
