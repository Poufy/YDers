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
            userId: form.userId,
            name: form.name,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
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

router.post("/", loggedIn, (req, res, next) => {
  const form = new Form({
    //creating a form object from the module then turning it into a promise
    _id: new mongoose.Types.ObjectId(),
    userId: req.user._id,
    email: req.user.email,
    username: req.user.username,
    name: req.body.name,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    subject: req.body.subject,
    location: req.body.location,
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
          userId: req.user._id,
          email: req.user.email,
          username: req.user.username,
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
});

router.delete("/:formId", (req, res, next) => {
  //Replace the matching universities with the body sent on the request
  Form.deleteOne({ _id: req.params.formId })
    .exec()
    .then(res.status(200))
    .catch(err => {
      console.log(err);
    });
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send({ redirect: "/user/login" });
  }
}
module.exports = router;
