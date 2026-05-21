import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    // BASIC INFO
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    content: {
      type: String,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    // TYPE SYSTEM
    type: {
      type: String,
      enum: ["blog", "news", "video"],
      required: true,
    },

    // MEDIA
    image: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    thumbnail: {
      type: String,
    },

    // AUTHOR
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // STATUS
    status: {
      type: String,
      enum: ["Published", "Pending", "Rejected"],
      default: "Pending",
      index: true,
    },

    // SOCIAL SYSTEM
    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.posts ||
  mongoose.model("posts", PostSchema);