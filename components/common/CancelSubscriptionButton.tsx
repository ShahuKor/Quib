"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CancelSubscriptionButton({
  customerId,
}: {
  customerId: string;
}) {
  const buttonEvent = async () => {
    const res = await fetch("/api/cancelsubscription", {
      method: "POST",
      body: JSON.stringify({ customerId }),
    });

    const data = await res.json();
    if (data.success && res.ok) {
      redirect("/byepage");
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <div>
      <Button
        size={"lg"}
        variant={"link"}
        className="w-40  px-6  py-3 text-sm font-medium text-red-500 hover:no-underline border-red-500 border flex items-center justify-center hover:text-red-400 hover:border-red-400"
        onClick={buttonEvent}
      >
        Cancel Subscription
      </Button>
      <Link
        href="/#pricing"
        className="flex item-center justify-center "
      ></Link>
    </div>
  );
}
