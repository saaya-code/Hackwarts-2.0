import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: Request) {
  // get leader team id
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token?.email) {
    return NextResponse.json({
      message: "There was a problem verifying the user.",
    });
  }

  await connectToDatabase();
  const team = await Team.findOne({
    leader_email: token.email,
  });
  console.log(team);
  if (!team) {
    return NextResponse.json({
      hasTeam: false,
    });
  }
  return NextResponse.json({
    team,
  });
}
