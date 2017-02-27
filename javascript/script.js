;

var mobileState;

var parseIntNaN = function (x) {
    var y = parseInt(x);
    return y ? y : 0;
};

var all_nav_elements, all_nav_elements_widths, nav_elements, total, nav_elements_widths, more_nav_elements, combined_width, nav_more_width;
var fix_nav_links_overflow_init = function () {
    all_nav_elements = $('#slk-menu > div > ul > li');
    all_nav_elements_widths = _.map(all_nav_elements, function (x) { return $(x).width() });
    nav_elements = _.initial(all_nav_elements);
    total = nav_elements.length;
    nav_elements_widths = _.initial(all_nav_elements_widths);
    more_nav_elements = $('.slk-nav-more > ul > li');
    combined_width = _.reduce(nav_elements_widths, function (s, x) { return s + x });
    nav_more_width = _.last(all_nav_elements_widths);
    $('.slk-nav-more').removeClass('slk-nav-more-transparent visible-lg-block').addClass('hidden');
};
var fix_nav_links_overflow = function (x) {
    x = x || 0;
    var slkNavSearchWidth = parseIntNaN($('#slk-menu .slk-nav-search').width());
    slkNavSearchWidth = slkNavSearchWidth ? slkNavSearchWidth : 20;
    var navbar_max_width = $('nav .container').width() - $('.navbar-header').width() - slkNavSearchWidth - parseIntNaN($('#slk-menu .slk-lang').width()) - parseIntNaN($('#slk-menu .slk-reg').width()) - x - 60;
    //$('#slk-menu .navbar-nav').width(navbar_max_width);


    if (combined_width <= navbar_max_width) {
        $('.slk-nav-more').addClass('hidden');
        /*
        console.log('There seems to be enough room to hold all menu links');
        console.log('Max nav width is', navbar_max_width);
        console.log('Total nav elements width', combined_width);
        */
    }
    else {
        /*
        console.log('Not enough space to display all menu links...adding More menu link');
        console.log('Max nav width is', navbar_max_width);
        console.log('Total nav elements width', combined_width);
        */
        var width = nav_more_width;
        var n = 0;
        _.each(nav_elements_widths, function (x, i) {
            width = width + x;
            n = i;
            if (width > navbar_max_width)
                return false;
        });
        var current_width = _.reduce(_.first(nav_elements_widths, n), function (s, x) { return s + x }) + nav_more_width;
        //console.log('Made total nav elements with More width to be', current_width);
        _.each(_.first(nav_elements, n), function (element) {
            if (x < 0) {
                setTimeout(function () { $(element).removeClass('hidden-lg') }, 320);
            };
        });
        _.each(_.first(more_nav_elements, n), function (element) {
            $(element).addClass('hidden-lg');
        });
        var remaining = total - n;
        _.each(_.last(nav_elements, remaining), function (element) {
            $(element).addClass('hidden-lg');
        });
        _.each(_.last(more_nav_elements, remaining), function (element) {
            $(element).removeClass('hidden-lg');
        });
        $('.slk-nav-more').removeClass('hidden').addClass('visible-lg-block');
    };
    //$('#slk-menu .navbar-nav').removeClass('slk-nav-more-transparent');
};
var nav_links_overflow_init = false;
var nav_links_overflow_f = function (x) {
    if ($('#lg-check').is(':visible')) {
        if (!nav_links_overflow_init) {
            fix_nav_links_overflow_init();
            nav_links_overflow_init = true;
        }
        fix_nav_links_overflow(x);
    }
};

