import "../css/style.css";
import "lazysizes";
import { Modal } from "bootstrap";

//passive scroll Jquery
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  },
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  },
};

let bar = document.getElementById("bar");
let navbar = document.getElementById("nav-bar");
let closebar = document.getElementById("close-bar");
let body = document.querySelector("body");
let linklist = document.getElementById("link-list");
let nav_item = document.querySelectorAll(".nav_category");

let flag = false;

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

console.log(question_icon);

question_icon.forEach(function (btn) {
  question_icon.onclick = function () {
    console.log("hi");
  };
});

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

function toggleModal() {
  const body = document.querySelector("body");
  successModal.classList.toggle("showUp");
  body.classList.toggle("preventScroll");
}

const successModal = document.getElementById("successModal");
successModal.addEventListener("click", function () {
  toggleModal();
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
      // Type: 1,
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

let isMaterialVideoLoaded = false;
/* Lazyload video */
$(window).on("scroll", function () {
  if (!isMaterialVideoLoaded) {
    var hT = $("#target").offset().top,
      hH = $("#target").outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > hT + hH - wH) {
      $(".material .intro_image").html(`
      <iframe width="560" height="315" class="lazyload" data-src="https://www.youtube.com/embed/1oJu87Fw2Pg"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      `);
      isMaterialVideoLoaded = true;
    }
  }
});

let isDemoVideoLoaded = false;
/* Lazyload video */
// $(window).on("scroll", function () {
//   if (!isDemoVideoLoaded) {
//     var hT = $("#product").offset().top,
//       hH = $("#product").outerHeight(),
//       wH = $(window).height(),
//       wS = $(this).scrollTop();
//     if (wS > hT + hH - wH) {
//       $(".video_container").html(`
//       <div class="video">
//         <iframe width="560" height="315" src="https://www.youtube.com/embed/1oJu87Fw2Pg"
//           title="YouTube video player" frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowfullscreen>
//         </iframe>
//         <a href="https://www.youtube.com/watch?v=1oJu87Fw2Pg">
//             <div class="video_name">
//                 HƯỚNG DẪN LẬP TRÌNH GAME TETRIS
//             </div>
//         </a>
//         </div>
//         <div class="video">
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/gVqWSkYjqeQ"
//                 title="YouTube video player" frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowfullscreen></iframe>
//             <a href="https://www.youtube.com/watch?v=gVqWSkYjqeQ">
//                 <div class="video_name">
//                     HƯỚNG DẪN LẬP TRÌNH GAME FLAPPY BIRD
//                 </div>
//             </a>
//         </div>
//       `);
//       isDemoVideoLoaded = true;
//     }
//   }
// });

$(window)
  .scroll(function () {
    var scrollDistance = $(window).scrollTop();

    // Show/hide menu on scroll
    //if (scrollDistance >= 850) {
    //		$('nav').fadeIn("fast");
    //} else {
    //		$('nav').fadeOut("fast");
    //}

    // Assign active class to nav links while scolling
    $(".menu-section").each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $(".nav_category a.active").removeClass("active");
        $(".nav_category a").eq(i).addClass("active");
      }
    });
  })
  .scroll();

var slideIndex = 1;

let dot_bar = document.getElementById("dot_bar");
var allslides = document.getElementsByClassName("mySlides");

for (let i = 1; i <= allslides.length; i++) {
  dot_bar.innerHTML += `
    <span class="dot"></span>
  `;
}

let dot = document.getElementsByClassName("dot");

$.each(dot, function (index, icon) {
  console.log("index ", index, icon);
  icon.addEventListener("click", function () {
    slideIndex = index + 1;
    console.log(slideIndex);
    showSlides(slideIndex);
  });
});

showSlides(slideIndex);

let prev_btn = document.getElementById("prev_btn");

prev_btn.addEventListener("click", function () {
  slideIndex--;
  console.log(slideIndex);
  showSlides(slideIndex);
});

prev_btn.addEventListener("click", function () {
  console.log("hello");
});

let next_btn = document.getElementById("next_btn");

