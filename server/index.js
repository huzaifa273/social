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
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log("Server is running");
});
