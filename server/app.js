const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/api/user", UserRoute);

module.exports = app;
