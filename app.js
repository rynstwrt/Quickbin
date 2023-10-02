// REQUIRES
const express = require("express");
const path = require("path");
const cors = require("cors");


// ROUTE REQUIRES
const indexRoute = require("./routes/index");
const loginRoute = require("./routes/login");
const signUpRoute = require("./routes/signup");
const errorRoute = require("./routes/error");


// CONSTANTS
const PORT = process.env.PORT || 3000;


// APP CREATION & CONFIG
const app = express();
app.engine("pug", require("pug").__express)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


// APP ROUTING
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/signup", signUpRoute);
app.use("/error", errorRoute);


// APP LISTENING
app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));