"use client";
import React, { useState } from "react";
import baroqueBorder from "@/public/baroqueborder.png";
import Image from "next/image";
import HouseBanner from "@/components/ui/house-banner";
import { AtSign, Edit, Octagon, Plus, User, X } from "lucide-react";
import Link from "next/link";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Member = ({
  member,
}: {
  member: {
    name: string;
    email: string;
  };
}) => {
  return (
    <div className="shadow-md bg-white p-4 rounded-md flex justify-between">
      <div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {member.name}
        </div>
        <div className="flex items-center gap-1">
          <AtSign className="w-4 h-4" /> {member.email}
        </div>
      </div>
      <div>
        <Button variant="destructive">
          <X className="" />
        </Button>
      </div>
    </div>
  );
};

const page = () => {
  const [toggleMembers, setToggleMembers] = useState(false);
  const members = [
    { name: "Member 1", email: "member1@gmail.com" },
    { name: "Member 2", email: "member2@gmail.com" },
    { name: "Member 3", email: "member2@gmail.com" },
    { name: "Member 4", email: "member2@gmail.com" },
    { name: "Member 5", email: "member2@gmail.com" },
  ];
  const selectedChallenges = [
    { title: "Challenge 1" },
    { title: "Challenge 2" },
  ];

  // TODO: check if total number of team members is less or equal to 5
  // then display the add member button

  return (
    <div className="flex items-center justify-center">
      <Modal
        title="Manage Team Members 👥"
        open={toggleMembers}
        onClose={() => {
          setToggleMembers(false);
        }}
      >
        <div className="flex flex-col gap-2 mt-4">
          {members.length < 5 ? (
            <div className="grid grid-cols-[3fr_3fr_1fr] gap-1">
              <Input className="" placeholder="Name" />
              <Input placeholder="Email" />
              <Button variant="hackwarts">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-rosewood flex justify-center items-center gap-2">
              <Octagon className="w-4 h-4" />
              Max team members reached
            </div>
          )}
          {members.map((member, index) => (
            <Member key={`member-${index}`} member={member} />
          ))}
        </div>
      </Modal>

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
            <div className="text-white font-bold text-lg flex items-center gap-2">
              Team members list
              <button
                onClick={() => {
                  setToggleMembers(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div>
              {members.map((member, index) => (
                <div key={`member-list-${index}`} className="flex items-center">
                  <User className="w-4 h-4" /> {member.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-lg text-white font-bold">
              Selected Challenges
            </div>
            <div className="flex flex-col">
              {selectedChallenges.map((challenge, index) => (
                <Link key={`challenge-${index}`} href="/challenges">
                  {challenge.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <HouseBanner house="Ravenclaw" />
      </div>
    </div>
  );
};

export default page;
