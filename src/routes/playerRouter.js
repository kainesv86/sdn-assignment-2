const express = require("express");
const bodyParser = require("body-parser");
const Players = require("../schema/players");
const Nations = require("../schema/nations");
const playerRouter = express.Router();

playerRouter.use(bodyParser.json());

playerRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    next();
});

playerRouter.get("/", async (req, res) => {
    let players = [];

    if (res.locals.isLogin && res.locals.user.isAdmin) {
        players = await Players.find().populate("nations");
    } else {
        players = await Players.find({ isCaptain: true }).populate("nations");
    }

    const positions = ["GK", "RB", "CB", "LB", "CDM", "CM", "CAM", "RW", "LW", "ST"];
    const clubs = [
        "MU",
        "MC",
        "LFC",
        "CHE",
        "ARS",
        "TOT",
        "AVL",
        "WHU",
        "LEI",
        "EVE",
        "WOL",
        "SOU",
        "NEW",
        "CRY",
        "BHA",
        "BUR",
        "SHU",
        "LEE",
        "WBA",
        "NOR",
    ];

    const nations = await Nations.find();

    res.render("players/index", { title: "Players", players, positions, clubs, nations });
});

playerRouter.get("/:playerId", async (req, res, next) => {
    try {
        const player = await Players.findById(req.params.playerId);
        res.send(player);
    } catch (err) {
        res.status(404).send("Not found");
    }
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
