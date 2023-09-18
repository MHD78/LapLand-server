import { validationResult } from "express-validator";
const resolver = async (req, res, callBack) => {
    const bodyError = validationResult(req)
    if (!bodyError.isEmpty()) return res.status(401).send({ ...bodyError, message: "invalid data." })
    try {
        const status = await callBack(req.body)
        res.send({ status })
    } catch (error) {
        console.log("asdasd", error)
        res.send({ message: "an error occured." })
    }
}

export const getResolver = async (req, res, callBack) => {
    const bodyError = validationResult(req)
    if (!bodyError.isEmpty()) return res.status(401).send({ data: bodyError, message: "invalid data." })
    try {
        console.log(req.params)
        const data = await callBack(req.params)
        res.status(200).send({ data, message: "success" })
    } catch (error) {
        console.log(error)
        res.status(403).send({ message: "not avaiable" })
    }
}

export default resolver