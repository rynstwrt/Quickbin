// REQUIRES
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");


// ROUTE REQUIRES
const homeRoute = require("./routes/home");
const errorRoute = require("./routes/error");
const devRoute = require("./routes/dev");
const saveRoute = require("./routes/save");
const savedRoute = require("./routes/saved");


// CONSTANTS
const PORT = process.env.PORT || 3000;


// APP CREATION & CONFIG
const app = express();
app.engine("pug", require("pug").__express)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());


// APP ROUTING
app.use("/", homeRoute);
app.use("/error", errorRoute);
app.use("/dev", devRoute);
app.use("/save", saveRoute);
app.use(/.*-.*-.*-.*-.*/, savedRoute)


// APP LISTENING
app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));