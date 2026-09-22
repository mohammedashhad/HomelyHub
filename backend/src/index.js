import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utility/db.js";
import { router } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

dotenv.config()
const app= express();
const allowedOrigin = process.env.ORIGIN_ACCESS_URL?.replace(/\/+$/, "");

//for express.json
app.use(express.json({limit:"100mb"}))

//For urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}))

//for cookieParser
app.use(cookieParser())

app.use(cors({
    origin: allowedOrigin,
    credentials:true
}))


const port = process.env.port;

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)

connectDB();

app.listen(port,()=>{
    console.log(`App is running on port no: ${port}`)
})
