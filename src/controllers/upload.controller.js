"use strict";
const cloudinary = require("../models/ModelCloudinary");
const fs = require("fs");

class UploadController {
    uploadSingleFile = async (req, res) => {
        if (req.file) {
            const file = req.file.path;

            cloudinary
                .uploadSingle(file)
                .then((result) => {
                    let imageDetails = {
                        cloudImage: result.url,
                        imageId: result.id,
                    };

                    if (file) {
                        fs.unlinkSync(file);
                    }

                    res.json(imageDetails);
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                    res.status(500).json({ error: "Image upload failed" });
                });
        } else {
            res.status(400).json({ error: "No file uploaded" });
        }
    };
    uploadMultipleFiles = async (req, res) => {
        //req.files chính là khi upload multiple images
        let res_promises = req.files.map(
            (file) =>
                new Promise((resolve, reject) => {
                    cloudinary.uploadMultiple(file.path).then((result) => {
                        resolve(result);
                    });
                })
        );

        // Promise.all get imgas
        Promise.all(res_promises)
            .then(async (arrImg) => {
                //arrImg chính là array mà chúng ta đã upload
                // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
                res.json(req.files);
            })
            .catch((error) => {
                console.error("> Error>", error);
            });
    };
}

module.exports = new UploadController();
