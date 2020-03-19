$(document).ready(function() {
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

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 88) {
            $('.header').addClass('sticky');
            $('body').addClass('banner-animation');
        } else {
            $('.header').removeClass('sticky');
            $('body').removeClass('banner-animation');
        }
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



    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#50FFFF"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00b8b6",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",

                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    var headerHeight = $('#header .header-inner').outerHeight();
    $('#header').css('height', headerHeight)

});