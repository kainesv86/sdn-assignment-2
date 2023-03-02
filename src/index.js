const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const { parseToken } = require("./middlewares/user.middleware");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.static(process.cwd() + "/src/public"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(parseToken);

app.use(bodyParser.json());
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
