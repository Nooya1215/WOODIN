$(document).ready(function() {
  $("#showroom .showroom-info h2").hide();

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 화면에 80% 이상 보일 때
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { 
        animateshowroom(); // 애니메이션 실행
        $("#showroom .showroom-slide").addClass("on");
        handleLogoChange(true); // 로고 변경
        
      } 
      // 화면에서 80% 이하로 보일 때
      else if (entry.intersectionRatio < 0.8) {
        handleLogoChange(false); // 로고 원래대로 변경
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // showroom 섹션 감시
  observer.observe(document.querySelector("#showroom"));

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

  function animateshowroom() {
    $("#showroom .showroom-info h2").show();

    gsap.timeline()
    .to("#showroom .showroom-info h3", {
      delay: 1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
    .to("#showroom .showroom-info p", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")
    .to("#showroom .showroom-info address", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")
    .to("#showroom .showroom-info div a", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")

    // text 애니메이션
    $(".animated-text").each(function() {
      const $text = $(this);  // 현재 순회 중인 .animated-text 요소를 jQuery 객체로 저장
      const str = $text.text();  // .animated-text 요소의 텍스트를 가져옴 (innerText와 동일)
      $text.empty();  // 기존 텍스트를 비움 (innerHTML = ""과 동일)

      // str을 문자 단위로 쪼개서 반복
      [...str].forEach((char, i) => {
        const $span = $("<span></span>").text(char === " " ? "\u00A0" : char);  // 각 문자를 span으로 감쌈
        $span.css("--char-index", i);  // CSS에서 사용할 수 있는 --char-index 변수를 각 문자에 설정
        $text.append($span);  // span을 .animated-text 요소에 추가
      });
    });
  }

  // slick
  $(".showroom-slide").slick({
    arrows: true,
    dots: false,
    infinite: true,
    draggable: false,
    speed: 1000,
    cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  });

  $(".showroom-slide").append('<div class="showroom-btn"></div>');
  $(".showroom-btn").append($('.showroom-slide .slick-prev, .showroom-slide .slick-next'));
});