$(function () {

    // on IE on touch, the sequence is hoveron, hoveroff, click
    // on Chrome, is hoveron, click, hoveroff

    //$('nav .dropdown').doubleTapToGo();
    //$('nav .dropdown>a').click(function (e) {
    //    // on touch screen, hover fires right before click. we need to prevent that
    //    console.log('click');
    //    if ($(this).parent()[0].preventClick)
    //        e.preventDefault();
    //})

    $('nav .dropdown>a').bind('pointerdown', function (e) {
        console.log('touch');
        var that = this;
        if (!$(this).parent().hasClass('open')) {
            e.preventDefault();
            this.preventClick = true;
            setTimeout(function () {
                $(that).parent().addClass('open');
                $(that).parent().find('.slk-ddtoggle').addClass('glyphicon-minus').removeClass('glyphicon-plus');
                setTimeout(function () {
                    that.preventClick = false;
                }, 400);
            }, 100);
        }
        e.stopPropagation();
    }).click(function (e) {
        console.log('click');
        if (this.preventClick)
            e.preventDefault();
    });

    $('body').bind('pointerdown', function (e) {
        if (window.innerWidth <= 767)
            return;
        setTimeout(function () {
            $('.dropdown').removeClass('open');
        }, 400);
    });


    $('nav .dropdown').hover(function () {
        if ($(this).hasClass('loggedin-menu') || $(this).hasClass('slk-lang-dropdown')) {
            var dropdownMenu = $(this).children('ul.dropdown-menu');
            if (dropdownMenu.width() < $(this).width()) {
                dropdownMenu.width($(this).width());
            };
        };

        if ($(this).parents('nav:first').hasClass('offcanvas'))
            return;

        var that = this;
        setTimeout(function () {
            $(that).addClass('open');
        }, 100);
    }, function () {
        if ($(this).parents('nav:first').hasClass('offcanvas'))
            return;

        var that = this;
        setTimeout(function () {
            $(that).removeClass('open');
        }, 110);
    });
    
    var logoImg = new Image();
    logoImg.src = $('.slk-logo img').attr('src');
    var bodyLogoImg = $('<img>').attr('src', logoImg.src).attr('class', 'slk-fixed-nav-dummy-logo').css('opacity', '0');
    $('body').prepend(bodyLogoImg);
    var logoMaxHeight = 40;
    var socialEnabled = _.any($('.slk-nav-social-mobile'));
    var checkSocial = function () {
        var st = $(window).scrollTop();
        if (socialEnabled) {
            if (st + 300 > $(document).height() - window.innerHeight) {
                var navScope = angular.element('nav .container').scope();
                navScope.showSocial();
                $('body').addClass('slk-social-visible-bottom');
            };
        };
        var logoHeight = logoImg.height;
        if (logoHeight > logoMaxHeight) {
            if (st > logoMaxHeight) {
                $('.navbar-fixed-top .slk-logo img').css('height', logoMaxHeight);
                $('.navbar-fixed-top .slk-logo').css('height', logoMaxHeight + 10);
                $('.navbar-fixed-top').addClass('slk-nav-compact');
                $('.navbar-fixed-top').removeClass('slk-nav');
            }
            else {
                $('.navbar-fixed-top .slk-logo img').css('height', logoHeight);
                $('.navbar-fixed-top .slk-logo').css('height', logoHeight + 10);
                $('.navbar-fixed-top').removeClass('slk-nav-compact');
                $('.navbar-fixed-top').addClass('slk-nav');
            };
            //$('#slk-menu').css('margin-left', $('#slk-logo').width() + 20);
            setTimeout(nav_links_overflow_f, 120);
        };
    };
    setTimeout(checkSocial, 30);
    setTimeout(checkSocial, 200);
    $(window).scroll(checkSocial);
    $('.slk-nav-search-input').focus(function () { nav_links_overflow_f(100) }).blur(function () { nav_links_overflow_f(-100) });

    //$('nav .dropdown .dropdown').click(function () {
    //    $(this).toggleClass('open');
    //});
    //$('ul.dropdown-menu li').click(function (event) {
    //    if ($(this).hasClass('dropdown')) {
    //        event.preventDefault();
    //    };
    //    event.stopPropagation();
    //    $(this).parent().parent().addClass('open');

    //});

    $('.slk-ddtoggle').bind('pointerdown', function (event) {
        console.log('toggle menu');
        var dd = $(this).parents('.dropdown:first');
        dd.toggleClass('open');

        if (dd.hasClass('open')) {
            $(this).addClass('glyphicon-minus').removeClass('glyphicon-plus');
        } else {
            $(this).addClass('glyphicon-plus').removeClass('glyphicon-minus');
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }).click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    });

    $('.slk-logo').click(function (event) {
        //$('#slk-menu').toggleClass('slk-menu-visible');
        if (!$('#lg-check').is(':visible')) {
            $('body').toggleClass('slk-menu-visible');
            resetMenu();
            event.preventDefault();
            //closeParentMenu();

        };
    });
    //$('body').click(function(){
    //    //$('#slk-menu').removeClass('slk-menu-visible');
    //});
    nav_links_overflow_f();
    $(window).resize(function () {
        nav_links_overflow_f();
    });
    //$('#slk-menu .slk-nav-search-input').focus(nav_links_overflow_f, nav_links_overflow_f);
    angular.bootstrap($('nav'), ['slkNav']);


    $(window).resize(function () {
        if (window.innerWidth <= 767) {
            $('nav').addClass('offcanvas');
        } else {
            $('nav').removeClass('offcanvas');
        }
    }).resize();

});

