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

    $('.nav-pills .nav-item').click(function() {
        if ($('.ast-tabs').find('.withdraw.active').length > 0) {
            $("#box-item-select .deposit").hide();
            $("#box-item-select .withdraw").show();
        } else {
            $("#box-item-select .withdraw").hide();
            $("#box-item-select .deposit").show();
        }
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

    $('.dropbtn').click(function(){
        $(this).toggleClass('active');
        $(this).next().toggle();
    })

    // if($('.pie-chart').length > 0) {

    //     var chart;

    //     var chartData1 = [
    //         {"key":"SELL","value":"63.6","pulled":false},
    //         {"key":"BUY","value":"36.4","pulled":false}
    //     ];
    //     var chartData2 = [
    //         {"key":"SELL","value":"36.4","pulled":false},
    //         {"key":"BUY","value":"63.6","pulled":false}
    //     ];

    //     chart = new AmCharts.AmPieChart();
    //     chart.dataProvider = chartData1;
    //     chart.titleField = "key";
    //     chart.valueField = "value";
    //     chart.pulledField = "pulled";
    //     chart.outlineColor = "#FFFFFF";
    //     chart.outlineAlpha = 0.8;
    //     chart.outlineThickness = 0;
    //     chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    //     // this makes the chart 3D
    //     chart.depth3D = 20;
    //     chart.angle = 30;
    //     chart.colors = ["#ED1C24","#09ab68"];
    //     chart.color = '#c1cbe2';
    //     chart.labelTickColor = '#FFFFFF';

    //     chart.write("chartdiv-1");

    //     chart = new AmCharts.AmPieChart();
    //     chart.dataProvider = chartData2;
    //     chart.titleField = "key";
    //     chart.valueField = "value";
    //     chart.pulledField = "pulled";
    //     chart.outlineColor = "#FFFFFF";
    //     chart.outlineAlpha = 0.8;
    //     chart.outlineThickness = 0;
    //     chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    //     // this makes the chart 3D
    //     chart.depth3D = 20;
    //     chart.angle = 30;
    //     chart.colors = ["#ED1C24","#09ab68"];
    //     chart.color = '#c1cbe2';
    //     chart.labelTickColor = '#FFFFFF';

    //     chart.write("chartdiv-2");
    // }

    // am4core.ready(function() {

    //     var chart1 = am4core.create("chartdiv-1", am4charts.PieChart3D);
    //     var chart2 = am4core.create("chartdiv-2", am4charts.PieChart3D);
    //     chart1.hiddenState.properties.opacity = 0; // this creates initial fade-in
    //     chart2.hiddenState.properties.opacity = 0; // this creates initial fade-in

    //     chart1.data = [
    //         {
    //             country: "Buy",
    //             litres: 60.34,
    //             color: am4core.color("#09ab68")
    //         },
    //         {
    //             country: "Sell",
    //             litres: 39.66,
    //             color: am4core.color("#ea2851")
    //         }
    //     ];

    //     chart2.data = [
    //         {
    //             country: "Buy",
    //             litres: 39.66,
    //             color: am4core.color("#09ab68")
    //         },
    //         {
    //             country: "Sell",
    //             litres: 60.34,
    //             color: am4core.color("#ea2851")
    //         }
    //     ];

    //     var series1 = chart1.series.push(new am4charts.PieSeries3D());
    //     var series2 = chart2.series.push(new am4charts.PieSeries3D());
    //     series1.dataFields.value = "litres";
    //     series1.dataFields.category = "country";
    //     series1.labels.template.disabled = false;
    //     series1.labels.template.fill = am4core.color("white");
    //     series1.ticks.template.disabled = true;
    //     series1.alignLabels = false;
    //     series1.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    //     series1.labels.template.radius = am4core.percent(-50);
    //     series1.slices.template.propertyFields.fill = "color";

    //     series2.dataFields.value = "litres";
    //     series2.dataFields.category = "country";
    //     series2.labels.template.disabled = false;
    //     series2.labels.template.fill = am4core.color("white");
    //     series2.ticks.template.disabled = true;
    //     series2.alignLabels = false;
    //     series2.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    //     series2.labels.template.radius = am4core.percent(-50);
    //     series2.slices.template.propertyFields.fill = "color";

    //     //end piechart

    //     var chart = am4core.create("candlestick-chart-1", am4charts.XYChart);
    //     chart.paddingRight = 20;

    //     var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //     dateAxis.renderer.grid.template.location = 0;

    //     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //     valueAxis.tooltip.disabled = true;

    //     var series = chart.series.push(new am4charts.CandlestickSeries());
    //     series.dataFields.dateX = "date";
    //     series.dataFields.valueY = "close";
    //     series.dataFields.openValueY = "open";
    //     series.dataFields.lowValueY = "low";
    //     series.dataFields.highValueY = "high";
    //     series.simplifiedProcessing = true;
    //     series.dropFromOpenState.properties.fill = am4core.color("#ea2851");
    //     series.dropFromOpenState.properties.stroke = am4core.color("#ff7f9a");
    //     series.riseFromOpenState.properties.fill = am4core.color("#09ab68");
    //     series.riseFromOpenState.properties.stroke = am4core.color("#01ff96");
    //     series.strokeWidth  = 2;
    //     dateAxis.renderer.labels.template.fill = 0;
    //     dateAxis.renderer.grid.template.stroke = 0;
    //     valueAxis.renderer.grid.template.stroke = am4core.color("#007fc8");
    //     valueAxis.renderer.grid.template.strokeWidth = 2;
    //     valueAxis.renderer.labels.template.fill = am4core.color("white");
    //     series.tooltipText = "{openValueY.value} - {lowValueY.value}, {highValueY.value} - {valueY.value}";

    //     chart.cursor = new am4charts.XYCursor();

    //     chart.data = [ {
    //         "date": "2011-08-01",
    //         "open": "9.461",
    //         "high": "9.863",
    //         "low": "9.328",
    //         "close": "9.75"
    //     }, {
    //         "date": "2011-08-02",
    //         "open": "9.110",
    //         "high": "8.163",
    //         "low": "8.228",
    //         "close": "8.815"
    //     }, {
    //         "date": "2011-08-03",
    //         "open": "7.461",
    //         "high": "7.663",
    //         "low": "7.528",
    //         "close": "7.15"
    //     }, {
    //         "date": "2011-08-04",
    //         "open": "8.461",
    //         "high": "8.863",
    //         "low": "8.328",
    //         "close": "8.75"
    //     }, {
    //         "date": "2011-08-05",
    //         "open": "8.101",
    //         "high": "8.432",
    //         "low": "8.222",
    //         "close": "8.144"
    //     }, {
    //         "date": "2011-08-06",
    //         "open": "9.261",
    //         "high": "9.563",
    //         "low": "9.328",
    //         "close": "9.115"
    //     }, {
    //         "date": "2011-08-07",
    //         "open": "9.461",
    //         "high": "9.863",
    //         "low": "9.328",
    //         "close": "9.75"
    //     }, {
    //         "date": "2011-08-08",
    //         "open": "8.461",
    //         "high": "8.863",
    //         "low": "8.328",
    //         "close": "8.175"
    //     }, {
    //         "date": "2011-08-09",
    //         "open": "8.361",
    //         "high": "8.263",
    //         "low": "8.528",
    //         "close": "8.054"
    //     }, {
    //         "date": "2011-08-10",
    //         "open": "7.961",
    //         "high": "7.263",
    //         "low": "7.328",
    //         "close": "7.380"
    //     }, {
    //         "date": "2011-08-11",
    //         "open": "8.461",
    //         "high": "8.863",
    //         "low": "8.328",
    //         "close": "8.75"
    //     }, {
    //         "date": "2011-08-12",
    //         "open": "8.361",
    //         "high": "8.663",
    //         "low": "8.128",
    //         "close": "8.55"
    //     }, {
    //         "date": "2011-08-13",
    //         "open": "7.461",
    //         "high": "7.863",
    //         "low": "7.328",
    //         "close": "7.75"
    //     }, {
    //         "date": "2011-08-14",
    //         "open": "8.161",
    //         "high": "8.563",
    //         "low": "8.328",
    //         "close": "8.175"
    //     }];
    // });

});