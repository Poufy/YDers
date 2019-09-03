const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");

// GET REQUEST
router.get("/", (req, res) => {
  Teacher.find()
    .exec()
    .then(teachers => {
      const response = {
        teachersCount: teachers.length,
        teachers: teachers.map(teacher => {
          return {
            _id: teacher._id,
            name: teacher.name,
            lastName: teacher.lastName,
            subject: teacher.subject,
            location: teacher.location,
            day: teacher.day,
            time: teacher.time
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

// POST REQUEST
router.post("/", (req, res) => {
  const teacher = new Teacher({
    //creating out teacher object from the module then turning it into a promise
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lastName: req.body.lastName,
    subject: req.body.subject,
    location: req.body.location,
    day: req.body.day,
    time: req.body.time
  });
  //Making sure no duplicates are added
  Teacher.findOne({
    name: req.body.name,
    lastName: req.body.lastName,
    subject: req.body.subject,
    location: req.body.location,
    day: req.body.day,
    time: req.body.time
  }).then(teach => {
    if (teach == null) {
      //if this query returns null meaning this item does not exist we add it
      teacher
        .save()
        .then(teacher => {
          res.status(201).json({
            message: "Added Teacher Successfully",
            createdTeacher: {
              _id: teacher._id,
              name: teacher.name,
              lastName: teacher.lastName,
              subject: teacher.subject,
              location: teacher.location,
              day: teacher.day,
              time: teacher.time
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    } else {
      return res.status(500).json({
        message: "This entry already exists هذه المعلومات موجودة مسبقا" //otherwise we return this.
      });
    }
  });
});

//Get a specific entry by its ID
router.get("/:teacherId", (req, res) => {
  Teacher.findById({ _id: req.params.teacherId })
    .exec()
    .then(teacher => {
      const response = {
        _id: teacher._id,
        name: teacher.name,
        lastName: teacher.lastName,
        subject: teacher.subject,
        location: teacher.location,
        day: teacher.day,
        time: teacher.time
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//Get teachers by their city
router.get("/location/:location", (req, res) => {
  Teacher.find({ location: req.params.location })
    .exec()
    .then(teachers => {
      const response = {
        teachersCount: teachers.length,
        teachers: teachers.map(teacher => {
          return {
            _id: teacher._id,
            name: teacher.name,
            lastName: teacher.lastName,
            subject: teacher.subject,
            location: teacher.location,
            day: teacher.day,
            time: teacher.time
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

//UPDATE REQUEST
router.patch("/:teacherId", (req, res) => {
  Teacher.updateOne({ _id: req.params.teacherId }, { $set: req.body })
    .exec()
    .then(teacher => {
      const response = {
        message: "Teacher Information Updated!",
        teacher: {
          _id: req.body._id,
          name: req.body.name,
          lastName: req.body.lastName,
          subject: req.body.subject,
          location: req.body.location,
          day: req.body.day,
          time: req.body.time
        }
      };
      res.status(200).json(response);
    })
    .catch(err => {
      error: err;
    });
});

//DELETE REQUEST
router.delete("/:teacherId", (req, res, next) => {
  //Replace the matching universities with the body sent on the request
  Teacher.deleteOne({ _id: req.params.teacherId })
    .exec()
    .then(console.log("Deleted Teacher"))
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
