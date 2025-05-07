$(document).ready(function() {
  $("#gallery .wrap h2").hide();

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // 화면에 80% 이상 보일 때
        animategallery(); // 애니메이션 실행
        observer.unobserve(entry.target); // 애니메이션 실행 후에는 해당 섹션을 감시 해제
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // gallery 섹션 감시
  observer.observe(document.querySelector("#gallery"));

  let $slide = $('.gallery-slide');
  $slide.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
    initialSlide: 0,
    infinite: false,
    variableWidth: true,
    dots: true,
  });

  function animategallery() {

    $("#gallery .wrap h2").show();
    gsap.timeline()
    .to("#gallery .wrap h3", {
      delay: 1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
    .to(".gallery-slide li a img", {
      transform: "scale(1)",
      duration: 2,
      ease: "power2.out",
    })
    .to("#gallery .progress-container", {
      opacity: 1,
    }, "-=2")
    .to("#gallery .progress-container", {
      delay: 1,
      width: "99%",
      duration: 1,
      ease: "power2.out",
    }, "-=2")
    .to("#gallery .progress-bar", {
      opacity: 1,
    }, "-=2")
    .to("#gallery .progress-bar", {
      width: "33%",
      duration: 1,
      ease: "power2.out",
    }, "-=2")
    .to("#gallery .gallery-slide li h4", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=1")

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

    // 하단 게이지 바
    $slide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (nextSlide > currentSlide) {
        $('.progress-bar').css('width', '100%');
      } else {
        $('.progress-bar').css('width', '33%');
      }
    });

    // hover
    $('#gallery .slick-slide a').each(function () {
      const $a = $(this);
      // a의 img를 img로 선언
      const $img = $a.find('img');

      $a.on('mouseenter', function () {
        // 배경 이미지 확대
        gsap.to($img[0], {
          transform: "scale(1.1)",
          duration: 1,
          ease: 'power1.out'
        });
      });

      $a.on('mouseleave', function () {
        // 배경 이미지 축소
        gsap.to($img[0], {
          transform: "scale(1)",
          duration: 1,
          ease: 'power1.out'
        });
      });
    });
  }
});



