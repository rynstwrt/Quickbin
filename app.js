// REQUIRES
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");


// ROUTE REQUIRES
const homeRoute = require("./routes/home");
const errorRoute = require("./routes/error");
const saveRoute = require("./routes/save");
const editRoute = require("./routes/edit");
const deleteRoute = require("./routes/delete");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const registerRoute = require("./routes/register");
const mineRoute = require("./routes/mine");


// CONSTANTS
const PORT = process.env.PORT || 3117;


// APP CREATION & CONFIG
const app = express();
app.engine("pug", require("pug").__express)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // secure: true,
        maxAge: null
    }
}));


// APP ROUTING
app.use("/", homeRoute);
app.use("/error", errorRoute);
app.use("/save", saveRoute);
app.use("/edit", editRoute);
app.use("/delete", deleteRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/register", registerRoute);
app.use("/mine", mineRoute);


// APP LISTENING
app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));