$(function() {
    AOS.init();

    $('.dropdown .default-text').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $sessionLang = sessionStorage.getItem("language");
    
    if($sessionLang){
        $('.default-text .text').html(sessionStorage.getItem("language"));
    }

    $('#logo').click(function(){
        sessionStorage.removeItem('language');
    })

    $('.lang-en').click(function(){
        sessionStorage.removeItem('googtrans');
    })

    $('.dropdown .item').click(function(event) {
        sessionStorage.setItem("language", $(this).html());
        $(this).closest('.dropdown').toggleClass('open').find('.default-text .text').html(sessionStorage.getItem("language"));
    })

    $(document).on('click', 'a[href^="#"]', function(e) {
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        var pos = $id.offset().top;
        $('body, html').animate({ scrollTop: pos });

    });

    setTimeout(function(argument) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": "#ffffff"
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
                    "color": "#ffffff",
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
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });
    }, 1000);

    function startShine() {
	    var body = $('.starshine'),
	        template = $('.template.shine'),
	        stars = 6,
	        sparkle = 10;
	    var size = 'small';
	    var createStar = function() {
	        template.clone().removeAttr('id').css({
	            top: ((Math.random()>0.5 ? (Math.random() - 0.4) : Math.random()) * 100) + '%',
	            left: (Math.random() * 100) + '%',
	            webkitAnimationDelay: (Math.random() * sparkle) + 's',
	            mozAnimationDelay: (Math.random() * sparkle) + 's'
	        }).addClass(size).appendTo(body);
	    };

	    for (var i = 0; i < stars; i++) {
	        if (i % 2 === 0) {
	            size = 'small';
	        } else if (i % 3 === 0) {
	            size = 'medium';
	        } else {
	            size = 'large';
	        }

	        createStar();
	    }	
    }

    startShine();

    function triggerHtmlEvent(element, eventName) {
        var event;
        if (document.createEvent) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, true);
            element.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
            element.fireEvent('on' + event.eventType, event);
        }
    }

    $('.menu .lang-select').click(function() {
        var theLang = $(this).attr('data-lang');
        $('.goog-te-combo').val(theLang);

        window.location = $(this).attr('href');
        location.reload();

    });


    
});