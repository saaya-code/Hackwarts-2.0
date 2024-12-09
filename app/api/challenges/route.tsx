import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { Challenge } from "@/app/models/Challenge";
import seedDataBase from "../../../utils/seedDatabase"
export async function GET(req: NextApiRequest) {
     await connectToDatabase();
     const challenges = await Challenge.find()
    return new Response(JSON.stringify(challenges))
}

