let button = document.getElementsByClassName("completeButton");
button.onclick = () => {
  console.log("test");
};
//   e.preventDefault();

//   if (formId.value === "" || formId.value === null) {
//     completError.innerText = "الرجاء ادخال رقم الطلب";
//   } else {
//     $.ajax({ url: `/api/forms/${formId.value}`, method: "DELETE" })
//       .then(location.reload()) //Refresh the page after completing the item
//       .catch(err => {
//         console.log("did not work");
//       });
//   }
