const express = require("express");
const bodyParser = require("body-parser");
const Users = require("../schema/users");
const { routeAdminProtection } = require("../middlewares/auth.middleware");

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.all("/", routeAdminProtection, (req, res, next) => {
    res.statusCode = 200;
    next();
});

usersRouter.get("/", routeAdminProtection, async (req, res) => {
    const users = await Users.find();
    res.render("users/list", { title: "Users", users });
});

usersRouter.get("/:id", routeAdminProtection, async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.render("users/detail", { title: "User detail", account: user });
});

module.exports = usersRouter;
