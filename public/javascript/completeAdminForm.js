const completeAdminForm = document.getElementById("admin-complete-form");
const formId = document.getElementById("form-complete-id");
const completError = document.getElementById("admin-complete-error");
completeAdminForm.addEventListener("submit", e => {
  e.preventDefault();

  if (formId.value === "" || formId.value === null) {
    completError.innerText = "الرجاء ادخال رقم الطلب";
  } else {
    $.ajax({ url: `/api/forms/${formId.value}`, method: "DELETE" })
      .then(location.reload()) //Refresh the page after completing the item
      .catch(err => {
        console.log("did not work");
      });
  }
});
