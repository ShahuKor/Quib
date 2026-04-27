import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 },
      );
    }

    const subscriptionId = subscriptions.data[0].id;

    await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({
      success: true,
      message: "Subscription Cancelled",
    });
  } catch (error) {
    console.log("Error cancelling subscription", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
