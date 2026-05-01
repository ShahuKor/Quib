import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
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
          const sessionId = event.data.object.id;
          const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
          });
          const result = await handleCheckoutSessionCompleted({
            session,
            stripe,
          });

          if (result?.error) {
            // Still return 200 to Stripe, otherwise it will keep retrying the webhook.
            // Log the issue on your side instead.
            console.error(
              `Checkout blocked: ${result.error} (status: ${result.status})`,
            );
          }
          break;

        case "customer.subscription.deleted":
          const subscription = event.data.object;
          console.log(subscription);
          await handleSubscriptionDeleted({ subscription });
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
