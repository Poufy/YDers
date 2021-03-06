const express = require("express");
const app = express();
const config = require("./config/config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
// const cookieParser = require("cookie-parser");
//ROUTES
const landingPageRoute = require("./api/routes/landingPage");
const teacherRouter = require("./api/routes/teacher");
const formRouter = require("./api/routes/form");
const userRouter = require("./api/routes/user");
const adminRouter = require("./api/routes/admin");
const completedFormRouter = require("./api/routes/completedForm");

mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.connection.on("open", ()=> console.log("Connected to DB"))
/* MIDDLEWEAR */
app.use(morgan("dev")); //funnel all requests through morgan for logging requests on the console
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

// set sessions
app.use(
  session({
    secret: config.secret,
    resave: true, // forces the session to be saved back to the store
    saveUninitialized: true, // dont save unmodified
    maxAge: Date.now() + 30 * 86400 * 1000 //Keep the session stored for 2 months
  })
);

// // Passport Config
// require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

//Preventing CORS errors
//We need to append headers before the response is sent back to the client
//these headers tell the browser that we allow a client that has a different origin from the server to get the repsonse.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* here means every origin is allowed, You can restrict this to specific ips like 'http:/website.com
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  //The options request which is an HTTP method is always sent first and once by the browser
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.get("*", (req, res, next) => {
  //setting a global variable on all routes (user)
  res.locals.user = req.user || null; //a req.user variable is created when logging in successfuly with passport
  next();
});

//Facebook Routes
// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log(req.user);
//     res.redirect("/");
//   }
// );

//Handling the routes
app.use("/", landingPageRoute); //Any request to / will be handled by the landingPageRoute
app.use("/api/teachers", teacherRouter);
app.use("/api/forms", formRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/api/completedforms", completedFormRouter);

//if you reach this line that means no route was able to handle the request therefore we catch the error here
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  //forward the error;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", { errorStatus: error.status });
});
module.exports = app;
