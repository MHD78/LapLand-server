import express from "express"
import { validateToken } from "../utils/JWT.js"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import { getUserAddresses, addUserAddress } from "../database/database.js"


const addressRouter = express.Router()
addressRouter.use(express.json())

addressRouter.post("", validateToken, [
    body('state', "state cant be empty.").notEmpty(),
    body('city', "city cant be empty.").notEmpty(),
    body('address', "address cant be empty.").notEmpty(),
    body('zip_code', "zip_code cant be empty.").notEmpty(),
    body('house_number', "house_number cant be empty.").notEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({ data: null, message: "wrong address error", error: errors.array() })
    }

    const { state, city, address, zip_code, house_number } = req.body
    console.log(state, city, address, zip_code, house_number)
    const key = Object.keys(req.cookies)[0]
    const { user_id } = jwt.decode(req.cookies[key])
    addUserAddress(user_id, state, city, address, zip_code, house_number)
    res.status(200).send({ data: {}, message: "successfull." })
})

addressRouter.get("", validateToken, async (req, res) => {
    const key = Object.keys(req.cookies)[0]
    const { user_id } = jwt.decode(req.cookies[key])
    const data = await getUserAddresses(user_id)
    console.log(data)
    res.status(200).send({ data, message: "successfull." })
})

export default addressRouter