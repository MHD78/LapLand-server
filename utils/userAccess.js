import jwt from "jsonwebtoken"

const validateUserAccess = (req, res, next) => {
    const key = Object.keys(req.cookies)[0]
    const { role_id } = jwt.decode(req.cookies[key])
    console.log(role_id)
    if (role_id == 2) {
        next()
    } else {
        res.status(401).send({ data: {}, message: "you dont have permission." })
    }

}

export default validateUserAccess