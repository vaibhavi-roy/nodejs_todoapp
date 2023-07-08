import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env"
});

const router = express.Router(); //to use in other files

//Using middlewares to access JSON data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);


//Using routes
app.use("/api/v1/users", userRouter); //to show that we are using api
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("Nice working");
});

//Using Error Middleware
app.use(errorMiddleware);

