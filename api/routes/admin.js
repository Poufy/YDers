const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const Admin = require("../models/Admin");
const locus = require("locus");

// router.post("/register", (req, res) => {
//   let newAdmin = new Admin({
//     username: req.body.username,
//     password: req.body.password,
//     location: req.body.location,
//     subject: req.body.section
//   });

// });

router.post(
  "/register",

  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const subject = req.body.subject;
    const isAdmin = req.body.isAdmin;

    let newAdmin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
      location: location,
      subject: subject,
      isAdmin: isAdmin
    });

    newAdmin
      .save()
      .then(admin => {
        res.status(201).json({
          message: "Admin added successfully!",
          createdAdmin: {
            _id: admin._id,
            username: admin.username,
            password: admin.password,
            location: admin.location,
            subject: admin.subject,
            isAdmin: admin.isAdmin
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
);

//Login Form
//which is /admin/login
router.get("/login", (req, res) => {
  res.render("adminLogin");
});

router.get("/panel", ensureAuthenticated, (req, res) => {
  //eval(locus);
  res.render("panel");
});

//Login Process
router.post("/login", (req, res, next) => {
  passport.authenticate("admin-local", {
    successRedirect: "/admin/panel",
    failureRedirect: "/admin/login",
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

function ensureAuthenticated(req, res, next) {
  // eval(locus);
  if (req.isAuthenticated()) return next();
  else {
    res.redirect("/admin/login");
  }
}

module.exports = router;
