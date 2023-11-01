const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEimQpPJxGst4O8fU1ugI9CLaVbRxoUiRTZKo5hV7--twCoca8AZItw7LECW2p6olqdejNHyAJ-4kOIq8q3M5QiQ6M_CIibrCR8ZziZ8znqHcm6NbKeAFP6PwwCPBiQXZP95GPS1WzPLzFXXQnCB_1mlcCGWYVkJALuHoA/w1200",
    },
    admin: {
      type: String,
      default: "admin",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
