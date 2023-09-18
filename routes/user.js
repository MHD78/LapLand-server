import express from "express"
import { body, validationResult } from "express-validator"
import { createTokens, validateToken } from "../utils/JWT.js"
import { createUser, getUserByEmail, getUser, updateUser, loginUser, allUsers, promoteUser } from "../database/database.js"
import md5 from "md5"
import jwt from "jsonwebtoken"
import randomize from "randomatic"
import regCodeMail from "../utils/regCodeMail.js"
import validateUserAccess from "../utils/userAccess.js"
import resolver from "../utils/requestResolver.js"

const userRouter = express.Router()

userRouter.post("/signup", [
    body('email', "enmail  cant be empty.").notEmpty(),
    body('password', "password can not be empty.").notEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    const user = await getUserByEmail(req.body.email)
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, message: "validation error", error: errors.array() })
    }
    if (user) {
        return res.status(400).json({ data: null, message: "user already exists", error: errors.array() })
    }
    if (Object.keys(req.cookies)[0] === "access-token") {
        return res.status(401).json({ data: null, message: "already logged in! you should first logout", error: errors.array() })
    }
    const token = randomize('a0A', 6)
    const userId = await createUser(req.body.email, md5(req.body.password), token)
    regCodeMail("mdamirchi27@gmail.com", req.body.email, "کد فعال سازی اکانت لپ  لند", `کد فعال سازی اکانت شما : ${token}`)
    const signupToken = createTokens({ token, userId })
    res.cookie("LapLand-session", signupToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: false,
    });
    res.status(200).send({ data: {}, message: "successfully inserted." })
})

userRouter.post("/signup/ver", [
    body('code', "code cant be empty.").notEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, message: "validation error", error: errors.array() })
    }
    const key = Object.keys(req.cookies)[0]
    const { token, userId } = jwt.decode(req.cookies[key])
    if (req.body.code == token) {
        res.clearCookie("LapLand-session");
        await updateUser(userId)
        const { user_id, email, role_id } = await getUser(userId)
        const accessToken = createTokens({ user_id, email, role_id });
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
        });
        res.status(200).send({ data: {}, message: "user successfully verfied." })
    } else {
        res.status(401).send({ data: {}, message: "wrong verfiction code." })
    }
})

userRouter.post("/login", [
    body('email', "email can not be empty.").notEmpty(),
    body('password', "password can not be empty.").notEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    const user = await getUserByEmail(req.body.email)
    if (!errors.isEmpty()) {
        return res.status(401).json({ data: null, message: "validation error", error: errors.array() })
    }
    if (Object.keys(req.cookies)[0]) {
        return res.status(401).json({ data: null, message: "already logged in! you should first logout", error: errors.array() })
    }
    if (!user) {
        return res.status(401).json({ data: null, message: "incorrect username or password.", error: errors.array() })
    }
    const { password, email, user_id, role_id, is_active } = user
    const accessToken = createTokens({ email, user_id, role_id });
    if (email == undefined) return res.status(401).send({ data: {}, message: "invalid credentials." })
    if (password == md5(req.body.password)) {
        if (is_active == 1) {
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: false,
            });
            res.status(201).send({ data: {}, message: "logged in." })
        } else {
            res.status(401).send({ data: {}, message: "user not activated." })
        }
    } else {
        res.status(401).send({ data: {}, message: "incorrect username or password." })
    }
})


userRouter.post("/promote", validateToken, validateUserAccess, [
    body("user_id", "user_id can not be empty.").notEmpty()
], async (req, res) => resolver(req, res, promoteUser))

userRouter.get("/logout", validateToken, (req, res) => {
    res.clearCookie("access-token");
    res.end();
})

userRouter.get("", validateToken, validateUserAccess, async (req, res) => {
    const key = Object.keys(req.cookies)[0]
    const data = await allUsers()
    res.status(200).send({ data: { data } })
})

export default userRouter