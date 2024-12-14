import seedDataBase from "@/utils/seedDatabase";
import { NextResponse } from "next/server";

export async function GET(){
    await seedDataBase();
    return NextResponse.json({ message: "Database seeded successfully" });
}