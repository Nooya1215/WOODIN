$(document).ready(function() {
  $("#instagram .wrap h2").hide()

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // 화면에 80% 이상 보일 때
        animateinstagram(); // 애니메이션 실행
        observer.unobserve(entry.target); // 애니메이션 실행 후에는 해당 섹션을 감시 해제
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // instagram 섹션 감시
  observer.observe(document.querySelector("#instagram"));

  // 애니메이션 함수
  function animateinstagram() {
    $("#instagram .wrap h2").show()
    gsap.timeline()
    .to("#instagram .wrap h3", {
      delay: 1,
      y: 0,
      duration: 1.2,
      opacity: 1,
      ease: "power2.out"
    })

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

    // 모든 li 요소를 가져와서
    const items = document.querySelectorAll('#instagram .wrap .insta-slide li');

    // 홀수 번째 li 요소만 골라서 gsap 애니메이션 적용
    items.forEach((item, index) => {
      if ((index) % 2 === 1) { // index는 0부터 시작하니까 +1 해줘야 홀수 체크가 맞음
        gsap.to(item.querySelector('a'), {
          delay: 1.7,
          duration: 1,
          scale: 0.7,
          ease: "power1.out"
        });
      }
    });
  }

  let $slide = $('.insta-slide');
    $slide.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: true,
      draggable: true,
      arrows: false,
      initialSlide: 0,
      infinite: true,
      variableWidth: true,
      dots: false,
      cssEase: 'ease-out',
    }
  );

  // hover
  $('#instagram .insta-slide li a').each(function () {
    const $a = $(this);

    $a.on('mouseenter', function () {
      // 배경 이미지 확대
      gsap.to($a[0], {
        backgroundSize: "110%",
        duration: 1,
        ease: 'power1.out'
      });
    });

    $a.on('mouseleave', function () {
      // 배경 이미지 축소
      gsap.to($a[0], {
        backgroundSize: "100%",
        duration: 1,
        ease: 'power1.out'
      });
    });
  });
});