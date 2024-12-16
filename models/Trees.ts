import mongoose, { Schema, Document } from "mongoose";

// Define the ITree interface
export interface ITree extends Document {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
  visibility: string;
  members: [
    {
      id: string;
      name: string;
      gender: string;
      alive: boolean;
      birthDate: string;
      deathDate: string;
      img: string;
      pid: [string];
    }
  ];
}

// Define the User schema and model
const UserSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  // name: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

// Define the Tree schema and model
const TreeSchema = new Schema(
  {
    userId: { type: String, required: true, index: true, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    createdAt: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    memberCount: { type: Number, default: 0 },
    lastModified: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    template: { type: String, default: "Modern" },
    visibility: { type: String, enum: ["Public", "Private"], default: "Private" },
    members: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        gender: { type: String, required: true },
        alive: { type: Boolean, default: true },
        birthDate: { type: String },
        deathDate: { type: String },
        img: { type: String, default: "" },
        pid: { type: [String], default: [] },
      },
    ],
  },
  { timestamps: true }
);

// Model definition for Tree
const TreeModal = mongoose.models.Tree || mongoose.model<ITree>("Tree", TreeSchema);

// Default export for both models
export default { TreeModal, UserModel };
