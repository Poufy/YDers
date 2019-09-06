const adminForm = document.getElementById("admin-form");
const timeSelect = document.getElementById("admin-time-select");
const daySelect = document.getElementById("admin-day-select");
const name = document.getElementById("admin-name");
const lastname = document.getElementById("admin-lastname");
const city = document.getElementById("admin-city");
const subject = document.getElementById("admin-subject");
const adminId = document.getElementById("admin-id");
const error = document.getElementById("admin-error");

adminForm.addEventListener("submit", e => {
  e.preventDefault();
  let selectedDay = daySelect.options[daySelect.selectedIndex].value; //Getting the value of the selected option
  let selectedTime = timeSelect.options[timeSelect.selectedIndex].value;
  let errors = [];

  if (selectedTime === "" || selectedTime == null) {
    errors.push("يجب اختيار الوقت");
  }
  if (selectedDay === "" || selectedDay == null) {
    errors.push("يجب اختيار اليوم");
  }

  if (errors.length > 0) {
    error.innerText = errors.join(", ");
  } else {
    console.table({
      name: name.innerHTML,
      lastName: lastname.innerHTML,
      subject: subject.innerHTML,
      location: city.innerHTML,
      day: selectedDay,
      time: selectedTime,
      adminId: adminId.innerHTML
    });
    $.ajax({
      type: "POST",
      url: "/api/teachers",
      data: {
        name: name.innerHTML,
        lastName: lastname.innerHTML,
        subject: subject.innerHTML,
        location: city.innerHTML,
        day: selectedDay,
        time: selectedTime,
        adminId: adminId.innerHTML
      },
      dataType: "json",
      success: function(data, textStatus) {
        location.reload();
      }
    });
  }
});
