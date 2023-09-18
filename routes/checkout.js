import express from "express";
import { body, validationResult } from "express-validator"
import resolver from "../utils/requestResolver.js";
import validateUserAccess from "../utils/userAccess.js";
import { validateToken } from "../utils/JWT.js";
import { addNewOrder } from "../database/database.js"
const checkout = express.Router()

checkout.post("", validateToken, validateUserAccess, async (req, res) => resolver(req, res, addNewOrder))

export default checkout;