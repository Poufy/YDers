const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
//Bring in the user module
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
          // trow error if passwords do not match
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
              req.flash("success", "You are now registered and you can login");
              res.redirect("/user/login");
            }
          });
        });
      });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;
