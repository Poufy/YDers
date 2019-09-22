const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CompletedForm = require("../models/CompletedForm");
const locus = require("locus");
//GET all forms
router.get("/", (req, res) => {
  CompletedForm.find()
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

router.post("/", (req, res, next) => {
  //eval(locus);
  const completedForm = new CompletedForm({
    //creating a form object from the module then turning it into a promise
    _id: req.body._id,
    userId: req.body.userId,
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    subject: req.body.subject,
    location: req.body.location,
    day: req.body.day,
    time: req.body.time,
    status: req.body.status,
    note: req.body.note
  });

  completedForm
    .save()
    .then(form => {
      res.status(201).json({
        message: "Added Form Successfully",
        createdForm: {
          _id: form._id,
          userId: req.body.userId,
          email: req.body.email,
          username: req.body.username,
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

//Ensure admin is logged in.
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send({ redirect: "/user/login" });
  }
}

module.exports = router;
