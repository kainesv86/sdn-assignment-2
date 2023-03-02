const express = require("express");
const bodyParser = require("body-parser");

const bcryptService = require("../services/bcrypt.service");
const jwtService = require("../services/jwt.service");

const Users = require("../schema/users");
const authRouter = express.Router();

const { routeUnAuthProtection } = require("../middlewares/auth.middleware");

authRouter.use(bodyParser.json());

authRouter.all("/", (req, res, next) => {
    res.statusCode = 200;
    next();
});

authRouter.get("/login", routeUnAuthProtection, (req, res) => {
    res.render("auth/login", { title: "Login" });
});

authRouter.post("/login", routeUnAuthProtection, async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
        return res.status(400).send("User not found");
    }

    const isPasswordValid = bcryptService.comparePassword(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
    }

    const obj = { username: user.username, isAdmin: user.isAdmin };

    const token = jwtService.sign(obj);

    req.session.token = token;

    res.send(token);
});

authRouter.get("/register", routeUnAuthProtection, (req, res) => {
    res.render("auth/register", { title: "Register" });
});

authRouter.post("/register", routeUnAuthProtection, async (req, res) => {
    const { password, username, ...others } = req.body;

    const oldUser = await Users.findOne({ username });

    if (oldUser) {
        return res.status(400).send("Username already exists");
    }

    const hashedPassword = await bcryptService.hashPassword(password);

    const user = await Users.create({ ...others, username, password: hashedPassword });
    res.send(user);
});

authRouter.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = authRouter;
