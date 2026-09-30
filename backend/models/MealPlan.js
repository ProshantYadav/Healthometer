const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    calories: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
