import { config } from "dotenv";
import express from "express";
import other from "./routes/otherRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
  path: "./config/.env",
});
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
  origin: 'https://edumindz-frontend.vercel.app/'
}));

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const FRONTEND_URL="https://edumindz-frontend.vercel.app/";
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.get("/", (req, res) =>
  res.send(
    `<h1>Site is working. Click <a href=${FRONTEND_URL} >here </a> to visit frontend</h1>`
  )
);
//importing & using routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", other);
export default app;

app.use(ErrorMiddleware);
