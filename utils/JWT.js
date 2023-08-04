import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv"
dotenv.config()

export const createTokens = (user) => {
    console.log(user)
    const accessToken = sign(
        { ...user },
        process.env.JWT_SECRET
    );

    return accessToken;
};

export const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};
