$(document).ready(function() {
    $('#sliderHome').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        infinite: true,
        responsive: [{
                breakpoint: 769,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '70px',
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                }
            }
        ]
    });

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

    $(document).on('click', '.help_icon', function(e) {
        e.preventDefault();
        $(this).parent('.help').toggleClass('open').trigger('focus');
    });
    $(document).on('click', '.help_popup', function(e) {
        $(this).parent('.help').trigger('focus');
    });
    $(document).on('focusout', '.help', function(e) {
        e.preventDefault();
        $(this).removeClass('open');
    });

    function fixHeightSidebar() {
        var heightHeader = $('header').outerHeight();
        $('.aside-left').css('top', heightHeader);
        $('.body-wrapper').css('margin-top', heightHeader);
    }

    fixHeightSidebar();
    $(window).resize(function() {
        fixHeightSidebar();
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

    var slider = $('#join-staking-range');
    var maxOutput = $('.range-slider .max-output');
    var minOutput = $('.range-slider .min-output');
    var maxVal = Number(slider.attr('max'));
    maxOutput.html(slider.val())
    slider.on('input', function() {
        maxOutput.html($(this).val());
        minOutput.html(maxVal - Number($(this).val()));
    })

    function copyToClipboard(text, el) {
        var copyTest = document.queryCommandSupported('copy');
        var elOriginalText = el.attr('data-original-title');

        if (copyTest === true) {
            var copyTextArea = document.createElement("textarea");
            copyTextArea.value = text;
            document.body.appendChild(copyTextArea);
            copyTextArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Copied!' : 'Whoops, not copied!';
                el.attr('data-original-title', msg).tooltip('show');
            } catch (err) {
                //console.log('Oops, unable to copy');
            }
            document.body.removeChild(copyTextArea);
            el.attr('data-original-title', elOriginalText);
        } else {
            // Fallback if browser doesn't support .execCommand('copy')
            window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
        }
    }

    //Config toast notification
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "timeOut": 3000,
        "closeButton": true
    }

    $('.copy-button').click(function(e) {
            var text = $(this).closest('.copy-container').find('.copy-text').attr('data-copy');
            var el = $(this);
            copyToClipboard(text, el);
            toastr.info('Copy link to clipboard')
    })

    $('.left-join-packages .nav-tabs a').click(function(e) {
        if (e.target.id == 'nav-user-tab') {
            $('.left-join-packages .user-box').addClass('active')
        } else {
            $('.left-join-packages .user-box').removeClass('active')
        }
    })

    //Demo countdown
    setTimeout(function(){
        $('.time-cutdown .countdown').html('<span class="countdown-complete"><i class="fa fa-check-circle"></i>Completed</span>');
        $('#nav-dividend .dabanking-btn').prop('disabled', 'disabled')
    }, 4000)

    setTimeout(function(){
        $('.staking-package').html('<button class="dabanking-btn staking-package-btn small-btn">Click to withdraw</button>')
    }, 4000)

    $(document).on('click', '.staking-package-btn', function(){
        $('#staking-package-modal').modal();
    });

    //Scroll to ID when click href
    $('.list-month a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        var headerHeight = $('#header').outerHeight();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - headerHeight,
        }, 500, 'linear')
    })

    $('.month-list li').on('click', function(e) {
        $('.month-list li').removeClass('active');
        $(this).addClass('active');
    })

    $('.list-month a').on('click', function(e) {
        $('.month-list li').removeClass('active');
        $('.month-list ' + $(this).attr('href')).addClass('active');
    })

});