$(document).ready(function() {
    /* Initialise variables */
    let navbar_height = $(".container-navbar").height();
    let navbar_offset = $(".container-navbar").offset();
    let sticky = navbar_offset.top + navbar_height;

    /* Enable/Disable the sticky menu */
    $(window).scroll(function(){
        if ($(window).scrollTop() >= sticky) {
            $(".container-navbar").addClass("sticky-navbar");
            $(".navbar-brand").addClass("sticky-navbar-brand");
            $(".navbar-menu").addClass("sticky-navbar-menu");
            $(".navbar-search").addClass("sticky-navbar-search");
            $(".navbar-icons").addClass("sticky-navbar-icons");
            $(".navbar-mobile").addClass("sticky-navbar-mobile");
        } else {
            $(".container-navbar").removeClass("sticky-navbar");
            $(".navbar-brand").removeClass("sticky-navbar-brand");
            $(".navbar-menu").removeClass("sticky-navbar-menu");
            $(".navbar-search").removeClass("sticky-navbar-search");
            $(".navbar-icons").removeClass("sticky-navbar-icons");
            $(".navbar-mobile").removeClass("sticky-navbar-mobile");
        }
    })

    /* Enable/Disable the login dropdown menu */
    $(".navbar-login-text").mouseover(function(){
        let login_pos = $(".navbar-login-text").position();
        let login_height = $(".navbar-login-text").outerHeight(true)
        let login_left = login_pos.left;
        let login_top = login_pos.top + login_height;
    
        $(".navbar-login-dropdown").css("left", login_left);
        $(".navbar-login-dropdown").css("top", login_top);
        $(".navbar-login-dropdown").css("display", "block");
    }).mouseout(function(){        
        $(".navbar-login-dropdown").css("display", "none");    
    })

    /* Keep the login dropdown menu open while in focus*/
    $(".navbar-login-dropdown").mouseover(function(){
        $(".navbar-login-dropdown").css("display", "block");
    }).mouseout(function(){        
        $(".navbar-login-dropdown").css("display", "none");    
    })
});

/* This function was originally written by W3Schools (https://www.w3schools.com/howto/howto_js_mobile_navbar.asp) and
   repurposed to aid in the function of the mobile menu */
function mobileMenu() {
    if (navbarMobile.style.display === "none") {
        navbarMobile.style.display = "grid";
    } else {
        navbarMobile.style.display = "none";
    }
}
