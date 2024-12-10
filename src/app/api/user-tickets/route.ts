import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const getTickets = await db.ticket.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(getTickets);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
