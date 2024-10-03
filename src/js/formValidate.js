function checkValid(name, phone, email) {
  let valid = true;

  const nameMessage = document.querySelector(".name-message");
  const phoneMessage = document.querySelector(".phone-message");
  const emailMessage = document.querySelector(".email-message");

  if (name.value.trim() == "") {
    name.classList.remove("valid");
    name.classList.add("invalid");
    nameMessage.innerText = "Vui lòng nhập đúng họ tên";
    valid = false;
  } else {
    name.classList.remove("invalid");
    name.classList.add("valid");
    nameMessage.innerText = "";
  }

  if (phone.value.trim() == "") {
    phone.classList.remove("valid");
    phone.classList.add("invalid");
    phoneMessage.innerText = "Vui lòng nhập đúng số điện thoại";
    valid = false;
  } else {
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    phoneMessage.innerText = "";
  }

  if (email.value.trim() == "" || !email.value.includes("@")) {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailMessage.innerText = "Vui lòng nhập đúng email";
    valid = false;
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
    emailMessage.innerText = "";
  }

  return valid;
}

document.getElementById("btn-register").addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const note = document.getElementById("note");

  if (checkValid(name, phone, email)) {
    let nameVal = name.value;
    let phoneVal = phone.value;
    let emailVal = email.value;
    let noteVal = note.value;

    let req = {
      FullName: nameVal,
      Email: emailVal,
      Phone: phoneVal,
      Note: noteVal,
      Link: window.location.href,
      ItemId: "nl2",
    };

    let myJSON = JSON.stringify(req);

    $.ajax({
      url: "https://techmaster.vn/submit-advisory",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: myJSON,
      dataType: "json",
      success: function () {
        name.value = phone.value = email.value = note.value = "";
        name.classList.remove("valid");
        phone.classList.remove("valid");
        email.classList.remove("valid");
        toggleModal();
      },
      error: function (result) {
        console.error(result);
      },
    });
  }
});

document.getElementById("btn-register").addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const note = document.getElementById("note");

  if (checkValid(name, phone, email)) {
    let nameVal = name.value;
    let phoneVal = phone.value;
    let emailVal = email.value;
    let noteVal = note.value;

    let req = {
      FullName: nameVal,
      Email: emailVal,
      Phone: phoneVal,
      Note: noteVal,
      Link: window.location.href,
      ItemId: "nl2",
    };

    let myJSON = JSON.stringify(req);

    $.ajax({
      url: "https://techmaster.vn/submit-advisory",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: myJSON,
      dataType: "json",
      success: function () {
        name.value = phone.value = email.value = note.value = "";
        name.classList.remove("valid");
        phone.classList.remove("valid");
        email.classList.remove("valid");
        toggleModal();
      },
      error: function (result) {
        console.error(result);
      },
    });
  }
});
