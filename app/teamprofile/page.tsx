import React from "react";

import baroqueBorder from "@/public/baroqueborder.png";
import Image from "next/image";
import HouseBanner from "@/components/ui/house-banner";
import { User } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative p-10 mt-10 flex gap-10">
        {/* add baroque borders to the corners of the div apply scaling and inversing */}
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
        <div>
          <div className=" text-yellow-500 text-harryp mb-2 text-4xl">
            The team name here.
          </div>
          <div className="text-white text-lg mb-2">
            <span className="font-bold">Team Leader: </span>{" "}
            <span>Unknown leader</span>
          </div>
          <div className="mb-2">
            <div className="text-white font-bold text-lg">
              Team members list
            </div>
            <div>
              <div className="flex items-center ">
                <User className="w-4 h-4" /> Member 1
              </div>
              <div className="flex items-center ">
                <User className="w-4 h-4" /> Member 2
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg text-white font-bold">
              Selected Challenges
            </div>
            <div className="flex flex-col">
              <Link href="/challenges">Challenge 1</Link>
              <Link href="/challenges">Challenge 1</Link>
              <Link href="/challenges">Challenge 1</Link>
            </div>
          </div>
        </div>
        <HouseBanner house="Gryffindor" />
      </div>
    </div>
  );
};

export default page;
