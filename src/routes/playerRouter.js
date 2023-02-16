const express = require("express");
const bodyParser = require("body-parser");
const Players = require("../schema/players");
const playerRouter = express.Router();

playerRouter.use(bodyParser.json());

playerRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
});

playerRouter.get("/", async (req, res, next) => {
    const players = await Players.find();
    res.render("index", { title: "Hello" });
});

playerRouter.get("/:playerId", async (req, res, next) => {
    const player = await Players.findById(req.params.playerId);
    res.send(player);
});

playerRouter.post("/", async (req, res, next) => {
    const newPlayer = await Players.create(req.body);
    res.send(newPlayer);
});

playerRouter.put("/:playerId", async (req, res, next) => {
    const player = await Players.findByIdAndUpdate(
        req.params.playerId,
        {
            $set: req.body,
        },
        { new: true }
    );
    res.send(player);
});

playerRouter.delete("/:playerId", async (req, res, next) => {
    const player = await Players.findByIdAndDelete(req.params.playerId);
    res.send(player);
});

module.exports = playerRouter;
