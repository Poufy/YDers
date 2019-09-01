let citySelection = document.getElementById("city-select");
let timeSelection = document.getElementById("time-select");
let daySelection = document.getElementById("day-select");
let subjectSelection = document.getElementById("subject-select");

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
      //Getting the array of teachers from the GET request response
      let teachers = JSON.parse(this.responseText).response.teachers;
      addOptionsToSubjects(teachers); //Passing the array of teachers to be filtered and added to other selectors

      refreshMaterializeElement();
    }
  };
  //call send
  xhr.send();
};

subjectSelection.onchange = () => {
  /*GOAL: GET THE REMAINING TEACHERS AND FILTER THEM TO FILL IN THE DAY AND TIME SELECT
        SOL1: GET THE TEACHER BY DOING ANOTHER GET REQUEST TO THE DATABASE AND FILTER THEM ACCORDING TO THE ALREADY SELECTED FIELDS
        SOL2: MAKE THE TEACHERS OBJECT GLOBAL AND DO CHANGES ON IT
        SOL3: FIND SOME WAY TO PASS DATA FROM AN EVENT LISTENER TO ANOTHER
  */
  let selectedCity = citySelection.options[citySelection.selectedIndex].value;
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://localhost:3000/api/teachers/location/${selectedCity}`, //this request returns teachers in the selectedCity
    true
  );
  xhr.onload = function() {
    if (this.status === 200) {
      let teachers = JSON.parse(this.responseText).response.teachers;
      let filteredTeachers = teachers.filter(teacher => {
        return teacher.subject === subjectSelection.value;
      });
      addOptionToDays(filteredTeachers);
      refreshMaterializeElement();
    }
  };
  xhr.send();
};

daySelection.onchange = () => {
  let selectedCity = citySelection.options[citySelection.selectedIndex].value;
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://localhost:3000/api/teachers/location/${selectedCity}`, //this request returns teachers in the selectedCity
    true
  );
  xhr.onload = function() {
    if (this.status === 200) {
      let teachers = JSON.parse(this.responseText).response.teachers;
      let filteredTeachers = teachers.filter(teacher => {
        return (
          teacher.subject === subjectSelection.value &&
          teacher.day === daySelection.value
        );
      });
      addOptionToTimes(filteredTeachers);
      refreshMaterializeElement();
    }
  };
  xhr.send();
};

/*ADDING ITEMS TO SUBJECT SELECTION AND DELETING THEM*/

function addOptionsToSubjects(teachers) {
  removeOptions(subjectSelection); //Clearing the fields below it
  removeOptions(timeSelection);
  removeOptions(daySelection);
  const subjectsArray = teachers.map(teacher => teacher.subject);
  const subjectsSet = new Set(subjectsArray);
  for (let subject of subjectsSet.values()) {
    let option = document.createElement("option");
    option.value = subject;
    option.innerHTML = subject;
    subjectSelection.add(option);
  }
}

/*ADDING ITEMS TO DAY SELECTION AND DELETING THEM*/

function addOptionToDays(teachers) {
  removeOptions(daySelection); //Reset the select before updating it
  removeOptions(timeSelection);
  const daysList = teachers.map(teacher => teacher.day);
  const daysSet = new Set(daysList); //To remove duplicates
  console.log(daysSet);
  for (let day of daysSet.values()) {
    let option = document.createElement("option");
    option.value = day;
    option.innerHTML = day;
    daySelection.add(option);
  }
}

/*ADDING ITEMS TO TIME SELECTION AND DELETING THEM*/

function addOptionToTimes(teachers) {
  removeOptions(timeSelection); //Reset the select before updating it

  const timesList = teachers.map(teacher => teacher.time);
  const timesSet = new Set(timesList); //To remove duplicates
  for (let time of timesSet.values()) {
    let option = document.createElement("option");
    option.value = time;
    time = time % 12 !== time ? `${time % 12}:00 مسائاً` : `${time}:00 صباحا`;
    option.innerHTML = time;
    timeSelection.add(option);
  }
}

function removeOptions(selectbox) {
  for (a in selectbox.options) {
    selectbox.options.remove(0);
  }
  //Adding an extra empty option so the onchange event triggers when choosing the same element
  let option = document.createElement("option");
  option.value = "";
  option.innerHTML = "";
  selectbox.add(option);
}

function refreshMaterializeElement() {
  //!IMPORTANT
  //Materializer Select bugs out when dynamically adding options so we reintilize it after adding them.
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
}
