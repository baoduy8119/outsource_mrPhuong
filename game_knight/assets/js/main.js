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

    var $boxBo = $('.game-bo .box-bo');

    function randomResultBo() {
        var resultBoGameArray = new Array('bull', 'bear');
        var result = resultBoGameArray[Math.floor(Math.random() * resultBoGameArray.length)];
        if (result == 'bear') {
            var srcFront = $('.result-content .flip-image-front img').attr("src"); 
            var srcBack = $('.result-content .flip-image-back img').attr("src"); 
            var pathFront = srcFront.substring(0,srcFront.lastIndexOf('/'));
            var pathBack = srcBack.substring(0,srcBack.lastIndexOf('/'));
            var new_sourceFront = pathFront+'/'+'bull.png';
            var new_sourceBack = pathBack+'/'+'bear.png';
            $('.result-content .flip-image-front img').attr('src', new_sourceFront);
            $('.result-content .flip-image-back img').attr('src', new_sourceBack);
        }
        if ($boxBo.data('win-choise') == result) {
            $boxBo.addClass('win');
        }
        return result;
    }

    $('.game-bo .info-total .button-roll').click(function(e) {
        $('.messages').html('<span class="pending">Pending...</span>');
        if($('.panel-item.active').length > 0) {
            setTimeout(function () {
                $('.messages').html('');
                var timeRoll = $boxBo.find('.result-panel').data('time-roll');
                $boxBo.addClass('active');
                setTimeout(function(){
                    $boxBo.addClass('finished');
                    $('.messages').html('<span>' + randomResultBo() + '</span> win!<p class="your-choise">You chose <span>' + $boxBo.data('win-choise') +'</span>.</p>')
                }, timeRoll)
            }, 1500)
        }
    })

    $('.box-bo .panel-item .image').click(function(e) {
        $('.box-bo .panel-item').removeClass('active');
        $(this).closest('.panel-item').addClass('active');
        $('.messages').html('You chose <span>' + $(this).parent().data('item') + '</span>');
        $boxBo.attr('data-win-choise', $(this).parent().data('item'))
    })

    //Game Knight

    var $knightItem = $('.hot-ice .panel-item');

    $knightItem.click(function(){
        $knightItem.removeClass('active');
        $(this).addClass('active');
    })

    $('.knight-bet-btn').click(function() {
        if($knightItem.hasClass('active')) {
            $('.hot-ice').addClass('start');
            $knightItem.removeClass('active');
            setTimeout(function(){
                $('.hot-ice').addClass('end').addClass(randomResultKnight()+'-win'); 
            }, 3000)
        }
    })

    function randomResultKnight() {
        var resultBoGameArray = new Array('hot', 'ice');
        var result = resultBoGameArray[Math.floor(Math.random() * resultBoGameArray.length)];
        return result;
    }
});