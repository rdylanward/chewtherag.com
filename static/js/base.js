window.onscroll = function() {stickyNavbar()};

let navbar = document.getElementById("navbar");
let navbarMobile = document.getElementById("navbar-mobile");
let sticky = navbar.offsetHeight;

/* The following Javascript was originally written by W3Schools (https://www.w3schools.com/howto/howto_js_navbar_sticky.asp)
    and repurposed to aid in the function of the sticky menu */
function stickyNavbar() {
    
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-navbar");
        navbarMobile.classList.add("sticky-navbar-mobile");
    } else {
        navbar.classList.remove("sticky-navbar");
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
