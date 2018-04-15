$(document).ready(function($) {
  var XAngle = 0;
  var YAngle = 0;
  var Z = 50;
  var logocontainer = $("#prime_panel");
  var logo = $("#logo");

  logocontainer.on("mousemove", function(e) {
    var XRel = e.pageX - $(this).offset().left;
    var YRel = e.pageY - $(this).offset().top;
    var width = logo.width();
    YAngle = -(0.5 - XRel / width) * 4;
    XAngle = (0.5 - YRel / width) * 4;
    updateView(logo);
  });

  logocontainer.on("mouseleave", function() {
    resetView(logo);
  });

  function resetView(ele) {
    ele.css({
      transform: "perspective(525px) translateZ(0) rotateX(0deg) rotateY(0deg)",
      transition: "all 150ms linear 0s",
      "-webkit-transition": "all 150ms linear 0s"
    });
  }
  function updateView(ele) {
    ele.css({
      transform:
        "perspective(525px) rotateX(" +
        XAngle +
        "deg) rotateY(" +
        YAngle +
        "deg)"
    });
  }
});