import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for a Team Member
interface Member {
  name: string;
  email: string;
}

// Interface for the Team Document
export interface ITeam extends Document {
  name: string;
  leader_name: string;
  members: Member[];
  house: "Gryffindor" | "Hufflepuff" | "Ravenclaw" | "Slytherin";
  selected_challenges: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const memberSchema = new Schema<Member>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    leader_name: { type: String, required: true },
    members: { type: [memberSchema], default: [] },
    house: {
      type: String,
      enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
      required: true,
    },
    selected_challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  },
  { timestamps: true }
);

export const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema);
