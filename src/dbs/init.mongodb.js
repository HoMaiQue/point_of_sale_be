"use strict";

const mongoose = require("mongoose");
const {
    db: { host, port, name },
} = require("../configs/config.mongodb");
// const connectString = `mongodb://${host}:${port}/${name}`;
const connectString = `mongodb+srv://homaique:homaique@cluster0.a4tih.mongodb.net/${name}`;
const { countConnect } = require("../helper/check.connect");
class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        mongoose
            .connect(connectString, { maxPoolSize: 50 })
            .then((_) => {
                console.log("Connected MongoDB Success", countConnect());
            })
            .catch((e) => console.log("Error Connect"));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
