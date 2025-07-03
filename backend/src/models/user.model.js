import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    trim: true,
  },
  selected: { type: Boolean },
});

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  subjects: [subjectSchema],
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    googleId: {
      type: String,
      require: true,
    },
    email_verified: {
      type: Boolean,
      require: true,
    },
    examArray: [examSchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
