"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Customer";
const COLLECTION_NAME = "customers";
// Declare the Schema of the Mongo model
var customerSchema = Schema(
    {
        customer_name: {
            type: String,
            required: true,
            trim: true,
        },
        customer_phone: {
            type: String,
            required: true,
        },
        customer_address: {
            type: String,
        },
    },
    { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = model(DOCUMENT_NAME, customerSchema);
