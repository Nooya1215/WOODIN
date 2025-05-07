$(document).ready(function() {
  $("#product .product-info h2").hide()

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // 화면에 80% 이상 보일 때
        animateProduct(); // 애니메이션 실행
        observer.unobserve(entry.target); // 애니메이션 실행 후에는 해당 섹션을 감시 해제
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // product 섹션 감시
  observer.observe(document.querySelector("#product"));

  // 애니메이션 함수
  function animateProduct() {
    $("#product .product-info h2").show()
    gsap.timeline()
    .set("#product .product-info h3", { delay: 0.5, opacity: 0, y: 50 })
    .set("#product .product-info p", { opacity: 0, y: 50 })
    .to("#product .product-info h3", { delay: 0.5, opacity: 1, y: 0, duration: 1, ease: "power2.out" })
    .to("#product .product-info p", { delay: -0.5, opacity: 1, y: 0, duration: 1, ease: "power2.out" })
    .to("#product .product-text strong", { delay: -2.5, duration: 1, y: 0, ease: "power2.out" })
    .to("#product .product-text strong span", { delay: -2.7, duration: 1, y: 0, ease: "power2.out" })
    .to("#product .product-text p", { delay: -2.4, duration: 1, y: 0, ease: "power2.out"})

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

    gsap.timeline()
    .set("#product .product-slick li", { backgroundSize: "105%" })
    .to("#product .product-slick li", { delay: 2, backgroundSize: "100%", duration: 1.5, ease: "power2.out" })
  }

  // slick
  $(".product-slick").slick({
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    draggable: false,
    speed: 1000,
    cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  });

  // arrow
  $('#product .slick-list').append('<div class="arrow"></div>');
  $('#product .slick-list .arrow').append($('.slick-prev, .slick-next'));

  // text
  let textTimeline; // 전역 변수로 선언

  $("#product .slick-list .arrow .slick-prev, #product .slick-list .arrow .slick-next").click(function () {

    // 기존 애니메이션 중단
    if (textTimeline) textTimeline.kill();

    textTimeline = gsap.timeline();

    // 기존 텍스트 아래로 빠지게
    textTimeline.to("#product .product-text strong", {
      y: 50,
      duration: 0.1,
      ease: "power2.in"
    }, 0)
    .to("#product .product-text strong span", {
      y: 50,
      duration: 0.1,
      ease: "power2.in"
    }, 0)
    .to("#product .product-text p", {
      y: 50,
      duration: 0.1,
      ease: "power2.in"
    }, 0)

    // 아래에서 위로 등장
    .to("#product .product-text strong", {
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.05") // 살짝 텀 두고
    .to("#product .product-text strong span", {
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7")
    .to("#product .product-text p", {
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7");
  });
});
