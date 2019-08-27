let citySelection = document.getElementById("city-select");
let timeSelection = document.getElementById("time-select");

citySelection.onchange = () => {
  let selectedCity = citySelection.options[citySelection.selectedIndex].value;
  //Create the XHR Object
  let xhr = new XMLHttpRequest();
  //Call the open function, GET-type of request, url, true-asynchronous
  xhr.open(
    "GET",
    `http://localhost:3000/api/teachers/location/${selectedCity}`, //this request returns teachers in the selectedCity
    true
  );
  //call the onload
  xhr.onload = function() {
    //check if the status is 200(means everything is okay)
    if (this.status === 200) {
      //return server response as an object with JSON.parse
      const object = JSON.parse(this.responseText);
      const timesList = object.response.teachers.map(teacher => teacher.time);
      const timesSet = new Set(timesList); //To remove duplicates
      for (const k of timesSet.values()) {
        addOptionToTimes(k);
      }

      //!IMPORTANT
      //Materializer Select bugs out when dynamically adding options so we reintilize it after adding them.
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    }
  };
  //call send
  xhr.send();
};

function addOptionToTimes(time) {
  let option = document.createElement("option");
  option.value = option.innerHTML = time;
  timeSelection.add(option);
  console.log("method is called");
}
