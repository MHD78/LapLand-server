import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"


import addressRouter from "./routes/address.js"
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/address", addressRouter)
app.use("/api/user", userRouter)
app.use("/api/products", productRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listeing on ${port}`))