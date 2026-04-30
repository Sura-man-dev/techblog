import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  videoId: String,

  user: {
    name: String,
    image: String,
  },

  text: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);