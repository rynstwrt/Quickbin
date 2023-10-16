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
const saveRoute = require("./routes/save");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const registerRoute = require("./routes/register");


// CONSTANTS
const PORT = process.env.PORT || 3117;


// APP CREATION & CONFIG
const app = express();
app.engine("pug", require("pug").__express)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser(process.env.SESSION_SECRET));
// app.use((req, res, next) =>
// {
//     const cookies = req.headers.cookie;
//     if (!cookies)
//     {
//         console.log(cookies)
//     }
//
//     next();
// })


// APP ROUTING
app.use("/", homeRoute);
app.use("/error", errorRoute);
app.use("/save", saveRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/register", registerRoute);


// APP LISTENING
app.listen(PORT, () => console.log("Quickbin listening on port " + PORT));