const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Form = require("../models/Form");
const config = require("../../config/config");

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
    const masterPassword = req.body.masterPassword;

    let newAdmin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      lastname: lastname,
      username: username,
      password: password,
      location: location,
      subject: subject,
      isAdmin: isAdmin,
      completedForms: []
    });
    if (masterPassword === config.masterPassword) {
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
              completedForm: admin.completedForms,
              isAdmin: admin.isAdmin
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    } else {
      res.status(500).json({
        error: "Wrong master password"
      });
    }
  }
);

//Login Form
//Equevilant to /admin/login
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
      //Since every teacher entry has the adminId that entered it attached to it, We can use the req.user._id which is the admin id in this case to find the teacher entries this admin submitted
      Teacher.find({ adminId: req.user._id })
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

/*WARNING BEEEP BEEEP*/
//With this, the admin document can be updated without the
router.patch("/:adminId", (req, res, next) => {
  const id = req.params.productId;
  //The goal here is find and updating the completedForms array by adding one element without having to use a get and then an update request to add the completedForm.
  Admin.findOneAndUpdate(
    { _id: id },
    { $push: { completedForms: req.body.completedForm } }
  )
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Admin updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else {
    res.redirect("/admin/login");
  }
}

module.exports = router;
