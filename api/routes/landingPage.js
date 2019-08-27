const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const locus = require("locus");
var map = new Map();
router.get(
  "/",
  (req, res) => {
    //   getTeacherCounts(subjectsMap => {
    res.render("landingPage"); //This is only a temporary solution since this slows down the load time of the website because it needs to wait for the objects to load.
  }
  // }
);

// function fetchAllTeacherEntries(callback) {
//   //using a callback function since this takes a short time to fetch the data
//   fetch("http://localhost:3000/api/teachers") //Could change this to a find request to the data base directly like Teacher.find()...
//     .then(res => res.json())
//     .then(res => {
//       return callback(res);
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err), "there");
//     });
// }

// function getTeacherCounts(callback) {
//   fetchAllTeacherEntries(res => {
//     var subjectsArray = res.response.teachers.map(teacher => teacher.subject);
//     var subjectsMap = new Map();
//     for (var i = 0; i < subjectsArray.length; i++) {
//       subjectsMap.set(subjectsArray[i], 0); //Now we have a mapping between every subject and their count which is 0 for now
//     }
//     for (var j = 0; j < subjectsArray.length; j++) {
//       subjectsMap.set(subjectsArray[j], subjectsMap.get(subjectsArray[j]) + 1); //mapping every key with the value of the current key + 1 to get the count of every subject
//     }

//     //eval(locus);
//     return callback(subjectsMap);
//   });
// }
module.exports = router;
