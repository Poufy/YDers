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
    $.ajax({
      type: "POST",
      url: "/api/forms",
      data: {
        name: nameInput.value,
        lastName: lastNameInput.value,
        phoneNumber: phoneNumberInput.value,
        subject: subjectSelect.value,
        location: citySelect.value,
        day: daySelect.value,
        time: timeSelect.value
      },
      dataType: "json",
      success: function(data, textStatus) {
        /*It seems like when sending an ajax post request from the client to a route that has a redirect, the redirect happens but the url stays the same meaning the html display also stays the same.
          To fix this instead of redirecting to another page I made the post route send an object {redirect: url} to the client and I used that object to change the url */
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          //reseting the form if the page is not gonna get redirected
          //Could just refresh the page and display some pop up message
          document.getElementById("form").reset();
        }
      }
    });
  }
});
