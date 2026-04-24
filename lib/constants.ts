export const plansPricing = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: [
      "5 summaries per month",
      "Standard processing speed",
      "Email Support",
    ],
    description: "For personal use",
    paymentlink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aFacN4clf9jG7qq6iD8AE00"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1TP9JVAUZkFWpXXjczj6AWWO"
        : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    items: [
      "Unlimited summaries per month",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    description: "For professionals and teams",
    paymentlink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bJecN40Cx8fC2667mH8AE01"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1TP9NHAUZkFWpXXjc9uGLh6R"
        : "",
  },
];
