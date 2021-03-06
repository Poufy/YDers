const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
let User = require("../models/User");

// Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  [
    check("email", "Enter a valid email").isEmail(),
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("password", "invalid password").custom(
      //This is a custom checker that checks if both fields are the same
      (value, { req, loc, path }) => {
        if (value !== req.body.confirmPassword) {
          // throw error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }
    )
  ],
  (req, res) => {
    const errors = validationResult(req); //if all the checks passed then this is empty
    if (!errors.isEmpty()) {
      errors.errors.forEach(element => {
        req.flash("error", element.msg);
      });
      res.redirect("/user/register");
    } else {
      //Here we create the new user and add it to the database after hashing the password
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      //Preventing signing up with duplicate usernames
      User.findOne({ username: username })
        .then(user => {
          if (user) {
            req.flash("error", "اسم المستخدم قيد الاستعمال");
            res.redirect("/user/register");
          } else {
            let newUser = new User({
              email: email,
              username: username,
              password: password
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  console.log(err);
                }
                newUser.password = hash;
                newUser.save(err => {
                  if (err) {
                    console.log("err occured");
                    req.flash("wrong");
                    return;
                  } else {
                    console.log("success");
                    req.flash("success", "لقد تم تسجيل الحساب بنجاح");
                    res.redirect("/user/login");
                  }
                });
              });
            });
          }
        })
        .catch(err => {
          req.flash(err);
          res.redirect("user/register");
        });
    }
  }
);

//Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

//Login Process
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("*", function(req, res) {
  res.render("error");
});
module.exports = router;
