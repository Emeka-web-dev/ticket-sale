import { currentUser } from "@/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const user = await currentUser();
    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const apiRoute = "https://api.paystack.co/transaction/initialize";

    const params = {
      email: user.email,
      amount: body * 100,
      metadata: {
        userId: user.id,
        cancel_action: `${process.env.NEXT_PUBLIC_SITE_URL!}`,
        amount: body,
      },
    };

    const response = await axios.post(apiRoute, params, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
