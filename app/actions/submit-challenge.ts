"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Submission } from "@/app/models/Submission";



export const submitChallenge = async (formData: FormData) => {
"use server";
const rawData = {
  team_id: formData.get("teamId"),
  challenge_id: formData.get("challengeId"),
  submission_url: formData.get("submissionUrl"),
  deployment_url: formData.get("deploymentUrl"),
};

   
  await connectToDatabase();
  const submission = await Submission.create(rawData);
  console.log(submission);
  
  if(!submission){
    return { error: "Failed to submit challenge" };
  }
  
  return { success: true }
};