const express = require("express");
const nationRouter = require("../routes/nationRouter");
const playerRouter = require("../routes/playerRouter");
const homeRouter = require("../routes/homeRouter");
const authRouter = require("../routes/authRouter");
const userRouter = require("../routes/userRouter");
const usersRouter = require("../routes/usersRouter");
const mongoose = require("mongoose");

module.exports = function (app) {
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
    app.use(express.json());
    app.use("/", homeRouter);
    app.use("/nations", nationRouter);
    app.use("/auth", authRouter);
    app.use("/players", playerRouter);
    app.use("/user", userRouter);
    app.use("/accounts", usersRouter);
};
