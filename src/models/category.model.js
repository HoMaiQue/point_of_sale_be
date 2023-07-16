"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "categories";
// Declare the Schema of the Mongo model
var categorySchema = Schema(
    {
        category_name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        category_image: {
            type: String,
            trim: true,
        },
    },

    { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = model(DOCUMENT_NAME, categorySchema);
