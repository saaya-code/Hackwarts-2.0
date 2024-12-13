import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401, // Unauthorized
      }
    );
  }

  await connectToDatabase();
  const team = await Team.findOne({
    leader_email: token.email,
  });
  if (!team) {
    return NextResponse.json(
      { message: "Team not found" },
      {
        status: 404, // Not Found
      }
    );
  }

  team.members = team.members.filter((member) => member.email !== email);
  await team.save();

  return NextResponse.json({
    message: "Member removed successfully",
    members: team.members,
  });
}
