import express from "express";
import validateUserAccess from "../utils/userAccess.js";
import { validateToken } from "../utils/JWT.js";

const uploadRouter = express.Router()

uploadRouter.post("", validateToken, validateUserAccess, (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    Object.values(req.files).map(pic => pic.mv("D:React-Shopping-App/" + 'upload/' + pic.name))
    return res.status(200).send("uploaded.")
});

export default uploadRouter;