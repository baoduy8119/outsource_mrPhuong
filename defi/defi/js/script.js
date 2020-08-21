$(function() {
    var $navbar = $('#sidebarMenu');
    var $tradingView = $('#tv_chart_container');

    $(document).click(function(event) {
        var clickover = $(event.target);
        var _opened = $navbar.hasClass('show');
        if ((_opened == true && clickover.is('.overlay')) || clickover.is('#sidebarMenu .btn-close')) {
            $navbar.removeClass('show')
            $('body').removeClass('overlay');
        }
        if (!clickover.is('.dropbtn') && !clickover.is('.dropdown-content')) {
            $('.action').removeClass('active');
        }
    });

    $('.navbar-toggler').on('click', function() {
        $('body').toggleClass('overlay');
    })

/*    $navbar.find('.btn').click(function(){
        $navbar.toggleClass('show');
    })*/

    $('.dropbtn').click(function(e){
        if(!$(this).parent().hasClass('active')) {
            $('.action').removeClass('active');
            $(this).parent().addClass('active');
        } else {
            $('.action').removeClass('active');
        }
    })
    // Iterate over each select element
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"><i class="icon icon-dropdown"></i></div>');

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
            // e.stopPropagation();
            $styledSelect.text($(this).text()).append('<i class="icon icon-dropdown"></i>').removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    $(document).on('.skin-mode input', 'change',function() {
        if(!$('.skin-mode input').is(':checked')) {
            $('.skin-mode').addClass('light-mode')
        }
    });

    $(".meter > span").each(function() {
        $(this).data("origWidth", $(this).width()).width(0)
        .animate({
            width: $(this).data("origWidth")
        }, 1200);
    });

    $('.btn-history').click(function() {
        $('.defi-modal').addClass('open');
    });

    $('.defi-modal .btn-close').click(function() {
        $('.defi-modal').removeClass('open');
    });

    //Demo Modal Win & Lose
    $('.trade-btn .btn-order').click(function() {
        var resultArr = ['win', 'lose'];
        var result = resultArr[Math.floor(Math.random()*resultArr.length)];
        $('.trade-btn').addClass('processing');
        $('.btn-order small').html('waiting')
        setTimeout(function() {
            $('.btn-order small').html('order')
            $('.trade-btn').removeClass('processing');
            if(result == 'win') {
                $('#winModal').modal('show');
            } else {
                $('#loseModal').modal('show');
            }
        }, 3000)
    });

    var sideBar = $('.sidebar-sticky.navbar-collapse');
    if(sideBar.length > 0 ) {
        if($(window).width() >= 1280) {
            sideBar.customScrollbar();
        }
        $( window ).resize(function() {
            if($(window).width() >= 1280) {
                sideBar.customScrollbar();
            }
        });
    }

    var rankBuyArr = [
        { 'rank': '0.2', 'price': 200},
        { 'rank': '0.4', 'price': 400},
        { 'rank': '0.8', 'price': 800},
        { 'rank': '1', 'price': 1000},
        { 'rank': '1.1', 'price': 1100},
        { 'rank': '1.2', 'price': 1200},
        { 'rank': '1.3', 'price': 1300},
        { 'rank': '1.4', 'price': 1400},
        { 'rank': '1.5', 'price': 1500},
        { 'rank': '1.6', 'price': 1600},
        { 'rank': '1.7', 'price': 1700},
        { 'rank': '1.8', 'price': 1800},
        { 'rank': '1.9', 'price': 1900},
        { 'rank': '2', 'price': 2000},
        { 'rank': '2.1', 'price': 2100},
        { 'rank': '2.2', 'price': 2200},
        { 'rank': '2.3', 'price': 2300},
        { 'rank': '2.4', 'price': 2400},
        { 'rank': '2.5', 'price': 2500}
    ]
 
    $('#buyRankModal .select-options li').on('click', function (e) {
        var price = rankBuyArr.find(x => x.rank === $(this).attr('rel')).price;
        $('.input-price').val('$' + price)
    });

    //Notification
    // $('.toast').toast('show');

    //Config Tradingview
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function initDarkReady() {
        if(!$tradingView)
            return;
        var widget = new TradingView.widget({
            symbol: 'AAPL',
            interval: 'D',
            container_id: "tv_chart_container",
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
            library_path: "js/chart/",
            locale: getParameterByName('lang') || "en",
            autosize: true,
            disabled_features: ["widget_logo", "use_localstorage_for_settings", "left_toolbar", "header_fullscreen_button", "header_screenshot", "header_settings", "header_undo_redo", "header_compare", "header_resolutions", "header_indicators", "header_interval_dialog_button", "header_symbol_search", "timeframes_toolbar", "pricescale_currency",""],
            overrides: {
                "paneProperties.background": "#26193a",
                "paneProperties.vertGridProperties.color": "transparent",
                "paneProperties.horzGridProperties.color": "#2d1d44",
                "scalesProperties.textColor" : "#FFF",
                "mainSeriesProperties.candleStyle.upColor": "#12fff0",
                "mainSeriesProperties.candleStyle.downColor": "#ff4b4c",
                "paneProperties.crossHairProperties.width": 1,
                "scalesProperties.backgroundColor" : "#000000",
                "scalesProperties.fontSize": 12,
                "paneProperties.legendProperties.showSeriesOHLC": false,
                "paneProperties.legendProperties.showStudyTitles": false,
                "paneProperties.legendProperties.showStudyValues": false,
                "paneProperties.legendProperties.showSeriesTitle": false,
                "paneProperties.legendProperties.showSeriesOHLC": false,
                "paneProperties.legendProperties.showLegend": false,
                "paneProperties.bottomMargin": 40
            },
            studies_overrides: {
                "volume.volume.color.0": "#12fff0",
                "volume.volume.color.1": "#ff4b4c",
                "volume.volume.transparency": 100,
            },
            custom_css_url: 'custom-chart.css',
            loading_screen: { backgroundColor: "#26193a" },
        });
    };

    function initLightReady() {
        if(!$tradingView)
            return;
        var widget = new TradingView.widget({
            symbol: 'AAPL',
            interval: 'D',
            container_id: "tv_chart_container",
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
            library_path: "js/chart/",
            locale: getParameterByName('lang') || "en",
            autosize: true,
            disabled_features: ["widget_logo", "use_localstorage_for_settings", "left_toolbar", "header_fullscreen_button", "header_screenshot", "header_settings", "header_undo_redo", "header_compare", "header_resolutions", "header_indicators", "header_interval_dialog_button", "header_symbol_search", "timeframes_toolbar", "pricescale_currency"],
            overrides: {
                "paneProperties.background": "#f8f8f8",
                "paneProperties.vertGridProperties.color": "transparent",
                "paneProperties.horzGridProperties.color": "#e3e3e3",
                "scalesProperties.textColor" : "#505050",
                "mainSeriesProperties.candleStyle.upColor": "#00cb94",
                "mainSeriesProperties.candleStyle.downColor": "#eb4041",
                "paneProperties.crossHairProperties.width": 1,
                "scalesProperties.backgroundColor" : "#000000",
                "scalesProperties.fontSize": 12,
                "paneProperties.legendProperties.showSeriesOHLC": false,
                "paneProperties.legendProperties.showStudyTitles": false,
                "paneProperties.legendProperties.showStudyValues": false,
                "paneProperties.legendProperties.showSeriesTitle": false,
                "paneProperties.legendProperties.showSeriesOHLC": false,
                "paneProperties.legendProperties.showLegend": false,
                "paneProperties.bottomMargin": 40
            },
            studies_overrides: {
                "volume.volume.color.0": "#00cb94",
                "volume.volume.color.1": "#eb4041",
                "volume.volume.transparency": 100,
            },
            custom_css_url: 'custom-chart-light.css',
            loading_screen: { backgroundColor: "#f8f8f8" },
        });
    };

    if($tradingView.length > 0) {
        initDarkReady();
    }

    $('.skin-mode input').change(function(e){
        $('.skin-mode').toggleClass('light-mode');
        $('body').toggleClass('light-mode');

        if($('.skin-mode').hasClass('light-mode') && $tradingView.length > 0) {
            initLightReady();
        } else {
            initDarkReady();
        }
    })


});