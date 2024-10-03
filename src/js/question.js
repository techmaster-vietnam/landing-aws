let question_icon = document.querySelectorAll(".question_icon");

question_icon.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let question_info =
      this.parentElement.parentElement.querySelector(".question_item");
    if (question_info.style.display == "block") {
      question_info.style.display = "none";
      this.querySelector("img").src = "img/down-arrow.svg";
    } else if (question_info.style.display == "none") {
      question_info.style.display = "block";
      this.querySelector("img").src = "img/up-arrow.svg";
    }
  });
});
