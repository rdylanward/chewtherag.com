$(document).ready(function() {

    /* Toggle mobile menu */
    function toggleMobileMenu() {
        var winWidth = $(window).innerWidth();

        if (winWidth > 1023) {
            $(".container-mobile").addClass("hide-menu");
            $(".container-navbar").removeClass("hide-menu");
        } else if (winWidth < 1024) {
            $(".container-mobile").removeClass("hide-menu");
            $(".container-navbar").addClass("hide-menu");
        };
    };

    /* Toggle sticky menu */
    function toggleStickyMenu() {
        var sticky = 120;
        var mobile_sticky = 80;
        var winWidth = $(window).innerWidth();

        if (winWidth < 1024 && $(window).scrollTop() > mobile_sticky) {
            $(".container-mobile").addClass("sticky-container-mobile");
        } else if (winWidth < 1024 && $(window).scrollTop() <= mobile_sticky) {
            $(".container-mobile").removeClass("sticky-container-mobile");
        } else if (winWidth > 1023 && $(window).scrollTop() > sticky) {
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

    /* Enable dropdown menu
    function hoverDropdown(event) {
        var dropdown_pos = $(event.data.specifiedElementOne).position();
        var dropdown_height = $(event.data.specifiedElementOne).outerHeight(true);
        var dropdown_left = dropdown_pos.left;
        var dropdown_top = dropdown_pos.top + dropdown_height;

        if (event.data.isEnabled === "True" && $(event.data.specifiedElementTwo + ".hide-menu")) { */
            /* Enable dropdown menu
            $(event.data.specifiedElementTwo).css("left", dropdown_left);
            $(event.data.specifiedElementTwo).css("top", (dropdown_top - 2));
            $(event.data.specifiedElementTwo).css("display", "block");
        } else if (!$(event.data.specifiedElementTwo + ".hide-menu")) {
            $(event.data.specifiedElementTwo).css("display", "block");
        } else {
            $(event.data.specifiedElementTwo).css("display", "none");
        };
    }; */

    /* Hide/Show dropdown on click */
    function toggleDropdown(event) {
        console.log($(this).attr('class').split(' '));

        if (!($(this).attr('class').split(' ')[1])) {
            var thisElement = ".".concat($(this).attr('class').split(' ')[0]);
        } else {
            var thisElement = ".".concat($(this).attr('class').split(' ')[1]);
        };
        var element_pos = $(thisElement).position();
        var element_height = $(thisElement).outerHeight(true);
        var element_width = $(thisElement).outerWidth(true);
        var element_top = element_pos.top;
        var element_left = element_pos.left;
        var element_right = element_left + element_width;
        var element_bottom = element_top + element_height;

        if (!(event.pageY >= element_bottom && element_left < event.pageX < element_right)) {
            if ($(event.data.menuElement + ".hide-menu")) {
                $(event.data.menuElement).css("left", element_left);
                $(event.data.menuElement).css("top", element_bottom);
                $(event.data.menuElement).css("width", element_width);
            };
            $(event.data.menuElement).toggleClass('hide-menu');
        } else if (!($(this).attr('class').split(' ')[1])) {
            $(event.data.menuElement).toggleClass('hide-menu');
        };
    };

    /* Enable/Disable mobile menu on resize */
    $(window).resize(toggleMobileMenu);

    /* Check mobile menu on page refresh */
    $(document).on('readystatechange', toggleMobileMenu);

    /* Toggle sticky menu on window scroll */
    $(window).scroll(toggleStickyMenu);

    /* Check sticky menu on page refresh */
    $(document).on('readystatechange', toggleStickyMenu);

    /* Sliding Navbar/Hamburger action */
    $(".hamburger-menu").click(function() {
        $(".sliding-navbar").toggleClass('sliding-navbar--open');
        $(".hamburger").toggleClass('menu-opened');
    });

    /* Hide/Show login dropdown */
    $(".sliding-login-register").click({
        specifiedElement: ".sliding-login-dropdown"
    }, toggleDropdown);

    /* Hide/Show login dropdown */
    $(".navbar-dropdown").click({
        menuElement: ".navbar-login-dropdown"
    }, toggleDropdown);
    
    $(".navbar-dropdown").mouseenter({
        menuElement: ".navbar-login-dropdown"
    }, toggleDropdown).mouseleave({
        menuElement: ".navbar-login-dropdown"
    }, toggleDropdown);

    $(".navbar-login-dropdown").mouseleave({
        menuElement: ".navbar-login-dropdown"
    }, toggleDropdown);

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
