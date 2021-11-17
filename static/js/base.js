window.onscroll = function() {stickyNavbar()};

let navbar = document.getElementById("navbar");
let navbarBrand = document.getElementById("navbar-brand");
let navbarSearch = document.getElementById("navbar-search");
let navbarMenu = document.getElementById("navbar-menu");
let navbarIcons = document.getElementById("navbar-icons");
let navbarMobile = document.getElementById("navbar-mobile");
let sticky = navbar.offsetHeight;

let mainPosts = document.querySelectorAll(".main-post");
let posts = document.querySelectorAll(".post");

let i = 0;
let postIndex = 0;
let currentPost = posts[postIndex];
let currentMainPost = mainPosts[postIndex];

let progressInterval = setInterval(progress, 100); // 180

/* Enable/Disable dropdown menu for navbar login */
document.getElementById("navbar-login-text").onclick = function() {loginFunction()};

/* The following Javascript was originally written by W3Schools (https://www.w3schools.com/howto/howto_js_navbar_sticky.asp)
   and repurposed to aid in the function of the sticky menu */
function stickyNavbar() {
    
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-navbar");
        navbarBrand.classList.add("sticky-navbar-brand");
        navbarSearch.classList.add("sticky-navbar-search");
        navbarMenu.classList.add("sticky-navbar-menu");
        navbarIcons.classList.add("sticky-navbar-icons");
        navbarMobile.classList.add("sticky-navbar-mobile");
    } else {
        navbar.classList.remove("sticky-navbar");
        navbarBrand.classList.remove("sticky-navbar-brand");
        navbarSearch.classList.remove("sticky-navbar-search");
        navbarMenu.classList.remove("sticky-navbar-menu");
        navbarIcons.classList.remove("sticky-navbar-icons");
        navbarMobile.classList.remove("sticky-navbar-mobile");
    }
}

/* This function was originally written by W3Schools (https://www.w3schools.com/howto/howto_js_mobile_navbar.asp) and
   repurposed to aid in the function of the mobile menu */
function mobileMenu() {
    if (navbarMobile.style.display === "none") {
        navbarMobile.style.display = "grid";
    } else {
        navbarMobile.style.display = "none";
    }
}

/* The following Carousel code was originally written by Juan Codepen.io (https://codepen.io/J0hn03cb1ac8a4/pen/MWYeQqp)
   and repurposed to aid in the function of the carousel */

function progress() {
  if (i === 100) {
    i = -5;
    // reset progress bar
    currentPost.querySelector(".progress-bar__fill").style.width = 0;
    document.querySelector(
      ".progress-bar--primary .progress-bar__fill"
    ).style.width = 0;
    currentPost.classList.remove("post--active");

    postIndex++;

    currentMainPost.classList.add("main-post--not-active");
    currentMainPost.classList.remove("main-post--active");

    // reset postIndex to loop over the slides again
    if (postIndex === posts.length) {
      postIndex = 0;
    }

    currentPost = posts[postIndex];
    currentMainPost = mainPosts[postIndex];
  } else {
    i++;
    currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
    document.querySelector(
      ".progress-bar--primary .progress-bar__fill"
    ).style.width = `${i}%`;
    currentPost.classList.add("post--active");

    currentMainPost.classList.add("main-post--active");
    currentMainPost.classList.remove("main-post--not-active");
  }
}

/* Click function for the login dropdown menu */
function loginFunction() {
  document.getElementById("navbar-login-dropdown").classList.toggle("show-dropdown");
}
