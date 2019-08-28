const form = document.getElementById("form");
const citySelect = document.getElementById("city-select");
const timeSelect = document.getElementById("time-select");
const daySelect = document.getElementById("day-select");
const subjectSelect = document.getElementById("subject-select");
const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("lastName-input");
const phoneNumberInput = document.getElementById("phoneNumber-input");
const errorElement = document.getElementById("error");

form.addEventListener("submit", e => {
  e.preventDefault();
  let errors = [];
  if (citySelect.value === "" || citySelect.value == null) {
    errors.push("يجب اختيار المدينة");
  }
  if (timeSelect.value === "" || timeSelect.value == null) {
    errors.push("يجب اختيار الوقت");
  }
  if (daySelect.value === "" || daySelect.value == null) {
    errors.push("يجب اختيار اليوم");
  }
  if (subjectSelect.value === "" || subjectSelect.value == null) {
    errors.push("يجب اختيار المادة");
  }
  if (phoneNumberInput.value === "" || phoneNumberInput.value == null) {
    errors.push("يجب ادخال رقم الجوال");
  }
  if (nameInput.value === "" || nameInput.value == null) {
    errors.push("يجب ادخال الاسم");
  }
  if (lastNameInput.value === "" || lastNameInput.value == null) {
    errors.push("يجيب ادخال الكنية");
  }

  if (errors.length > 0) {
    errorElement.innerText = errors.join(", ");
  } else {
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "localhost:3000/api/forms");
    // xhr.setRequestHeader(
    //   "x-www-form-urlencoded",
    //   "application/json;charset=UTF-8"
    // );
    // xhr.onload = function() {
    //   if (xhr.status === 200) {
    //     alert("Something went wrong.");
    //   } else if (xhr.status !== 200) {
    //     alert("Request failed.  Returned status of " + xhr.status);
    //   }
    // };
    // xhr.send(
    //   JSON.stringify({
    //     name: nameInput.value,
    //     lastName: lastNameInput.value,
    //     phoneNumber: phoneNumberInput.value,
    //     subject: subjectSelect.value,
    //     location: citySelect.value,
    //     day: daySelect.value,
    //     time: timeSelect.value
    //   })
    // );
    $.ajax({
      url: "/api/forms",
      type: "POST",
      dataType: "json",
      data: {
        name: nameInput.value,
        lastName: lastNameInput.value,
        phoneNumber: phoneNumberInput.value,
        subject: subjectSelect.value,
        location: citySelect.value,
        day: daySelect.value,
        time: timeSelect.value
      }
    });
  }
});
