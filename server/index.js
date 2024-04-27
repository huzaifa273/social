const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Router/user");
const postRoute = require("./Router/post");
const cors = require("cors");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Connection to Database failed");
  });

app.use(
  cors({
    origin: "https://social-client-chi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
});
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(5000, () => {
  console.log("Server is running");
});
