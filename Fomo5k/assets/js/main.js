$(document).ready(function() {
    $('.sliderGame').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: true,
        infinite: true,
        responsive: [{
                breakpoint: 769,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            }
        ]
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 150) {
            $("#back_to_top").fadeIn();
        } else {
            $("#back_to_top").fadeOut();
        }
    });

    $("#back_to_top").click(function() {
        event.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('#menuToggle .navbar-toggle').click(function() {
        $('#menuToggle').toggleClass('open');
    })
    $('#menuToggle .rank-button').click(function() {
        $('.aside-left').toggleClass('open');
    })

    $('.dropdown').click(function(e) {
        if ($(this).find('.dropdown-menu').hasClass('open')) {
            $(this).find('.dropdown-menu').removeClass('open');
        } else {
            $('.dropdown-menu').removeClass('open');
            $(this).find('.dropdown-menu').addClass('open');

        }
    });
    $(document).click(function(e) {
        if (!$('.dropdown').is(e.target) && $('.dropdown').has(e.target).length === 0) {
            var dropdowns = $('.dropdown .dropdown-menu');
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i].classList.contains('open');
                if (openDropdown) {
                    dropdowns.removeClass('open');
                }
            }
        }
    });

    $('.slick-slider .slide-item.comingsoon a').click(function(e) {
        e.preventDefault();
        var comingsoonText = $(this).closest('.slick-slider').data('comingsoon-text');
        $(this).append('<div class="tool-tip">' + comingsoonText + '</div>');
        setTimeout(function() {
            $('.slick-slide .tool-tip').remove();
        }, 2000)
    });

    $('.menu .comingsoon a').click(function(e) {
        e.preventDefault();
        var comingsoonText = $(this).closest('.menu').data('comingsoon-text');
        $(this).append('<div class="tool-tip">' + comingsoonText + '</div>');
        setTimeout(function() {
            $('.menu .tool-tip').remove();
        }, 2000)
    });

    function activeTab(obj) {
        $('.nav-pills li').removeClass('active');
        $(obj).addClass('active');
        var id = $(obj).find('a').attr('href');
        $('.tab-panel').hide().removeClass('show');;
        $(id).addClass('show');
        $(id).show();

    }
    $('.nav-pills li').click(function() {
        activeTab(this);
        return false;
    });
    activeTab($('.nav-pills li:first-child'));

    $('.boxed .button-open').click(function(e) {
        e.preventDefault();
        var _el = $(this).attr('href');
        $('.block-toggle:not(' + _el + ')').slideUp(300);
        setTimeout(function() {
            $(_el).slideToggle(300);
        }, 300)
    });
    $('.boxed .button-close').click(function(e) {
        e.preventDefault();
        $(this).parents('.block-toggle').slideUp(300);
    });


    $(document).on('focusout', '.help', function(e) {
        e.preventDefault();
        $(this).removeClass('open');
    });



    function formatCurrency(number) {
        return Number(number).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    $(document).on('change', '.input-currency', function() {
        var text = $(this).val();
        $(this).val(formatCurrency(text));
    })

    function forceNumeric() {
        var $input = $(this);
        $input.val($input.val().replace(/[^\d]+/g, ''));
    }
    $('body').on('propertychange input', '.input-currency', forceNumeric);

    $('.roll-button').click(function(e) {
        $('#roll-wrapper').toggleClass('rolling');
    })

    $('.card-header .card-title').on('click', function() {
        $(this).toggleClass('active');
    })

    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 2);
    $("#countdown").countdown(myDate, function(event) {
        $(this).html(
            event.strftime(
                '<div class="countdown__item"><div class="countdown__timer">%D</div><span class="countdown__label">days</span></div><div class="countdown__item"><div class="countdown__timer">%H</div><span class="countdown__label">hrs</span></div><div class="countdown__item"><div class="countdown__timer">%M</div><span class="countdown__label">mins</span></div><div class="countdown__item"><div class="countdown__timer">%S</div><span class="countdown__label">sec</span></div>'
            )
        );
    });

});