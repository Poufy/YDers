const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Form = require("../models/Form");

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

router.post("/", (req, res) => {
  const form = new Form({
    //creating out teacher object from the module then turning it into a promise
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    subject: req.body.subject,
    location: req.body.location,
    day: req.body.day,
    time: req.body.time
  });
  //if this query returns null meaning this item does not exist we add it
  form
    .save()
    .then(form => {
      res.status(201).json({
        message: "Added Form Successfully",
        createdForm: {
          _id: form._id,
          name: form.name,
          lastName: form.lastName,
          phoneNumber: form.phoneNumber,
          subject: form.subject,
          location: form.location,
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

module.exports = router;
