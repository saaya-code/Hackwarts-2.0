import { connectToDatabase } from "@/lib/mongodb";
import { Submission } from "@/app/models/Submission";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { teamId , challengeId, submissionUrl, deploymentUrl } = await req.json();
    await connectToDatabase();
    console.log("before create")
    const submission = await Submission.create({
        team_id: teamId,
        challenge_id: challengeId,
        submission_url: submissionUrl,
        deployment_url: deploymentUrl
    })
    if(!submission){
        return NextResponse.json({ok:false})
    }
    return NextResponse.json({ok:true})
  } catch (error) {
    console.error(error);
    return NextResponse.json({ok:false})  }
    
}