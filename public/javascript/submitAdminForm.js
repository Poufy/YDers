const adminForm = document.getElementById("admin-form");
const timeSelect = document.getElementById("admin-time-select");
const daySelect = document.getElementById("admin-day-select");
const name = document.getElementById("admin-name");
const lastname = document.getElementById("admin-lastname");
const city = document.getElementById("admin-city");
const subject = document.getElementById("admin-subject");
const error = document.getElementById("admin-error");

adminForm.addEventListener("submit", e => {
  e.preventDefault();
  let selectedDay = daySelect.options[daySelect.selectedIndex].value; //Getting the value of the selected option
  let selectedTime = timeSelect.options[timeSelect.selectedIndex].text;
  let errors = [];
  //   if (citySelect.value === "" || citySelect.value == null) {
  //     errors.push("يجب اختيار المدينة");
  //   }
  if (selectedTime === "" || selectedTime == null) {
    errors.push("يجب اختيار الوقت");
  }
  if (selectedDay === "" || selectedDay == null) {
    errors.push("يجب اختيار اليوم");
  }
  //   if (subjectSelect.value === "" || subjectSelect.value == null) {
  //     errors.push("يجب اختيار المادة");
  //   }

  if (errors.length > 0) {
    error.innerText = errors.join(", ");
  } else {
    // var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    // var theUrl = "/api/teachers";
    // xmlhttp.open("POST", theUrl);
    // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xmlhttp.send(
    //   JSON.stringify({
    //     name: name.innerHTML,
    //     lastName: lastname.innerHTML,
    //     subject: subject.innerHTML,
    //     location: city.innerHTML,
    //     day: selectedDay,
    //     time: selectedTime
    //   })
    // );
    console.table({
      name: name.innerHTML,
      lastName: lastname.innerHTML,
      subject: subject.innerHTML,
      location: city.innerHTML,
      day: selectedDay,
      time: selectedTime
    });
    // console.log(city.innerHTML);
    $.ajax({
      type: "POST",
      url: "/api/teachers",
      data: {
        name: name.innerHTML,
        lastName: lastname.innerHTML,
        subject: subject.innerHTML,
        location: city.innerHTML,
        day: selectedDay,
        time: selectedTime
      },
      dataType: "json",
      success: function(data, textStatus) {
        /*It seems like when sending an ajax post request from the client to a route that has a redirect, the redirect happens but the url stays the same meaning the html display also stays the same.
            To fix this instead of redirecting to another page I made the post route send an object {redirect: url} to the client and I used that object to change the url */

        //reseting the form if the page is not gonna get redirected
        //Could just refresh the page and display some pop up message
        adminForm.reset();
      }
    });
  }
});
