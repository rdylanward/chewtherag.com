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
            $(".navbar-message").addClass("sticky-navbar-message");
            $(".navbar-icons").addClass("sticky-navbar-icons");
            $(".navbar-mobile").addClass("sticky-navbar-mobile");
        } else {
            $(".container-navbar").removeClass("sticky-navbar");
            $(".navbar-brand").removeClass("sticky-navbar-brand");
            $(".navbar-menu").removeClass("sticky-navbar-menu");
            $(".navbar-message").removeClass("sticky-navbar-message");
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

    /* This code was provided by Code Institute from their 'Boutique Ado' 
       example project and repurposed for sorting items in the collection */
    $(".sort-dropdown").change(function() {
        let selector = $(this);
        let current_url = new URL(window.location);

        let selector_value = selector.val();
        if (selector_value != "reset") {
            let sort = selector_value.split("_")[0];
            let direction = selector_value.split("_")[1];

            current_url.searchParams.set("sort", sort);
            current_url.searchParams.set("direction", direction);

            window.location.replace(current_url);
        } else {
            current_url.searchParams.delete("sort");
            current_url.searchParams.delete("direction");

            window.location.replace(current_url);
        }
    })

    /* This code was provided by Code Institute from their 'Boutique Ado' 
       example project and repurposed for incrementing and decrementing
       the quantiy in the item detail */

    /* Disable +/- buttons outside 1-999 range */
    function changeInputStatus(itemId) {
        let quantityValue = parseInt($(`#id_qty_${itemId}`).val());

        if (quantityValue < 2) {
            $(".quantity-input-decrement").attr('disabled', true);
            $(".quantity-input-decrement i").addClass("disable");
        } else if (quantityValue > 999) {
            $(".quantity-input-increment").attr('disabled', true);
            $(".quantity-input-increment i").addClass("disable");
        } else {
            $(".quantity-input-decrement").attr('disabled', false);
            $(".quantity-input-decrement i").removeClass("disable");
            $(".quantity-input-increment").attr('disabled', false);
            $(".quantity-input-increment i").removeClass("disable");
        }
    }

    /* Ensure proper enabling/disabling of all inputs on page load */
    let allQtyInputs = $('.quantity-input');
    let itemId = $(allQtyInputs).data('item_id');
    changeInputStatus(itemId);

    /* Check enable/disable every time the input is changed */
    $('.quantity-input').change(function() {
        let itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Increment quantity */
    $('.quantity-input-increment').click(function(e) {
        e.preventDefault();
        let closestInput = $(this).closest('.detail-quantity').find('.quantity-input')[0];
        let quantityValue = parseInt($(closestInput).val());
        $(closestInput).val(quantityValue + 1);
        let itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Decrement quantity */
    $('.quantity-input-decrement').click(function(e) {
        e.preventDefault();
        let closestInput = $(this).closest('.detail-quantity').find('.quantity-input')[0];
        let quantityValue = parseInt($(closestInput).val());
        $(closestInput).val(quantityValue - 1);
        let itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Auto-close toast */
    $(".toast-wrapper").change(function() {
        $(".toast-wraper").delay(2500).fadeOut("slow");
    })

    /* Close the toast by clicking the button */
    $(".toast-close").click(function() {
        $(".toast-wrapper").fadeOut("slow");
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
