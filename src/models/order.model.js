"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "orders";
// Declare the Schema of the Mongo model
var orderSchema = Schema(
    {
        customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
        order_date: {
            type: Date,
            default: Date.now,
        },
        total_amount: {
            type: Number,
            required: true,
        },
        items: [
            {
                food_id: {
                    type: Schema.Types.ObjectId,
                    ref: "Food",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);
