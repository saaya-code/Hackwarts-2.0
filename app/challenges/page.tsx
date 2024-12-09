import { Challenge } from "@/app/models/Challenge";
import { connectToDatabase } from "@/lib/mongodb";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import goldenball from "@/public/goldenball.png";
import Starfield from "@/components/ui/starfield";

async function getChallenges() {
  await connectToDatabase();
  return Challenge.find({});
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <>
      <Starfield />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rosewood to-blackbean overflow-hidden py-20">
        <div className="max-w-6xl w-full mx-4">
          <h1 className="text-6xl text-harryp text-center mb-12 text-sunset">
            Magical Challenges
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <div
                key={challenge._id as string}
                className="relative border-2 border-yellow-600 p-8 rounded-xl bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm"
              >
                <Image
                  src={baroqueBorder}
                  alt="Baroque border"
                  className="absolute -top-4 -left-2 h-12 w-auto"
                />
                <Image
                  src={baroqueBorder}
                  alt="Baroque border"
                  className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
                />
                <Image
                  src={baroqueBorder}
                  alt="Baroque border"
                  className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
                />
                <Image
                  src={baroqueBorder}
                  alt="Baroque border"
                  className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
                />

                <div className="relative">
                  <Image
                    src={goldenball}
                    alt="Golden ball"
                    className="w-12 absolute -top-6 -right-4 animate-sinusoidal"
                  />
                  <h2 className="text-3xl text-harryp font-bold text-licorice mb-3">
                    {challenge.name}
                  </h2>
                  <p className="text-sm font-semibold text-licorice mb-2">
                    Sponsored by {challenge.sponsor_name}
                  </p>
                  <p className="text-licorice mb-4">{challenge.description}</p>
                  <p className="text-sm font-bold text-licorice">
                    Prize: {challenge.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
