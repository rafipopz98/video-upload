import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("File", fileSchema);
