/*! Menu SlideReveal - v1.1.2 - 2016-05-16
* https://github.com/nnattawat/slidereveal
* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
!function(a){var b=function(a,b){var c=a.css("padding-"+b);return c?+c.substring(0,c.length-2):0},c=function(a){var c=b(a,"left"),d=b(a,"right");return a.width()+c+d+"px"},d=function(b,c){var d={width:250,push:!0,position:"left",speed:300,trigger:void 0,autoEscape:!0,show:function(){},shown:function(){},hidden:function(){},hide:function(){},top:0,overlay:!1,zIndex:1049,overlayColor:"rgba(0,0,0,0.5)"};this.setting=a.extend(d,c),this.element=b,this.init()};a.extend(d.prototype,{init:function(){var b=this,d=this.setting,e=this.element,f="all ease "+d.speed+"ms";e.css({position:"fixed",width:d.width,transition:f,height:"100%",top:d.top}).css(d.position,"-"+c(e)),d.overlay&&(e.css("z-index",d.zIndex),b.overlayElement=a("<div class='slide-reveal-overlay'></div>").hide().css({position:"fixed",top:0,left:0,height:"100%",width:"100%","z-index":d.zIndex-1,"background-color":d.overlayColor}).click(function(){b.hide()}),a("body").prepend(b.overlayElement)),e.data("slide-reveal",!1),d.push&&a("body").css({position:"relative","overflow-x":"hidden",transition:f,left:"0px"}),d.trigger&&d.trigger.length>0&&d.trigger.on("click.slideReveal",function(){e.data("slide-reveal")?b.hide():b.show()}),d.autoEscape&&a(document).on("keydown.slideReveal",function(c){0===a("input:focus, textarea:focus").length&&27===c.keyCode&&e.data("slide-reveal")&&b.hide()})},show:function(b){var d=this.setting,e=this.element,f=this.overlayElement;(void 0===b||b)&&d.show(e),d.overlay&&f.show(),e.css(d.position,"0px"),d.push&&("left"===d.position?a("body").css("left",c(e)):a("body").css("left","-"+c(e))),e.data("slide-reveal",!0),(void 0===b||b)&&setTimeout(function(){d.shown(e)},d.speed)},hide:function(b){var d=this.setting,e=this.element,f=this.overlayElement;(void 0===b||b)&&d.hide(e),d.push&&a("body").css("left","0px"),e.css(d.position,"-"+c(e)),e.data("slide-reveal",!1),(void 0===b||b)&&setTimeout(function(){d.overlay&&f.hide(),d.hidden(e)},d.speed)},toggle:function(a){var b=this.element;b.data("slide-reveal")?this.hide(a):this.show(a)},remove:function(){this.element.removeData("slide-reveal-model"),this.setting.trigger&&this.setting.trigger.length>0&&this.setting.trigger.off(".slideReveal"),this.overlayElement&&this.overlayElement.length>0&&this.overlayElement.remove()}}),a.fn.slideReveal=function(b,c){return void 0!==b&&"string"==typeof b?this.each(function(){var d=a(this).data("slide-reveal-model");"show"===b?d.show(c):"hide"===b?d.hide(c):"toggle"===b&&d.toggle(c)}):this.each(function(){a(this).data("slide-reveal-model")&&a(this).data("slide-reveal-model").remove(),a(this).data("slide-reveal-model",new d(a(this),b))}),this}}(jQuery);

jQuery(document).ready(function($) {

    /* Menu Mobile */
    jQuery('.mobile-menu-nav').slideReveal({
        trigger: jQuery("#toggle-menu"),
        position: "right",
    });

    jQuery('.mobile-menu li.current-menu-ancestor').addClass('open').children('ul').show();
    jQuery('.mobile-menu li.menu-item-has-children > a').on('click', function(){
        jQuery(this).removeAttr('href');
        var element = jQuery(this).parent('li');

        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp(200);
        } else {
            element.addClass('open');
            element.children('ul').slideDown(200);
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });

    /* Modal */
    function toggleModalClasses(event) {
        var modalId = event.currentTarget.dataset.modalId;
        var modal = $(modalId);
        modal.toggleClass('is-active');
    }

    $('.open-modal').click(toggleModalClasses);
    $('.modal-close').click(toggleModalClasses);

    $('.open-contact').click(function (event) {
        var contactId = event.currentTarget.dataset.contactId;
        var contact = $(contactId);
        contact.toggleClass('is-active');
    });

    $('.header .search, .mobile-menu-nav .fa-search').on('click', function() {
		$('body').toggleClass('search-box-active');
	});

	$('.search-box .close').on('click', function() {
		$('body').toggleClass('search-box-active');
	});

    var SwiperWidgetHandler = function ($scope, $) {

        var zm_id = $scope.data('id');
        var zm_class = '.elementor-element-' + zm_id;
        
        var wrapper = $scope.find(".swiper-outer-wrapper");
        
        if (wrapper.length) {

            var settings = wrapper.data("settings");
            var slides_desktop = parseInt(settings["slides_desktop"]) || 4;
            var slides_tablet = parseInt(settings["slides_tablet"]) || 2;
            var slides_mobile = parseInt(settings["slides_mobile"]) || 1;
            var navigation = settings['navigation'];
            var autoplay = settings['autoplay'];
            var duration = settings['duration'];
            var speed = settings['speed'];
            var pause_on_hover = settings['pause_on_hover'];
            
            swiper_data = {
                speed: speed ,
                slidesPerView: slides_mobile,
                slidesPerGroup: slides_mobile,
                spaceBetween: 30,
                breakpoints: {
                    1024: {
                        spaceBetween: 30,
                        slidesPerView: slides_desktop,
                        slidesPerGroup: slides_desktop,
                    },
                    767: {
                        spaceBetween: 30,
                        slidesPerView: slides_tablet,
                        slidesPerGroup: slides_tablet,
                    }
                }
            };

            if (navigation == 'arrows') {
                swiper_data['navigation'] = {
                    nextEl: zm_class + ' .swiper-button-next',
                    prevEl: zm_class + ' .swiper-button-prev',
                }
            } else if (navigation == 'dots') {
                swiper_data['pagination'] = {
                    el: zm_class + ' .swiper-pagination',
                    clickable: true,
                }
            }

            if (navigation == 'scrollbar') {
                swiper_data['scrollbar'] = {
                    el: zm_class + ' .swiper-scrollbar',
                    hide: true,
                }
            }
        
            if (autoplay == true) {                
                swiper_data['autoplay'] = {
                    delay: duration,
                    disableOnInteraction: true,
                }
            }

            window.zm_swiper = new Swiper('.elementor-element-' + zm_id + ' .swiper-outer-wrapper .swiper-container', swiper_data);

            if ( pause_on_hover == true ) {
                jQuery( zm_class + ' .swiper-container').hover(function () {
                    zm_swiper.autoplay.stop();
                }, function () {
                    zm_swiper.autoplay.start();
                });
            }
        }
    };

    var SlidesHandler = function ($scope, $) {
        wrapper = $scope.find('.zm-swiper-outer-wrapper');
        wid     = $scope.data('id');
        wClass  = '.elementor-element-' + wid;

        let settings = wrapper.data('swiper-settings');
        var width = parseInt(settings["width"]) || 1262;
        var height = parseInt(settings["height"]) || 400;

        slidesResizer($scope, width, height);

        $(window).on('resize', function(){
            slidesResizer($scope, width, height);
        });

        sliderData = {
            direction: 'horizontal',
            effect: settings.effect,
            speed: settings.speed, 
            loop: "yes" === settings.loop ? true :  false,
        }

        if (settings.navigation == 'yes') {
            sliderData['navigation'] = {
                nextEl: wClass + ' .swiper-button-next',
                prevEl: wClass + ' .swiper-button-prev',
            }
        }
        if(settings.pagination !== '' ){
            sliderData['pagination'] = {
                type : settings.pagination,
                el: wClass + ' .swiper-pagination',
                clickable : settings.clickable,
            }
        }
        
        if(typeof settings.autoplay !== 'undefined' ){
            sliderData['autoplay'] = {
                delay: settings.autoplay.duration,
                disableOnInteraction: settings.autoplay.disableOnInteraction,
                reverseDirection: settings.autoplay.reverseDirection,
            } 
        }

        if ( 'undefined' === typeof Swiper ) {
            const asyncSwiper = elementorFrontend.utils.swiper;
            new asyncSwiper( '.elementor-element-' + wid + ' .zm-swiper-outer-wrapper .swiper-container', sliderData ).then( ( newSwiperInstance ) => {
            sswiper = newSwiperInstance;
            } );
        } else {
            window.sswiper = new Swiper('.elementor-element-' + wid + ' .zm-swiper-outer-wrapper .swiper-container', sliderData);
            $('.elementor-element-' + wid + ' .zm-swiper-outer-wrapper .swiper-container').css('visibility', 'visible');
        }

        if(typeof settings.autoplay !== 'undefined' ){
            let pause_on_hover = settings.autoplay.pauseOnHover;
            if (pause_on_hover == 'yes' ) {
                jQuery( wClass + ' .zm-swiper-container').hover(function () {
                    sswiper.autoplay.stop();
                }, function () {
                    sswiper.autoplay.start();
                });
            }
        }
    };

    function slidesResizer($element, width, height) {

        var slide = $element.find('.zm-swiper-slide');

        if(width > height) {
            ratio = width / height;

            slide.height($element.width() / ratio);
        } else {
            var ratio = height / width;

            slide.height($element.width() * ratio);
        }
    }

    var FacebookConnect = function($scope) {
        $.ajax({
            url: 'https://connect.facebook.net/pt_BR/sdk.js',
            dataType: 'script',
            cache: true,
            success: function success() {
                FB.init({
                    appId: '',
                    version: 'v2.10',
                    xfbml: false
                });

                $(document).trigger('fb:sdk:loaded');
            }
        });

        $(document).on('fb:sdk:loaded', function() {
            $scope.find('.elementor-widget-container div').attr('data-width', $scope.width() + 'px');
            FB.XFBML.parse($scope[0]);
        });
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-posts.default", SwiperWidgetHandler);
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-videos.default", SwiperWidgetHandler);
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-programs.default", SwiperWidgetHandler);
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-guestbook.default", SwiperWidgetHandler);
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-blog.default", SwiperWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/zm-slides.default', SlidesHandler);
        elementorFrontend.hooks.addAction("frontend/element_ready/zm-facebook.default", FacebookConnect);
    });
});

const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};path=/`
    }
}

const storageType = cookieStorage;
const consentPropertyName = 'zm_consent';
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add('hidden');
    }
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('cookie-accept');
    acceptBtn.addEventListener('click', acceptFn);

    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 2000);
    }
};