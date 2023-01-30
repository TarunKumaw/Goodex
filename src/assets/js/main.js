jQuery(function ($) {
    'use strict';
    $(function() {
        $(".datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            autoSize: true,
            dateFormat: "dd/mm/yy",
            defaultDate: new Date()
        });
    });

    $('.new_datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        todayHighlight: true,
        autoSize: true,
        dateFormat: "dd/mm/yy",
        defaultDate: new Date()
    });

    $(".main_popup_toggle").on("click", function(a) {
        a.preventDefault();
        $(".main_popup").toggleClass("is_visible");
    });

    $('.dropdown-toggle').on('click', function() {
        $( ".dropdown-menu" ).toggleClass("show");
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 120) {
            $('.header').addClass("fixed");
        } else {
            $('.header').removeClass("fixed");
        }
    });
    $("#Ourtestmonial").owlCarousel({
        autoplay: false,
        nav: true,
        smartSpeed: 500,
        dots: false,
        margin: 0,
        loop: false,
        responsiveClass: true,
        navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
        responsive: { 0: { items: 1 }, 575: { items: 1 }, 991: { items: 2 }, 992: { items: 3 } },
    });
    $("#about_us").owlCarousel({
        autoplay: false,
        nav: true,
        smartSpeed: 500,
        dots: false,
        margin: 0,
        loop: false,
        responsiveClass: true,
        navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
        responsive: { 0: { items: 1 }, 575: { items: 1 }, 991: { items: 2 }, 992: { items: 3 } },
    });
});