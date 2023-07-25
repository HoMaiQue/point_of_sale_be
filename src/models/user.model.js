"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";
// Declare the Schema of the Mongo model
var userSchema = Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
        roles: {
            type: Array,
            default: [],
        },

        dateOfBirth: {
            type: Date,
        },
    },
    { timestamps: true, collection: COLLECTION_NAME }
);
userSchema.index({ name: "text", email: "text" });
//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
