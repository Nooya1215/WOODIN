$(document).ready(function() {
  const asideH = $("#title").offset().top;
  $("#aside").hide();

  $(window).scroll(function() {
    if($(window).scrollTop()>asideH) {
      $("#aside").show();
    } else {
      $("#aside").hide();
    }
  })

  gsap.timeline()
    .set("#title .wrap", {backgroundSize: "105%", filter: "blur(0.4px)"}) // 처음 배경 사이즈 및 블러
    .set("#title .wrap h2", {opacity: 0, y: 50})
    .to("#title .wrap", {delay: 1.2, backgroundSize: "100%", duration: 1.5, ease: "power2.out"}) // 축소
    .to("#title .wrap h2", {delay: -1.3, opacity: 1, y: 0, duration: 1, ease: "power2.out"})
    .to("#title .wrap", {filter: "blur(0px)"}); // 블러제거
  },
);