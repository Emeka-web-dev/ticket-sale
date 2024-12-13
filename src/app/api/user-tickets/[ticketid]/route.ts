import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Response,
  { params }: { params: { ticketid: string } }
) => {
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
    return new NextResponse(JSON.stringify(singleTicket), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "can not fetch ticket" }),
      { status: 500 }
    );
  }
};
