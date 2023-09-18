import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import cors from "cors"
import checkout from "./routes/checkout.js"
import graphql from "express-graphql"
import addressRouter from "./routes/address.js"
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import uploadRouter from "./routes/upload.js"
import schema from "./schema.js"
let app = express()

app.use("/graphql", graphql.graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.use(fileUpload());
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));




app.use("/api/address", addressRouter)
app.use("/api/user", userRouter)
app.use("/api/products", productRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/checkout", checkout)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listeing on ${port}`))