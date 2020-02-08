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
        if ($(window).scrollTop() >= 200) {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }
    });

    $('#menuToggle .navbar-toggle').click(function() {
        $('#menuToggle').toggleClass('open');
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


    function fixHeightSidebar() {
        var heightHeader = $('header').outerHeight();
        $('.aside-left').css('top', heightHeader);
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

    $('.button__multi-copy').click(function(e) {
        toastr.options = {
            "positionClass": "toast-bottom-right",
            "timeOut": 3000,
            "closeButton": true
        }
        var text = $(this).closest('.box__item').find('.copy-text').attr('data-copy');
        var el = $(this);
        copyToClipboard(text, el);
        toastr.info('Copy link to clipboard')
    })

    // Iterate over each select element
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"><span class="fas fa-chevron-down"></span></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.append($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    $('.nav-pills .nav-item').click(function() {
        if ($('.ast-tabs').find('.bonus.active').length > 0) {
            $("#box-item-select .deposit").hide();
            $("#box-item-select .withdraw").show();
        } else {
            $("#box-item-select .withdraw").hide();
            $("#box-item-select .deposit").show();
        }
    })

    if($('.pie-chart').length > 0) {

        var chart;

        var chartData1 = [
            {"key":"SELL","value":"63.6","pulled":false},
            {"key":"BUY","value":"36.4","pulled":false}
        ];
        var chartData2 = [
            {"key":"SELL","value":"36.4","pulled":false},
            {"key":"BUY","value":"63.6","pulled":false}
        ];

        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData1;
        chart.titleField = "key";
        chart.valueField = "value";
        chart.pulledField = "pulled";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 0;
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        // this makes the chart 3D
        chart.depth3D = 20;
        chart.angle = 30;
        chart.colors = ["#ED1C24","#09ab68"];
        chart.color = '#c1cbe2';
        chart.labelTickColor = '#FFFFFF';

        chart.write("chartdiv-1");

        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData2;
        chart.titleField = "key";
        chart.valueField = "value";
        chart.pulledField = "pulled";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 0;
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        // this makes the chart 3D
        chart.depth3D = 20;
        chart.angle = 30;
        chart.colors = ["#ED1C24","#09ab68"];
        chart.color = '#c1cbe2';
        chart.labelTickColor = '#FFFFFF';

        chart.write("chartdiv-2");
    }

});