"use client";

import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import Image from "next/image";
import baroqueBorder from "@/public/baroqueborder.png";
import goldenball from "@/public/goldenball.png";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { SuccessDialog } from "./SuccessDialog";

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
  const [isSelected, setIsSelected] = useState(false);
  const [maxChallengesReached, setMaxChallengesReached] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      checkChallengeStatus();
    }
  }, [session]);

  const checkChallengeStatus = async () => {
    try {
      const res = await fetch(
        `/api/teams/challenges-status?email=${session?.user?.email}`
      );
      const data = await res.json();

      setIsSelected(data.selectedChallenges.includes(challenge._id));
      setMaxChallengesReached(data.selectedChallenges.length >= 2);
    } catch (error) {
      console.error("Error checking challenge status:", error);
    }
  };

  const handleSelectChallenge = async () => {
    if (!session?.user?.email) return;
    setShowConfirmDialog(true);
  };

  const handleConfirmSelection = async () => {
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

      setDialogMessage(`You've successfully selected "${challenge.name}"`);
      setShowSuccessDialog(true);
      checkChallengeStatus();
    } catch (error: any) {
      setDialogMessage(error.message);
      setShowSuccessDialog(true);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const getButtonState = () => {
    if (!session?.user?.email) return null;
    if (isSelected) return { disabled: true, text: "Already Selected" };
    if (maxChallengesReached)
      return { disabled: true, text: "Max selected challenges" };
    return { disabled: false, text: "Select Challenge" };
  };

  const buttonState = getButtonState();

  if (!buttonState) return null;

  return (
    <>
      <div className="relative border-2 border-yellow-600 p-8 rounded-xl bg-[#c7b256] shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-sm flex flex-col">
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

        <div className="relative flex-1">
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

        <Button
          variant="hackwarts"
          onClick={handleSelectChallenge}
          disabled={buttonState.disabled}
          className="mt-4"
        >
          <Swords className="w-4 h-4 mr-2" />
          {buttonState.text}
        </Button>
      </div>
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSelection}
        title="Select Challenge"
        description={`Are you sure you want to select "${challenge.name}"? This action cannot be undone.`}
      />
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Magic Spell Result"
        message={dialogMessage}
      />
    </>
  );
}
