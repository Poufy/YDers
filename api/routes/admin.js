const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const Admin = require("../models/Admin");
const locus = require("locus");
const Teacher = require("../models/Teacher");
const Form = require("../models/Form");

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
    const name = req.body.name;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const subject = req.body.subject;
    const isAdmin = req.body.isAdmin;

    let newAdmin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      lastname: lastname,
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
            name: admin.name,
            lastname: admin.lastname,
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
  //If we wanted to only show the specific times
  //Pass all entries that match this admin in terms of subject/city/time
  /*We need the forms only with the times that this admin has submitted but these times are stored in Teacher entries which is unrelated to the admin
  but the admin name and teacher name are matching so we can extract the times the admin submitted from the teacher entries
  */
  // let timesArray;
  // Teacher.find({ name: req.user.name, lastName: req.user.lastname })
  //   .exec()
  //   .then(teachers => {
  //     const response = {
  //       teachers: teachers.map(teacher => teacher.time)
  //     };
  //     timesArray = response.teachers;
  //   })
  //   .catch(err => {
  //     console.log("Failed to get teachers");
  //   });
  //eval(locus);
  //After exctracting the times now we need the forms that match the times/subject/city

  Form.find({
    subject: req.user.subject,
    city: req.user.city
  })
    .exec()
    .then(forms => {
      const response = {
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
            day: form.day,
            time: form.time
          };
        })
      };
      //eval(locus);
      res.render("panel", { admin: req.user, formObjects: response });
      // res.status(200).json(response);
    })
    .catch(err => {
      res.render("panel", { admin: req.user, forms: {} });
    });
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
