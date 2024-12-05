import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signature = req.headers.get("x-paystack-signature");

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (signature !== hash) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    switch (body.event) {
      case "charge.success":
        console.log("charge.success", body.data.metadata);
        break;
      case "charge.failed":
        console.log("charge.failed", body);
        break;
      case "charge.refunded":
        console.log("charge.refunded", body);
        break;
      case "charge.cancelled":
        console.log("charge.cancelled", body);
        break;
      default:
        console.log("Unknown event", body);
        break;
    }
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
