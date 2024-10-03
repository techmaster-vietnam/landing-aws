let bar = document.getElementById("bar");
let navbar = document.getElementById("nav-bar");
let closebar = document.getElementById("close-bar");
let body = document.querySelector("body");
let linklist = document.getElementById("link-list");
let nav_item = document.querySelectorAll(".nav_category");

bar.onclick = function () {
  navbar.style.width = "250px";
  bar.style.visibility = "hidden";
  body.style.overflowY = "hidden";
  linklist.style.display = "block";
};

closebar.onclick = function () {
  navbar.style.width = "0px";
  body.style.overflowY = "inherit";
  linklist.style.display = "none";
  setTimeout(function () {
    bar.style.visibility = "inherit";
  }, 200);
};

nav_item.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navbar.style.width = "0px";
    body.style.overflowY = "inherit";
    linklist.style.display = "none";
    setTimeout(function () {
      bar.style.visibility = "inherit";
    }, 200);
  });
});
