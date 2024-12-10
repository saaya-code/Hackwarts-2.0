"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateTeam() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(useSession());
  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/register");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rosewood to-blackbean overflow-hidden">
      <div className="max-w-2xl w-full mx-4">
        <h1 className="text-6xl text-harryp text-center mb-12">
          Create Your Team
        </h1>
        {/* Add your team creation form here */}
      </div>
    </div>
  );
}

