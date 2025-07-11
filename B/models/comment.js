const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course", // ارجاع به مدل Course
      required: true,
    },
    // course: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Course",
    // },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User", // باید به مدل User اشاره کند
      required: true,
    },
    // creator: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

const model = mongoose.model("Comment", schema);

module.exports = model;
