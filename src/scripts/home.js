import ScrollReveal from 'scrollreveal/dist/scrollreveal.min.js';
window.sr = new ScrollReveal({
  mobile: false
});

const PAGE_ANIMATION = (function(){
  var init = function() {
    /* nav */
    sr.reveal('.section__header--full', {
      viewFactor: .3,
      duration: 900,
      delay: 200
    });

    sr.reveal('.services__list-col', {
      duration: 900,
      origin: 'bottom',
      distance: '100px',
      scale: .9
    }, 400);

    sr.reveal('.section__header--text-right', {
      delay: 200,
      duration: 1300,
      distance: '30%',
      origin: 'left',
      scale: 1
    });

    sr.reveal('.albums__item-col.fooReveal', {
      delay: 600,
      distance: '30%',
      duration: 1300,
      origin: 'right',
      scale: 1
    });

    sr.reveal('.thoughts__item', {
      delay: 300,
      distance: '100px',
      duration: 600,
      rotate: { x: 60, y: 60 },
      scale: .2
    }, 300);

    sr.reveal('.section__header--side-left', {
      delay: 200,
      duration: 600,
      distance: '20%',
      origin: 'right',
      scale: 1,
      viewFactor: .4
    });

    sr.reveal('.h-section__side-special--dark', {
      delay: 1200,
      duration: 1000,
      distance: '30%',
      origin: 'left',
      scale: 1,
      viewFactor: .4
    });

    sr.reveal('.products__item', {
      delay: 300,
      distance: '100px',
      duration: 1100,
      rotate: { x: 60, y: 60 },
      scale: .2
    }, 300);

    sr.reveal('.section__header--side-right', {
      delay: 200,
      duration: 700,
      distance: '60%',
      origin: 'left',
      scale: 1,
      viewFactor: .4
    });

    sr.reveal('.side-form__item', {
      delay: 600,
      distance: '100px',
      duration: 1100,
      rotate: { x: 60, y: 60 },
      scale: .2,
      viewFactor: .3
    }, 400);

  }

  return {
    init: init
  }
})();


const DOM = {
  $main_slider: $('.main-slider'),
  $main_slider_wrap: $('.main-slider__wrap'),
  $thoughts__slider: $('.thoughts__slider'),
  $venobox: $('.venobox'),
  $header: $('.l-header'),
  $nav_btn: $('.nav-btn'),
  $main_nav_ul: $('.main-nav__ul'),
  $main_nav: $('.main-nav'),
  $preloader: $('#preloader')
};

var PAGE_API = (function(){
  function setSmoothScrollingToAnchor(){
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            var closest_is_active = $(this).closest('.is_active');

            if (closest_is_active.length > 0) {
              closest_is_active.removeClass('is_active');
            }

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 30
                }, 1300);
                return false;
            }
        }
    });
  }

  function preventEmptyLink() {
    $('a[href="#"]').on('click', function(e){
      e.preventDefault();
    });
  }

  function venoboxUlrChange() {
    var items = $('.vbox-item');

    items.each(function(){
      var new_href = $(this).find('img').attr('src');
      $(this).attr('href', new_href);
    })
  }

  function setBasePlugins() {
    DOM.$main_slider.slick({
      dots: true,
      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 599,
            settings: {
              arrows: false
            }
          }
        ]
    });

    DOM.$thoughts__slider.slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 599,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false
            }
          }
        ]
    });

    DOM.$venobox.venobox();
    venoboxUlrChange();
  }

  function onScroll() {
    setActiveLink();
    navFixed();
  }

  function setActiveLink() {
      var scrollPos = $(document).scrollTop();
      // console.log('scrollPos', scrollPos);

      DOM.$header.find('a').each(function () {
          var link = $(this);
          var ref_element = $(link.attr("href"));
          var ref_element_top = ref_element.position().top;

          if (ref_element_top <= ( scrollPos + 15 ) && ref_element_top + ref_element.height() > scrollPos) {
              DOM.$header.find('a').removeClass("is_active");
              link.addClass("is_active");
              return false;
          }
      });
  }

  function navFixed() {
    var scroll = $(window).scrollTop();

    if (scroll >= 40) {
      DOM.$header.addClass('is_fixed');

    } else {
      DOM.$header.removeClass('is_fixed');

    }
  }

  function navBtn() {
    DOM.$nav_btn.on('click tap', function(){
      DOM.$header.toggleClass('is_active');
    })
  }

  function hidePreloader() {
    $.when(DOM.$preloader.fadeOut(200))
    .done(function(){
      PAGE_ANIMATION.init();
    });
  }

  function init() {
    setBasePlugins();
    $(document).on("scroll", onScroll);
    setSmoothScrollingToAnchor();
    preventEmptyLink();
    navBtn();
    hidePreloader();
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  PAGE_API.init();
});
