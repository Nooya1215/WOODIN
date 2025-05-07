$(document).ready(function() {
  $("#media .media-info h2").hide();

  // IntersectionObserver로 섹션이 화면에 80% 이상 보일 때 애니메이션 실행
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // 화면에 80% 이상 보일 때
        $("#media .video-slide").slick("slickPlay");
        $("#media .media-info").addClass("infoani");
        animatemedia(); // 애니메이션 실행
        observer.unobserve(entry.target); // 애니메이션 실행 후에는 해당 섹션을 감시 해제
      }
    });
  }, { threshold: 0.8 }); // 80%가 화면에 보일 때 트리거

  // media 섹션 감시
  observer.observe(document.querySelector("#media"));

  // 애니메이션 함수
  function animatemedia() {
    $("#media .media-info h2").show();
    gsap.timeline()
    .to("#media .video-slide", {
      delay: 0.5,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.Out",
    }, "-=0.4")
    .to("#media .media-info h3", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.Out",
    }, "-=0.4")
    .to("#media .media-info p", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.Out",
    }, "-=0.6")

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

  $("#media .video-slide").on('init', function() {
    startDotProgress();
  });
  
  $("#media .video-slide").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    resetDotProgress();
  });

  $("#media .video-slide").slick({
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    draggable: false,
    adaptiveHeight: true,
    adaptiveWidth: true,
    fade: true,
    speed: 800,
    appendArrows: $('.controls-wrapper'),
    appendDots: $('.controls-wrapper'),
    customPaging: function(slider, i) {
      return '<div class="custom-dot"><span class="dot-bar"></span></div>';
    }
  });

  const dotDuration = 4000;

  function startDotProgress() {
    const $current = $('.slick-dots li.slick-active .dot-bar');
    $current.addClass('animating');
  }

  function resetDotProgress() {
    $('.dot-bar').removeClass('animating');
    // 다음 슬라이드 시작할 때 다시 적용 (살짝 딜레이를 둬야 CSS가 다시 작동함)
    setTimeout(() => {
      startDotProgress();
    }, 50);
  }

  // 슬라이드 변경될 때 텍스트도 바꿔줌
  $('.video-slide').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    const $texts = $('#media .media-info p');
    const $currentText = $texts.eq(currentSlide);
    const $nextText = $texts.eq(nextSlide);

    const tl = gsap.timeline();

    // 현재 텍스트 아래로 사라짐
    tl.to($currentText, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        $currentText.removeClass('active');
      }
    });

    // 다음 텍스트 준비
    tl.set($nextText, {
      y: 50,
      opacity: 0
    });

    // 다음 텍스트 위에서 올라옴
    tl.to($nextText, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onStart: () => {
        $nextText.addClass('active');
      }
    });
  });
});