const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please give your task a name"],
    },
    description: {
      type: String,
      required: [true, "Please give your task a description"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please give your task a due date"],
    },
    Completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
