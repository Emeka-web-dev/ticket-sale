import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { ticketid: string } }
) {
  try {
    const { ticketid } = params;
    const user = await currentUser();
    if (!user || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const singleTicket = await db.ticket.findUnique({
      where: {
        id: ticketid,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(singleTicket);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
