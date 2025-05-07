$(document).ready(function() {
  $("#category .product-info li h2").hide();

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // 화면에 80% 이상 보일 때
        animatecategory(); // 애니메이션 실행
        observer.unobserve(entry.target); // 애니메이션 실행 후에는 해당 섹션을 감시 해제
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // category 섹션 감시
  observer.observe(document.querySelector("#category"));

  function animatecategory() {
    $("#category .product-info li h2").show();
    $("#category").addClass("active");
    gsap.timeline()
    .to("#category .product-info li:nth-child(1) a", { delay: 2, duration: 1.5, backgroundSize: "100%" })
    .to("#category .product-info li:nth-child(3) a", { delay: -1.5, duration: 1.5, backgroundSize: "100%" })
    .to("#category .product-info li:nth-child(5) a", { delay: -1.5, duration: 1.5, backgroundSize: "100%" })
    .to("#category .product-info li:nth-child(6) a", { delay: -1.5, duration: 1.5, backgroundSize: "100%" })
    .to("#category .product-info li h3", {
      delay: -1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=1.3")
    .to("#category .product-info li p", {
      delay: -1,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
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

    // 배경 이미지
    $('#category .product-info li:not(.category-text)').each(function () {
      const $li = $(this);
      // li의 a를 link로 선언
      const $link = $li.find('a');

      $li.on('mouseenter', function () {
        // 배경 이미지 확대
        gsap.to($link[0], {
          backgroundSize: '110%',
          duration: 0.7,
          ease: 'power1.out'
        });

        // ::after를 보이게 하기 위한 클래스 추가
        $link.addClass('overlay-active');
      });

      $li.on('mouseleave', function () {
        // 배경 이미지 축소
        gsap.to($link[0], {
          backgroundSize: '100%',
          duration: 0.7,
          ease: 'power1.out'
        });

        // ::after 숨기기
        $link.removeClass('overlay-active');
      });
    });
  }
});