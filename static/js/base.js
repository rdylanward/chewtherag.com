$(document).ready(function() {

    /* Enabel/Disable mobile menu */
    $(window).resize(function () {
        var winWidth = $(window).innerWidth();

        console.log("winWidth: " + winWidth)

        if (winWidth > 1024) {
            $(".container-mobile").addClass("hide-menu");
            $(".container-navbar").removeClass("hide-menu");
        } else if (winWidth < 1024) {
            $(".container-mobile").removeClass("hide-menu");
            $(".container-navbar").addClass("hide-menu");
        };
    })

    /* Enabel/Disable sticky menu */
    function stickyMenu() {
        var sticky = 120;
        var mobile_sticky = 80;

        if ($(".container-navbar.hide-menu") && $(window).scrollTop() >= mobile_sticky) {
            $(".container-mobile").addClass("sticky-container-mobile");
        } else if ($(".container-navbar.hide-menu") && $(window).scrollTop() <= mobile_sticky) {
            $(".container-mobile").removeClass("sticky-container-mobile");
        } else if ($(".container-navbar.show-menu") && $(window).scrollTop() >= sticky) {
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
        };
    };

    /* On window scroll */
    $(window).scroll(stickyMenu);

    /* Check sticky menu on page refresh */
    $(document).on('readystatechange', stickyMenu);

    /* Sliding Navbar/Hamburger action */
    $(".hamburger-menu").click(function() {
        $(".sliding-navbar").toggleClass('sliding-navbar--open');
        $(".hamburger").toggleClass('menu-opened');
    })

    /* Hide/Show login dropdown */
    $(".sliding-login-register").click(function() {
        $(".sliding-login-dropdown").toggleClass('hide-menu');
    })

    /* Enable/Disable the login dropdown menu */
    $(".navbar-login-text").mouseover(function(){
        var login_pos = $(".navbar-login-text").position();
        var login_height = $(".navbar-login-text").outerHeight(true)
        var login_left = login_pos.left;
        var login_top = login_pos.top + login_height;
    
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
        var selector = $(this);
        var current_url = new URL(window.location);

        var selector_value = selector.val();
        if (selector_value != "reset") {
            var sort = selector_value.split("_")[0];
            var direction = selector_value.split("_")[1];

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
        var quantityValue = parseInt($(`#id_qty_${itemId}`).val());

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
    var allQtyInputs = $('.quantity-input');
    var itemId = $(allQtyInputs).data('item_id');
    changeInputStatus(itemId);

    /* Check enable/disable every time the input is changed */
    $('.quantity-input').change(function() {
        var itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Increment quantity */
    $('.quantity-input-increment').click(function(e) {
        e.preventDefault();
        var closestInput = $(this).closest('.detail-quantity').find('.quantity-input')[0];
        var quantityValue = parseInt($(closestInput).val());
        $(closestInput).val(quantityValue + 1);
        var itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Decrement quantity */
    $('.quantity-input-decrement').click(function(e) {
        e.preventDefault();
        var closestInput = $(this).closest('.detail-quantity').find('.quantity-input')[0];
        var quantityValue = parseInt($(closestInput).val());
        $(closestInput).val(quantityValue - 1);
        var itemId = $(this).data('item_id');
        changeInputStatus(itemId);
    })

    /* Auto-close toast */
    $(".toast-wrapper").ready(function() {
        $(".toast-wrapper").delay(2000).fadeOut("slow", "swing");

        /* Close the toast by clicking the button */
        $(".toast-close").click(function() {
            $(".toast-wrapper").fadeOut("slow");
        })
    })
});
