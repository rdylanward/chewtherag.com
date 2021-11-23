window.onscroll = function() {stickyNavbar()};

let navbar = document.getElementById("navbar");
let navbarBrand = document.getElementById("navbar-brand");
let navbarSearch = document.getElementById("navbar-search");
let navbarMenu = document.getElementById("navbar-menu");
let navbarIcons = document.getElementById("navbar-icons");
let navbarMobile = document.getElementById("navbar-mobile");
let sticky = navbar.offsetHeight;

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

/* Click function for the login dropdown menu */
function loginFunction() {
  document.getElementById("navbar-login-dropdown").classList.toggle("show-dropdown");
}
