"use client";

import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import goldenball from "@/public/goldenball.png";
import { useSession } from "next-auth/react";

interface Challenge {
  _id: string;
  name: string;
  sponsor_name: string;
  description: string;
  prize: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { data: session } = useSession();

  const handleSelectChallenge = async () => {
    try {
      const res = await fetch("/api/challenges/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamEmail: session?.user?.email,
          challengeId: challenge._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Challenge selected successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="relative border-2 border-yellow-600 p-8 rounded-xl bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm">
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

      <Button variant="hackwarts" onClick={handleSelectChallenge}>
        <Swords className="w-4 h-4 mr-2" />
        Select Challenge
      </Button>
    </div>
  );
}
