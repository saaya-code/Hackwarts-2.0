import { Shield } from "lucide-react";
import gryfindor from "@/public/gryffindor.png";
import hufflepuff from "@/public/hufflepuf.png";
import ravenclaw from "@/public/ravenclaw.png";
import slytherin from "@/public/slytherines.png";
import Image from "next/image";

interface HouseBannerProps {
  house: "Gryffindor" | "Hufflepuff" | "Ravenclaw" | "Slytherin";
}

export default function HouseBanner({
  house = "Gryffindor",
}: HouseBannerProps) {
  return (
    <div className="relative w-32">
      {/* Banner shape with gradient */}
      <div className="relative overflow-hidden">
        <div
          className={`
        bg-gradient-to-b 
        ${house === "Gryffindor" ? "from-red-600 to-red-800" : ""}
        ${house === "Hufflepuff" ? "from-yellow-600 to-yellow-800" : ""}
        ${house === "Ravenclaw" ? "from-blue-600 to-blue-800" : ""}
        ${house === "Slytherin" ? "from-green-600 to-green-800" : ""}
        p-4 shadow-lg
        `}
        >
          {/* Top triangle clip */}
          <div
            className="absolute top-0 left-0 w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent"
            style={{ transform: "translateY(-1px)" }}
          />

          {/* Content container */}
          <div className="flex flex-col items-center gap-4 pt-4 pb-2">
            <div className="relative">
              {house === "Gryffindor" && (
                <Image src={gryfindor} alt="Gryffindor" className="w-16 h-16" />
              )}
              {house === "Hufflepuff" && (
                <Image
                  src={hufflepuff}
                  alt="Hufflepuff"
                  className="w-16 h-16"
                />
              )}
              {house === "Ravenclaw" && (
                <Image src={ravenclaw} alt="Ravenclaw" className="w-16 h-16" />
              )}
              {house === "Slytherin" && (
                <Image src={slytherin} alt="Slytherin" className="w-16 h-16" />
              )}
            </div>
            <div className="text-center">
              house
              <h3 className="font-serif text-lg font-bold text-white">
                {house}
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom triangle */}
        <div
          className={`
        w-0 h-0 mx-auto border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-t-[16px]
        ${house === "Gryffindor" ? "border-t-red-800" : ""}
        ${house === "Hufflepuff" ? "border-t-yellow-800" : ""}
        ${house === "Ravenclaw" ? "border-t-blue-800" : ""}
        ${house === "Slytherin" ? "border-t-green-800" : ""}
        `}
        />
      </div>
    </div>
  );
}
