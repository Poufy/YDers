document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, { draggable: true });
  //Create the XHR Object
  let xhr = new XMLHttpRequest();
  //Call the open function, GET-type of request, url, true-asynchronous
  xhr.open("GET", "http://localhost:3000/api/teachers", true);
  //call the onload
  xhr.onload = function() {
    //check if the status is 200(means everything is okay)
    if (this.status === 200) {
      //return server response as an object with JSON.parse
      const object = JSON.parse(this.responseText);
      var subjectsArray = object.response.teachers.map(teacher =>
        teacher.subject.toLowerCase()
      );
      document.getElementById("math_header").innerHTML =
        getOccurances(subjectsArray, "math") || 0; //In case the subject does not exist in the map
      document.getElementById("chem_header").innerHTML =
        getOccurances(subjectsArray, "chemistry") || 0;
      document.getElementById("phys_header").innerHTML =
        getOccurances(subjectsArray, "physics") || 0;
      document.getElementById("bio_header").innerHTML =
        getOccurances(subjectsArray, "biology") || 0;
      document.getElementById("ar_header").innerHTML =
        getOccurances(subjectsArray, "arabic") || 0;
      document.getElementById("eng_header").innerHTML =
        getOccurances(subjectsArray, "english") || 0;
      document.getElementById("fr_header").innerHTML =
        getOccurances(subjectsArray, "french") || 0;
      document.getElementById("geo_header").innerHTML =
        getOccurances(subjectsArray, "geography") || 0;
    }
  };
  //call send
  xhr.send();
});

function getOccurances(arr, str) {
  return arr.filter(e => {
    return str === e;
  }).length;
}
