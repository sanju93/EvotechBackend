import mongoose from "mongoose";

let SurveySchema = new mongoose.Schema(
  {
    name: String,
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Survey = mongoose.model("Survey", SurveySchema);

export default Survey;
