"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Food";
const COLLECTION_NAME = "foods";
// Declare the Schema of the Mongo model
var foodSchema = Schema(
    {
        food_name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        food_price: {
            type: Number,
            require: true,
        },
        food_description: {
            type: String,
            trim: true,
            maxLength: 500,
        },
        food_image: {
            type: String,
            trim: true,
        },
        available_quantity: {
            type: Number,
            default: 0,
            min: 0,
        },
        food_type: { type: Schema.Types.ObjectId, ref: "Category" },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
    },
    { timestamps: true, collection: COLLECTION_NAME }
);
foodSchema.index({ food_name: "text", food_price: "text" });
//Export the model
module.exports = model(DOCUMENT_NAME, foodSchema);
