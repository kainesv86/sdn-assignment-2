const express = require("express");
const bodyParser = require("body-parser");
const Users = require("../schema/users");
const { routeProtection } = require("../middlewares/auth.middleware");
const bcryptService = require("../services/bcrypt.service");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.all("/", (req, res, next) => {
    res.statusCode = 200;
    next();
});

userRouter.get("/me", routeProtection, (req, res) => {
    res.render("user/me", { title: "Profile" });
});

userRouter.post("/me", routeProtection, async (req, res) => {
    const user = res.locals.user;
    const { yob, name } = req.body;
    await Users.updateOne(
        {
            _id: user._id,
        },
        {
            $set: {
                yob,
                name,
            },
        }
    );

    return res.send("Update success");
});

userRouter.post("/change-password", routeProtection, async (req, res) => {
    const user = res.locals.user;
    const { password, newPassword } = req.body;

    const isOldPassword = await bcryptService.comparePassword(newPassword, user.password);

    if (isOldPassword) {
        return res.status(400).send("Old password and new password are the same");
    }

    const isPasswordValid = await bcryptService.comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
    }

    const hashedPassword = await bcryptService.hashPassword(newPassword);

    await Users.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    return res.send("Update password success");
});

userRouter.get("/change-password", routeProtection, (req, res) => {
    res.render("user/change-password", { title: "Change password" });
});

module.exports = userRouter;
