const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Form = require("../models/Form");
const locus = require("locus");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

//GET all forms
router.get("/", (req, res) => {
  Form.find()
    .exec()
    .then(forms => {
      const response = {
        formsCount: forms.length,
        forms: forms.map(form => {
          return {
            _id: form._id,
            name: form.name,
            lastName: form.lastName,
            phoneNumber: form.phoneNumber,
            subject: form.subject,
            location: form.location,
            time: form.time
          };
        })
      };
      res.status(200).json({ response }); //we could use this data to pass it to some view later
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
//add ,logged in after "/"
router.post(
  "/",
  [
    check("city", "Enter a valid email")
      .not()
      .isEmpty(),
    check("subject", "Enter a valid email")
      .not()
      .isEmpty(),
    check("day", "Enter a valid email")
      .not()
      .isEmpty(),
    check("time", "Enter a valid email")
      .not()
      .isEmpty(),
    check("name", "Enter a valid email")
      .not()
      .isEmpty(),
    check("lastName", "Enter a valid email")
      .not()
      .isEmpty(),
    check("phone", "Enter a valid email")
      .not()
      .isEmpty()
  ],
  loggedIn,
  (req, res, next) => {
    /*THIS IS ONE WAY OF DOING IT BUT NEED TO SAVE ALREADY FILLED FIELDS */
    // ANOTHER WAY WOULD BE TO CHECK THE INPUTS BEFORE SUBMITTING
    //OR DISABLE BUTTON UNTIL FIELDS ARE FULL
    eval(locus);
    const errors = validationResult(req); //if all the checks passed then this is empty
    if (!errors.isEmpty()) {
      errors.errors.forEach(element => {
        req.flash("error", element.msg);
      });
      res.redirect("/");
    }
    const form = new Form({
      //creating a form object from the module then turning it into a promise
      _id: new mongoose.Types.ObjectId(),
      userId: req.user._id,
      email: req.user.email,
      username: req.user.username,
      name: req.body.name,
      lastName: req.body.lastname,
      phoneNumber: req.body.phone,
      subject: req.body.subject,
      location: req.body.city,
      day: req.body.day,
      time: req.body.time
    });
    form
      .save()
      .then(form => {
        res.status(201).json({
          message: "Added Form Successfully",
          createdForm: {
            _id: form._id,
            name: form.name,
            lastName: form.lastname,
            phoneNumber: form.phone,
            subject: form.subject,
            location: form.location,
            day: form.day,
            time: form.time
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

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash("error", "Please Login First to Submit The Form");
    res.redirect("/user/login");
  }
}
module.exports = router;
