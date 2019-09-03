const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Admin = require("../models/Admin");
const locus = require("locus");
const Teacher = require("../models/Teacher");
const Form = require("../models/Form");

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
  /*Nesting the promises in order to perform two database queries one to get the forms and 
  one for the teacher entries and sending both over to the panel
   */
  let formResponse = {};
  let teacherResponse = {};
  Form.find({
    subject: req.user.subject,
    city: req.user.city
  })
    .exec()
    .then(forms => {
      formResponse = {
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

      Teacher.find()
        .exec()
        .then(teachers => {
          teacherResponse = {
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
          // eval(locus);
          res.render("panel", {
            admin: req.user,
            formObjects: formResponse,
            teacherObjects: teacherResponse
          });
        })
        .catch(err => {
          console.log(err);
        });
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