next_btn.addEventListener("click", function () {
  slideIndex++;
  console.log(slideIndex);
  showSlides(slideIndex);
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    // console.log("i m called");
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slide_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slide_active";
}

// fetch('../img/outline.json').then(res => res.json()).then(data => console.log('🚀 outline aws: ',data))
const dataAws = [
  {
    name: "Tổng quan Amazon Web Service",
    display_order: 1,
    lectures: [
      {
        title: "Nhập môn AWS",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Đăng nhập với tài khoản root vs tài khoản IAM",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Sử dụng nhiều profile cho AWS CLI",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo cảnh báo chi phí vượt ngưỡng",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Xem chi phí để biết dịch vụ nào tốn kém",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Tối ưu chi phí sử dụng AWS",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz IAM",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz Intro to AWS",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: Billing Cost",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "IAM",
    display_order: 2,
    lectures: [
      {
        title: "Lý thuyết",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: cho phép IAM user xem billing dashboard",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo IAM user, cấp quyền Administrator cho user này",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Switch Role",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: IAM",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Networking - VPC",
    display_order: 3,
    lectures: [
      {
        title: "Module Overview",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lý thuyết mạng cơ bản",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Exercise: quy hoạch subnet",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "VPC & Subnet overview",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Internet Gateway & Route Table",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: (view) default VPC",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo VPC đơn giản với public subnet",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Bastion hosts",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Private Subnet & NAT",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo VPC với private subnet",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: tạo bastion host",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: VPC endpoint - S3 gateway endpoint",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: VPC overview",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "VPC Peering",
        display_order: 14,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo kết nối giữa các VPC (VPC peering)",
        display_order: 15,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "VPN, Direct connect, Transit gateway",
        display_order: 16,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Kết nối các network với Transit Gateway",
        display_order: 17,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: VPC",
        display_order: 18,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "VPC (tiếp). Route 53",
    display_order: 4,
    lectures: [
      {
        title: "Module Overview",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "DNS: Domain Name System",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Transfer domain trên Google domain sang Route53",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Public vs Private hosted zone",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CNAME vs R53 Alias",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "R53 health check",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Weighted Routing Policy",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Failover Routing Policy",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Routing Policies",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Weighted Routing Policy",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "R53 quiz",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "S3",
    display_order: 5,
    lectures: [
      {
        title: "S3 bucket - object",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Thao tác AWS CLI S3",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Object versioning",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Cấp quyền cho user List, Put object lên S3",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Bucket policy",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Bucket policy",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Hosting web site tĩnh lên S3",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "S3 CORS",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 CORS",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Từ EC2, upload file lên S3 dùng AWS CLI",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 06: Mount S3 bucket vào một folder trong  EC2",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "S3 storage class",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "S3 lifecycle configuration",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "S3 replication",
        display_order: 14,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Replication (part 1)",
        display_order: 15,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Replication (part 2)",
        display_order: 16,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Pre-signed URL",
        display_order: 17,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo pre-signed URL",
        display_order: 18,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "S3 encrytion",
        display_order: 19,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 encryption (part 1)",
        display_order: 20,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 encryption (part 2)",
        display_order: 21,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Section quiz",
        display_order: 22,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "S3 (tiếp) . CloudFront",
    display_order: 7,
    lectures: [
      {
        title: "Kiến trúc CloudFront",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo 1 CloudFront distribution cho 1 S3 static web",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: CloudFront behaviour",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: CloudFront OAI cho S3 bucket",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo CloudFront signed url",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Cấu hình custom domain và SSL cho CloudFront",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudFront origin",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "SSL/TLS và SNI",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudFront quiz",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "EC2: Elastic Computing",
    display_order: 6,
    lectures: [
      {
        title: "\bCăn bản EC2",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo EC2 instance",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Kết nối vào EC2",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Mở cổng vào EC2 - Edit Inbound rule",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Triển khai một static web site lên EC2",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Cấp quyền để IAM user có thể quản lý EC2",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: viết scripting khởi động EC2 sử  dụng  UserData",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Viết script chạy mỗi khi EC2 reboot",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Cài đặt JDK 17 lên EC2",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo AMI từ EC2 và tạo EC2 từ AMI",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Home work: triển khai ứng dụng web",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Home Work: Viết script khởi động trong EC2 User Data",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },

  {
    name: "EC2: triển khai web site, ứng dụng",
    display_order: 8,
    lectures: [
      {
        title: "Exam Notes: EC2",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Triển khai ứng dụng Golang REST lên EC2",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "HW: Triển khai ứng dụng Golang REST lên EC2",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title:
          "Lab: Application Load Balancer + Launch Template + Target Group",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "HW: Tạo Application Load Balancer",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Run commands trên nhiều EC2 instances mà không cần SSH",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "EBS: Elastic Block Storage",
    display_order: 19,
    lectures: [
      {
        title: "Căn bản EBS",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo EBS, attach vào EC2, format và sử dụng",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: sao chép dữ liệu từ EBS ở Region này sang Region khác",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Chỉnh sửa data của EBS đang được attach vào EC2",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Mã hoá ổ lưu trữ EBS",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: EBS Multiple Attach",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "EFS: Elastic File System",
    display_order: 31,
    lectures: [
      {
        title: "EFS căn bản",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Khởi tạo EFS",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Sử dụng EFS",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Auto Scaling Group (ASG) & Elastic Load Balancer (ELB)",
    display_order: 15,
    lectures: [
      {
        title: "Launch Configuration & Launch Template",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo launch template và khởi tạo EC2 instance",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Auto Scaling Group (ASG)",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Sử dụng ASG + Launch template tạo cụm web app trên EC2",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "ASG scaling policy & lifecycle hook",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Elastic Load Balancer (ELB) introduction",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Application Load Balancer (ALB)",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tích hợp ALB + ASG (part 1)",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tích hợp ALB + ASG (part 2)",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Blue/Green deployment với ALB + ASG",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Blue-Green deployment với ALB + ASG (part 2)",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Network Load Balancer (NLB)",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "ALB + ASG quiz",
        display_order: 14,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Cloud Formation",
    display_order: 18,
    lectures: [
      {
        title: "Giới thiệu về CloudFormation (Cfn)",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Deploy và Update 1 Cfn template có sẵn",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Cloudformation Concepts",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Cfn Template - Các thành phần cơ bản trong Cfn template",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Instrict function và Pseudo parameters",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: VÍ dụ về DependsOn",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo EC2 với WaitCondition",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "DependsOn và WaitConditional",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Resource attributes",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Giới thiệu qua cfn-helper script",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo 2 VPC và peering với Cloudfomation",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo 1 EC2 trên vpc vừa tạo",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Nested Stack và CrossStack",
        display_order: 16,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Tính năng khác",
        display_order: 18,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lưu ý về CFn",
        display_order: 19,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  // {
  //     name: 'Elastic Cache',
  //     display_order: 9,
  //     lectures: [
  //         {
  //             title: 'Tại sao ta lại cần cache',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'ElastiCache là gì?',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Hands On: Tạo một cache cluster',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Sử dụng ElastiCache để tăng tốc WordPress',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Cache deployment options',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Memcached: cluster',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Redis: Single-node cluster',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Redis: cluster mode disabled',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Redis: cluster mode enabled',
  //             display_order: 9,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Spring Boot + Elastic Cache',
  //             display_order: 10,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Secutiry',
  //             display_order: 11,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Tweaking cache performance',
  //             display_order: 12,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Quiz Elasticache',
  //             display_order: 13,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'DynamoDB, DynamoDB Stream',
  //     display_order: 12,
  //     lectures: [
  //         {
  //             title: 'DynamoDB Introduction',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Exam Notes',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab 01. CRUD in DynamoDB',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Quiz DynamoDB #1',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab 02. Access DynamoDB with CLI',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: AWS CLI nạp dữ liệu JSON vào bảng',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab 04. Access DynamoDB with boto3',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab 03. PartiQL',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Java Spring Boot kết nối DynamoDB',
  //             display_order: 9,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Kết hợp EC2, DynamoDB, S3',
  //             display_order: 10,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Quiz DynamoDB #2',
  //             display_order: 11,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'HW: đóng gói ứng dụng Web kết nối vào S3, DynamoDB',
  //             display_order: 12,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'IAM - Advance',
  //     display_order: 16,
  //     lectures: [
  //         {
  //             title: 'Slide',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS IAM | VPC: Bộ đôi service dành cho kết nối bảo mật',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS STS - Tạo temporary token để liên kết hệ thống ngoài (3rd party)',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'IAM - Các policy',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Các ID provider do AWS cung cấp',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'TÍnh năng khác trong IAM',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Resource Access Manager (AWS RAM)',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Quiz 1:',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'API Gateway, XRay',
  //     display_order: 25,
  //     lectures: [
  //         {
  //             title: 'What is API Gateway?',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'API Gateway feature',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Hands On: Create a API Gateway',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Build REST API with API Gateway and Lambda',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Debugging with CloudWatch Logs',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Monitoring with CloudWatch Metrics',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Tracing API with X-Ray',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'AWS Batch + AWS Beanstalk',
  //     display_order: 28,
  //     lectures: [
  //         {
  //             title: 'AWS Batch',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS Batch Concept',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS Batch (lab)',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS Batch Best practice',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS Beanstalk',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'AWS Beanstalk concept',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Beanstalk (lab)',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'Kinh nghiệm thi chứng chỉ',
  //     display_order: 30,
  //     lectures: [
  //         {
  //             title: 'Một số kinh nghiệm khi thi',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },
  // {
  //     name: '\bAWS SDK Python Boto3',
  //     display_order: 10,
  //     lectures: [
  //         {
  //             title: 'Boto3: thư viện  AWS SDK Python',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Paginators phân trang  dữ liệu trả về',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'S3 List Object low level API vs high level API',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Upload file lên S3',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Liệt kê các Availability Zone của dịch vụ EC2',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Liệt kê các EC2 trong một Region',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Liệt kê EC2 trong tất cả các Region',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Liệt kê EC2 đang running ở tất cả các region',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Start, stop, terminate một EC2',
  //             display_order: 9,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'HW: Lập trình stop tất cả các running EC2 ở tất cả các region',
  //             display_order: 10,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Học viên  hỏi',
  //             display_order: 11,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'Lập trình S3 nâng cao',
  //     display_order: 33,
  //     lectures: [
  //         {
  //             title: 'Upload file kích thước lớn lên S3',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: '4 tips khi làm việc với S3',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Upload file sử dụng TransferManager',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Upload file sử dụng presigned URL',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'HW: triển khai ứng dụng upload Transfer Manager vào EC2',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Exam Notes: S3',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  // {
  //     name: 'Amazon  Simple Email Service',
  //     display_order: 35,
  //     lectures: [
  //         {
  //             title: 'Lab: Gửi email bằng Python, Boto3',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Gửi email theo template',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Cấu hình DKIM để xác thực domain gửi email',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Amazon SES + Gmail',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: monitor the opens, clicks, and bounces from emails that I send using Amazon SES',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Gửi email có file đính kèm',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },
  // {
  //     name: 'Storage',
  //     display_order: 36,
  //     lectures: [
  //         {
  //             title: 'Khác biệt giữa EBS và EFS vs S3',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Tạo  EFS',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Mount EFS vào EC2 instance',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Tạo Access Point trong EFS',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Phân quyền thao tác EFS bằng File System Policy',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'HW: Tạo EFS và mount Access Point vào nhiều EC2 instance',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'HW: Tạo EC2 Launch Template để mount EFS',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Replicate EFS từ Region A sang Region B',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },
  // {
  //     name: '37. Encryption & Security',
  //     display_order: 37,
  //     lectures: [
  //         {
  //             title: 'Encryption',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },
  // {
  //     name: 'Dự  toán, quản  lý  chi  phí  sử  dụng  AWS',
  //     display_order: 38,
  //     lectures: [
  //         {
  //             title: 'Dự toán chi phí EC2, RDS, API Gateway',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Cấu hình EC2 theo các hình thức trả phí khác nhau',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },

  {
    name: "Terraform #1",
    display_order: 29,
    lectures: [
      {
        title: "Infrastructure as Code và Terraform",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Life cycle của một resource trong Terraform",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Terraform functional programming",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Terraform Module: Create Virtual Private Cloud on AWS",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Terraform #2",
    display_order: 29,
    lectures: [],
  },
  {
    name: "DynamoDB, DynamoDB Stream",
    display_order: 34,
    lectures: [
      {
        title: "Lab: AWS CLI  DynamoDB  Stream",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title:
          "Lab: Spring Boot - Web Flux - Server Sent - DynamoDB Stream - P1",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title:
          "Lab: Spring Boot - Web Flux - Server Sent - DynamoDB Stream - P2",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: DynamoDB Stream + Lambda",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "HW: Triển khai DynamoDB Stream - Lambda - RDS",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Dynamodb trigger Lambda function",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Lambda",
    display_order: 13,
    lectures: [
      {
        title: "Lab: tạo Lambda function",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 trigger Lambda function",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title:
          "Lab: bắt sự thay đổi trong DynamoDB bằng DynamoDB stream + Lambda",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Đóng gói Python package vào Lambda function",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: EC2 trigger Lambda function",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  // {
  //     name: 'Lambda',
  //     display_order: 11,
  //     lectures: [
  //         {
  //             title: 'Cloud models',
  //             display_order: 1,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Infrastructure as a Service',
  //             display_order: 2,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Container as a Service',
  //             display_order: 3,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Platform as a Service',
  //             display_order: 4,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Function as a Service',
  //             display_order: 5,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Serverless Architecture',
  //             display_order: 6,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'What is AWS Lambda?',
  //             display_order: 7,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lambda Source events',
  //             display_order: 8,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Hands On: Running your code on AWS Lambda',
  //             display_order: 9,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lambda use case',
  //             display_order: 10,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lab: Integrate AWS Lambda with DynamoDB',
  //             display_order: 11,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lambda version and alias',
  //             display_order: 12,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lambda Alias',
  //             display_order: 13,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Lambda Auto Scaling',
  //             display_order: 14,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Hands On: Reserved concurrency',
  //             display_order: 15,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //         {
  //             title: 'Quiz',
  //             display_order: 16,
  //             video_id: '',
  //             video_duration: 0,
  //             server_id: 0,
  //         },
  //     ],
  // },
  {
    name: "Integration and Messaging: SQS, SNS & Kinesis",
    display_order: 21,
    lectures: [
      {
        title: "Module Overview",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Cấu hình S3 send event SQS queue",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Text To Audio Using AWS Polly - part 1",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Pub Sub",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: Decoupling Architecture",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "RDS - Aurora",
    display_order: 14,
    lectures: [
      {
        title: "Module Overview",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo RDS MySQL, kết nối từ client",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Import Sakila database vào RDS",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Dựng WordPress trên EC2 kết nối RDS phần 1",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Dựng WordPress trên EC2 kết nối RDS phần 2",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: tạo và kết nối tới RDS MySQL",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title:
          "Lab: (Self study) thay đổi cấu hình Database và Monitor database workload, log, event",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: RDS IAM Authentication",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab; Encrypt running RDS",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz: RDS",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Lập trình AWS SDK Golang",
    display_order: 32,
    lectures: [
      {
        title: "Lab: Cài đặt môi trường Go trong EC2",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Liệt kê danh sách object trong S3 bucket bằng SDK Golang",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo web app upload file rồi  lưu vào S3 phần  1",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Upload file lên S3 bằng SDK Golang",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: Tạo web app upload file rồi  lưu vào S3 phần  2",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: EC2 upload file to S3-P1",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: EC2 upload file to S3-P2",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "CI/CD CodePipeline, CodeBuild",
    display_order: 17,
    lectures: [
      {
        title: "What is CI/CD?",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Why are we not use Jenkins or Gitlab CI on AWS?",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "What is CodePipeline?",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "What is CodeBuild?",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Simple CodeBuild Structure",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Hands On: Create CI/CD for Lambda",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "What is CodeDeploy?",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Hands On: Create CI/CD for Single Page Application",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Implement Notification with SNS",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Implement Notification with AWS Chatbot",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Create CI/CD with Terraform",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "ECS, ECR, Fargate & Docker #1",
    display_order: 22,
    lectures: [
      {
        title: "Docker overview",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "ECR Overview",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "ECS concepts",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "ECS Hands on",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Fargate",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "EKS Overview",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "EKS Part II",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "ECS, ECR, Fargate & Docker #2",
    display_order: 22,
    lectures: [],
  },
  {
    name: "Monitoring & Audit: Cloud Watch, Cloud Trail, AWS Config",
    display_order: 20,
    lectures: [
      {
        title: "Giới thiệu về AWS Monitoring & Audit",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Metrics + Dashboard",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Logs",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Agent + CloudWatch Logs Agent",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Logs Metric Filters",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Alarms",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Instance Recovery with CloudWatch Alarm",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch Events",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "EventBridge",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudTrail Overview",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudTrail Hands on",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "AWS Config Hands on",
        display_order: 12,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "X Ray Overview",
        display_order: 13,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "X Ray Hands on",
        display_order: 14,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "X Ray Rules and Concepts",
        display_order: 15,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "CloudWatch + CloudTrail + AWS Config + X Ray",
        display_order: 16,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Cognitor: quản lý tài khoản người dùng",
    display_order: 23,
    lectures: [
      {
        title: "API - REST API",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "API Gateway overview",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "AWS Cognito Overview",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Cognito User Pool",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Cognito Federated Identity",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "SAM; Serverless Application Model",
    display_order: 24,
    lectures: [
      {
        title: "Lý thuyết",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 01: Install AWS SAM CLI",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 02: A simple API back-end by SAM",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 03: S3 - SNS - Lambda app by SAM",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 04: Giới thiệu Cloud9",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 05: Schedule Serverless App",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 - SQS",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab: S3 + SQS  + Server Sent Event + Spring  Boot",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "KMS, Security, Encryption",
    display_order: 27,
    lectures: [],
  },
  {
    name: "Cloud Development Kit",
    display_order: 26,
    lectures: [
      {
        title: "CDK Introduction",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 01: CDK Installation",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 02: HelloCdk App in Python",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 03: Simple Back-end API",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Lab 04: Schedule App",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Quiz",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "HW: S3 + SNS + Lambda app",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "Tổng hợp các kiểu kiến trúc AWS, các bài toán thực tế thường gặp",
    display_order: 27,
    lectures: [
      {
        title: "Thực hành các dạng kiến trúc AWS thường gặp",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "QUIZ - 715",
    display_order: 39,
    lectures: [
      {
        title: "Whizlab AWS Practice 1",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Whizlab AWS Practice 2",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Whizlab AWS Practice 3",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Whizlab AWS Practice 4",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Whizlab AWS Practice 5",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 1",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 2",
        display_order: 7,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 3",
        display_order: 8,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 4",
        display_order: 9,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 5",
        display_order: 10,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "Udemy AWS Practice 6",
        display_order: 11,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "QUIZ AWS SA 03",
    display_order: 40,
    lectures: [
      {
        title: "QUIZ AWS SA 03 - Test 1",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "QUIZ AWS SA 03 - Test 2",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "QUIZ AWS SA 03 - Test 3",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "QUIZ AWS SA 03 - Test 4",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "QUIZ AWS SA 03 - Test 5",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "QUIZ AWS SA 03 - Test 6",
        display_order: 6,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
  {
    name: "QUIZ AWS PRO",
    display_order: 41,
    lectures: [
      {
        title: "Diagnostic",
        display_order: 1,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "PRO 01",
        display_order: 2,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "PRO 02",
        display_order: 3,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "PRO 03",
        display_order: 4,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
      {
        title: "PRO 04",
        display_order: 5,
        video_id: "",
        video_duration: 0,
        server_id: 0,
      },
    ],
  },
];

function getAllPosts() {
  // https://techmaster.vn/api/class/iraLPS6c/outline
  // $.ajax({
  //   // url: "https://techmaster.vn/api/class/iraLPS6c/outline",
  //   url: dataAws,
  //   method: "GET",
  //   success: (result) => {
  //     console.log(result)
  //     if (result.length > 0) {
  //       let content = "";
  //       $.each(result, function (index, post) {
  //         let courselist = "";
  //         if(post.lectures != null){
  //           for(let i = 0; i<post.lectures.length; i++) {
  //             courselist +=
  //             `
  //             <li>
  //               ${post.lectures[i].title}
  //             </li>
  //             `
  //           }
  //         }
  //         // console.log("courselist: ", courselist);

  //         content += `
  //                       <div class="course_content">
  //                         <div class="triangle">
  //                         </div>
  //                         <div class="track_container">
  //                           <div class="track_content">
  //                             <div class="title">
  //                               <span>Buổi ${post.display_order}: ${post.name}</span>
  //                               <span class="toggle_btn">
  //                                 <img src="img/down-arrow.svg">
  //                               </span>
  //                             </div>
  //                             <div class="list course_info" style="display:none">
  //                             <ul>
  //                             ${courselist}
  //                             </ul>
  //                           </div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                   `;
  //       });

  //       $(".course_content_container").html(content);
  //       let track_content = document.querySelectorAll(".track_content");

  //       track_content.forEach(function(btn){
  //           btn.addEventListener('click', function() {
  //               let course_info = this.querySelector(".course_info");
  //               if(course_info.style.display == "block"){
  //                   course_info.style.display = "none";
  //                   this.querySelector("toggle_btn").src = "img/down-arrow.svg"

  //               }
  //               else if(course_info.style.display == "none"){
  //                   course_info.style.display = "block";
  //                   console.log(this.src);
  //                   this.querySelector("toggle_btn").src = "img/up-arrow.svg"

  //               }
  //           })
  //       })

  //       // $(".blog-slider").slick({
  //       //   arrows: false,
  //       //   centerMode: true,
  //       //   centerPadding: "15px",
  //       //   infinite: false,
  //       //   initialSlide: 1,
  //       //   mobileFirst: true,
  //       //   focusOnSelect: true,
  //       //   responsive: [
  //       //     { breakpoint: 768, settings: { centerPadding: "90px" } },
  //       //     {
  //       //       breakpoint: 992,
  //       //       settings: { centerPadding: "0px", slidesToShow: 3 },
  //       //     },
  //       //   ],
  //       // });
  //     }
  //   },
  //   error: (e) => {
  //     console.error(e.message);
  //   },
  // });
  const result = dataAws;

  if (result.length > 0) {
    let content = "";
    $.each(result, function (index, post) {
      let courselist = "";
      if (post.lectures != null) {
        for (let i = 0; i < post.lectures.length; i++) {
          courselist += `
          <li>
            ${post.lectures[i].title}
          </li>
          `;
        }
      }
      // console.log("courselist: ", courselist);
      // <span>Buổi ${post.display_order}: ${post.name}</span>

      content += `
                    <div class="course_content">
                      <div class="triangle">
                      </div>
                      <div class="track_container">
                        <div class="track_content">
                          <div class="title">
                            <span>Buổi ${index + 1}: ${post.name}</span>
                            <span class="toggle_btn">
                              <img src="img/down-arrow.svg">
                            </span>
                          </div>
                          <div class="list course_info" style="display:none">
                          <ul>
                          ${courselist}
                          </ul>
                        </div>
                        </div>
                      </div>
                    </div>
                `;
    });

    $(".course_content_container").html(content);
    let track_content = document.querySelectorAll(".track_content");

    track_content.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let course_info = this.querySelector(".course_info");
        if (course_info.style.display == "block") {
          course_info.style.display = "none";
          this.querySelector("toggle_btn").src = "img/down-arrow.svg";
        } else if (course_info.style.display == "none") {
          course_info.style.display = "block";
          console.log(this.src);
          this.querySelector("toggle_btn").src = "img/up-arrow.svg";
        }
      });
    });

    // $(".blog-slider").slick({
    //   arrows: false,
    //   centerMode: true,
    //   centerPadding: "15px",
    //   infinite: false,
    //   initialSlide: 1,
    //   mobileFirst: true,
    //   focusOnSelect: true,
    //   responsive: [
    //     { breakpoint: 768, settings: { centerPadding: "90px" } },
    //     {
    //       breakpoint: 992,
    //       settings: { centerPadding: "0px", slidesToShow: 3 },
    //     },
    //   ],
    // });
  }
}

getAllPosts();
function hideToast() {
  $(".btn-close-toast").on("click", function () {
    $("#liveToast").css("display", "none");
  });
}
hideToast();
function showToast() {
  $(".toast-container").css("right", "0").css("transition", "1s ease");
}
showToast();
function showQuestion() {
  $(".question_item").on("click", function (e) {
    $(e.target.closest(".question_item")).find(".answer").fadeToggle();
  });
}
showQuestion();
