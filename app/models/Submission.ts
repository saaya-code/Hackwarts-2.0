import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISubmission extends Document {
  team_id: mongoose.Types.ObjectId;
  challenge_id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    team_id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    challenge_id: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
  },
  { timestamps: true }
);

submissionSchema.index({ team_id: 1, challenge_id: 1 }, { unique: true });

export const Submission: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", submissionSchema);
