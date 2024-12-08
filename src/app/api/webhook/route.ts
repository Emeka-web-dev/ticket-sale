import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

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

    const data = body.data.metadata;

    switch (body.event) {
      case "charge.success":
        const user = await getUserById(data.userId);
        if (!user) {
          return new NextResponse("User not found", { status: 404 });
        }

        const amount = body?.data?.amount / 100;

        await db.ticket.create({
          data: {
            userId: data.userId,
            price: amount,
            status: "PAID",
            distance: Number(data.distance),
            goingTo: data.to,
            leavingFrom: data.from,
            isRoundTrip: data.ticketType === "round-trip",
            startDate: data.startDate,
            endDate: data?.returnDate || null,
            ticketNumber: body.data.reference,
            numberOfPassengers: Number(data.numberOfPassenger),
          },
        });

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
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
