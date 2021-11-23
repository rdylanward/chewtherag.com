window.onscroll = function() {stickyNavbar()};

let navbar = document.getElementById("navbar");
let navbarBrand = document.getElementById("navbar-brand");
let navbarSearch = document.getElementById("navbar-search");
let navbarMenu = document.getElementById("navbar-menu");
let navbarIcons = document.getElementById("navbar-icons");
let navbarMobile = document.getElementById("navbar-mobile");
let sticky = navbar.offsetHeight;

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

/* Enable/Disable dropdown menu for navbar login */
$(document).ready(function() {
    $('.navbar-login-text').mouseenter(function(){
        let height = $(".navbar-login-text").height();
        let offset = $(".navbar-login-text").offset();
        let left = offset.left;
        let top = (offset.top + height + 2);

        $(".navbar-login-dropdown").left(left);
        $(".navbar-login-dropdown").top(top);
        $(".navbar-login-dropdown").display("block");
    }).mouseleave(function(){        
        $(".navbar-login-dropdown").display("none");    
    })
});
