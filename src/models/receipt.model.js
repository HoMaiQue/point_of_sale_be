"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "receipt";
const COLLECTION_NAME = "receipts";
// Declare the Schema of the Mongo model
var receiptSchema = Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        payment_method: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        payment_date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = model(DOCUMENT_NAME, receiptSchema);
