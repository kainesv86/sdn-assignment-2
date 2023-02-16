const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.static(process.cwd() + "/src/public"));

app.use(bodyParser.json());
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
