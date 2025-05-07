$(document).ready(function() {
  $("#brand .wrap h2").hide();

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 화면에 80% 이상 보일 때
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { 
        animatebrand(); // 애니메이션 실행
        handleLogoChange(true); // 로고 변경
        
      } 
      // 화면에서 80% 이하로 보일 때
      else if (entry.intersectionRatio < 0.8) {
        handleLogoChange(false); // 로고 원래대로 변경
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // brand 섹션 감시
  observer.observe(document.querySelector("#brand"));

  // 로고 변경 함수
  function handleLogoChange(isVisible) {
    if (isVisible) {
      $("header .logo h1 a img").attr("src", "img/logo2.png").css("width", "114.45px");
      $("header .gnb ul li a").css("color", "#fff");
      $("header .enb-list li:nth-child(1)").css("background-image", "url('img/svg/language2.svg')");
      $("header .enb-list li:nth-child(2)").css("background-image", "url('img/svg/search2.svg')");
      $("header .enb-list li:nth-child(3)").css("background-image", "url('img/svg/menu2.svg')");
    } else {
      $("header .logo h1 a img").attr("src", "img/logo.png").css("width", "100%");
      $("header .gnb ul li a").css("color", "#000");
      $("header .enb-list li:nth-child(1)").css("background-image", "url('img/svg/language.svg')");
      $("header .enb-list li:nth-child(2)").css("background-image", "url('img/svg/search.svg')");
      $("header .enb-list li:nth-child(3)").css("background-image", "url('img/svg/menu.svg')");
    }
  }

  function animatebrand() {
    $("#brand .wrap h2").show();
    
    gsap.timeline()
    .to("#brand .wrap h3", {
      delay: 1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to("#brand .wrap h4", {
      delay: 1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=1.5")
    .to("#brand .wrap p", {
      delay: 1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=1.5")
  }
});