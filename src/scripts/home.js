const DOM = {
  $main_slider: $('.main-slider'),
  $thoughts__slider: $('.thoughts__slider'),
  $venobox: $('.venobox'),
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

  function setBasePlugins() {
    DOM.$main_slider.slick({
      dots: true
    });

    DOM.$thoughts__slider.slick({
      slidesToShow: 2,
      slidesToScroll: 2
    });

    DOM.$venobox.venobox();
  }

  function onScroll() {
    setActiveLink();
    navFixed();
  }

  function setActiveLink() {
      var scrollPos = $(document).scrollTop();
      // console.log('scrollPos', scrollPos);

      DOM.$main_nav.find('a').each(function () {
          var link = $(this);
          var ref_element = $(link.attr("href"));
          var ref_element_top = ref_element.position().top;

          if (ref_element_top <= ( scrollPos + 15 ) && ref_element_top + ref_element.height() > scrollPos) {
              DOM.$main_nav.find('a').removeClass("is_active");
              link.addClass("is_active");
              return false;
          }
      });
  }

  function navFixed() {
    var scroll = $(window).scrollTop();

    if (scroll >= 40) {
      DOM.$main_nav.addClass('is_fixed');

    } else {
      DOM.$main_nav.removeClass('is_fixed');

    }
  }

  function init() {
    setBasePlugins();
    $(document).on("scroll", onScroll);
    setSmoothScrollingToAnchor();
    preventEmptyLink();
  }



  return {
    init: init
  }
})();

$(document).ready(function(){
  PAGE_API.init();
});
