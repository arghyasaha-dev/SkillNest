require("dotenv").config();

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(succ => {
        console.log("Connected to DB !");
    })
    .catch(err => {
        console.log("Cannot connect to DB !");
    })



const session = require("express-session");
const sessionConfig = {
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}
app.use(session(sessionConfig));


const flash = require("connect-flash");
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


const userRoutes = require("./routes/user.js");
app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.send("SkillNest Home Page");
})

const tasksRoutes = require("./routes/tasks.js");
app.use("/tasks", tasksRoutes);


// error handling middlewares 
const ExpressError = require("./utils/ExpressError.js");
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
})
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong !"
    res.status(status).render("error.ejs", {
        pageCSS: "error.css",
        err: {
            status,
            message
        }
    });
})


app.listen(process.env.PORT, () => {
    console.log("Listening from PORT ", process.env.PORT);
})