angular.module('slkNav', []).
controller('NavCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.searchBarVisible = false;
    $scope.toggleSearchBar = function () {
        $scope.searchBarVisible = !$scope.searchBarVisible;
        //console.log('toggled!');
        var cpanelScope = angular.element('#slkCPanelApp').scope();
        $timeout(function () {
            //console.log('toggled about now!');
            cpanelScope.searchBarVisible = $scope.searchBarVisible;
            cpanelScope.$apply();
        });
    };
    $scope.showSocial = function () {
        $timeout(function () {
            $scope.socialVisible = true;
        });
    };
    $scope.submitOnEnter = function (event) {
        if (event.keyCode === 13) {
            $(_.find($('.slk-nav-submit-search-button'), function (x) { return $(x).is(':visible') })).click();
        };
    };
    $scope.slkNavSearchFocused = function () {
        $scope.slkNavSearchIsFocused = true;
    };

    $scope.slkNavSearchBlurred = function () {
        $scope.slkNavSearchIsFocused = false;
    };
}]);

function resetMenu() {
    $('#slk-menu .dropdown').removeClass('open');
    $('#slk-menu .dropdown>a>.glyphicon').addClass('glyphicon-plus').removeClass('glyphicon-minus');
}

$(document).ready(function () {

	var url = document.location.host;
	//var url = document.location.href.substr(0, (document.location.href.length-document.location.pathname.length)+1);
    $('nav .dropdown .dropdown-menu li>a').attr('href', function (i, href) {
        return href.replace("@@RootUrl@@", url);
        //return href.replace("http://@@RootUrl@@", url);
    });
	
	var tabName, parentTabName;
	$('.navbar-nav .dropdown ul.dropdown-menu li').on("click", function() {
	    tabName = $(this).find("a").text();
		parentTabName = $(this).parent().parent().find(".dropdown-toggle").text();
		$(".id-breadcrumb").empty();
	    $(".id-breadcrumb").append( "<p>SID / " +  parentTabName.toUpperCase() + " / " + tabName.toUpperCase() + "</p> <h1>" + tabName.toUpperCase() + "</h1>");
	});
	
	$('.livetabsdefault ul li a').on("click", function() {
	    tabName = $(this).text();
		parentTabName = document.location.pathname.substr(1, (document.location.pathname.replace('.aspx','').length-1));
		$(".id-breadcrumb").empty();
	    $(".id-breadcrumb").append( "<p>SID / " +  parentTabName.toUpperCase() + " / " + tabName.toUpperCase() + "</p> <h1>" + tabName.toUpperCase() + "</h1>");
	});
	
	var hash = document.location.hash.replace('#', '#lt-');
	$('.livetabsdefault ul li a').each(function() {
		if (this.href.indexOf(hash) != -1 && this.href.indexOf(hash) != 0) {
			$(this).trigger( "click" );
		}
	});
	
    var objRow = $('.publications-holder .row');
    objRow.find(".col-md-2").addClass("col-sm-3 col-xs-6");

    objRow = $('.footer-content .row');
    objRow.find(".col-md-3").addClass("col-sm-3 col-xs-6");

    objRow = $('.subsribe-content .row');
    objRow.find(".col-md-12").addClass("col-sm-12 col-xs-12");
	
$.getScript('/Portals/_default/Skins/SharpLook/templates/header/sharplook_SID/jquery.simplyscroll.min.js', function() {
	$(function() { //on DOM ready
		$(".ui-tabs .ui-tabs-nav").simplyScroll({
			auto: false,
			speed: 5
		});
		
		var tabsWidth = $('.simply-scroll-list').width();
		var containerWidth = $('.livetabsdefault').width();
		if(tabsWidth < containerWidth)
		{
			$('.simply-scroll-clip').css('width', '100%');
			$('.simply-scroll-clip').css('left', '0');
			$('.simply-scroll-btn').css('display', 'none');
			$('.simply-scroll-list').css('width', 'auto');
		}
	});
});

//$.getScript('http://code.jquery.com/ui/1.10.2/jquery-ui.js', function() {
//	setTimeout(function () {
//		$('.livetabsdefault ul li').each(function() {
//			//if ($(this).hasClass("ui-state-active")) {
//			if (this.tabIndex == 0) {
//				$(this).find("a").trigger( "click" );
//			}
//		});
//	}, 500);
//});
});