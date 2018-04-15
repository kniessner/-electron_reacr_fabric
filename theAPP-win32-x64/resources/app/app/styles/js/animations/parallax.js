$(window).scroll(function() {
  var scrollTop = $(window).scrollTop();
  var imgPos = scrollTop / 2.7 + "px";
  //    $('#MainSlider').find('img').css('transform', 'translateY(-' + imgPos + ')');
});

function simpleParallax(intensity, element) {
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var imgPos = scrollTop / intensity + "px";
    element.css("transform", "translateY(" + imgPos + ")");
  });
}

$(document).ready(function($) {
  var w = window.innerWidth;
  var slider = $("#MainSlider");
  var carouselInner = $(".carousel-inner");
  var parallaxQuantity = carouselInner.length;
  //    simpleParallax(2, $('.container'));
  simpleParallax(-2, slider);
  // simpleParallax(-2.5, $("header"));
  // simpleParallax(1.3, $('#logo'));

  $(window).on("scroll", function() {
    window.requestAnimationFrame(function() {
      var scrolled = $(window).scrollTop();
      var parallax_speed_x1 = scrolled / 2 + "px";
      var parallax_speed_x2 = scrolled / 4 + "px";
      var parallax_speed_x3 = scrolled / 6 + "px";
      console.log(scrolled / 10, scrolled / 6 * 0.09);

      $(".content_header").css({
        transform:
          "rotate(" +
          scrolled / 2 * 0.003 +
          "deg) translateY(" +
          scrolled * -0.3 +
          ")"
        //  'width': 100 - (scrolled / 10 )+'%'
      });

      $(".plate").css({
        transform: "translate3d(0," + parallax_speed_x3 * -0.3 + "px, 0)"
      });
      carouselInner.css({
        transform: "translate3d(0," + parallax_speed_x2 * 0.3 + "px, 0);"
      });
    });
  });

});
