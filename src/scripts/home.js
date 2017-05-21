const DOM = {
  $main_slider: $('.main-slider'),
  $thoughts__slider: $('.thoughts__slider'),
  $venobox: $('.venobox'),
  $header: $('.l-header'),
  $nav_btn: $('.nav-btn'),
  $main_nav: $('.main-nav')
};

var PAGE_API = (function(){
  function setSmoothScrollingToAnchor(){
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
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

  function init() {
    setBasePlugins();
    $(document).on("scroll", onScroll);
    setSmoothScrollingToAnchor();
    preventEmptyLink();
    navBtn();
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  PAGE_API.init();
});
