import { Team } from "@/app/models/Team";
import { connectToDatabase } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  if (!teamId) {
    return NextResponse.json(
      { hasTeam: false },
      {
        status: 400, // Bad Request
      }
    );
  }
  await connectToDatabase();
  const team = await Team.findOne({ id: teamId });
  if (!team) {
    return NextResponse.json(
      { hasTeam: false },
      {
        status: 404, // Not Found
      }
    );
  }
  return NextResponse.json({ hasTeam: true, member: team.members });
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
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
    leader_email: token?.email,
  });
  if (!team) {
    return NextResponse.json(
      { message: "Team not found" },
      {
        status: 404, // Not Found
      }
    );
  }

  if (team.members.length >= 5) {
    return NextResponse.json(
      { message: "Team is full" },
      {
        status: 400, // Bad Request
      }
    );
  }

  team.members.push({ name, email });
  await team.save();

  return NextResponse.json({
    message: "Member added successfully",
    members: team.members,
  });
}

export async function DELETE(request: NextRequest) {
  const email = new URL(request.url).searchParams.get("email");
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
