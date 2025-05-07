$(document).ready(function() {
  $(function () {
    $(window).on("scroll", function () {
      let scrollTop = $(this).scrollTop() + $(this).height();
      
      if (scrollTop > $("footer").offset().top) {
        gsap.timeline()
        .to("#aside a", {
          removeClass: "fixed",
          duration: 0.1,
          marginBottom: "190px",
          ease: "power1.in",
        });
      } else if ($(this).scrollTop() > 190) {
        gsap.timeline()
        .to("#aside a", {
          removeClass: "fixed",
          duration: 0.1,
          marginBottom: "0px",
          ease: "power1.in",
        });
      } else {
        $("#aside a").removeClass("fixed").css("marginBottom", "0px");
      }
    });
  });
});