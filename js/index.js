$(document).ready(function () {
  // window.scrollTo(0, 0);

  const sectionCount = 9; // 총 9개 섹션 (footer 포함)
  let currentSection = 1; // section1부터 시작
  let isScrolling = false;

  // GSAP 애니메이션 타이머 변수 추가
  let scrollAnimation;

  function scrollToSection(classIndex) {
    const targetClass = `.section${classIndex}`;
    const targetEl = $(targetClass).get(0);

    // target이 존재하지않으면 실행 X
    if (!targetEl) return;

    let offset = targetEl.offsetTop;

    // section1은 헤더 80px만큼 보정
    const titleHeight = 80;
    if (classIndex === 1) {
      offset -= titleHeight;
    }
    
    // footer의 높이로 보정
    const footerHeight = 190;
    if (classIndex === sectionCount) {
      offset -= footerHeight;
    }

    // footer로 스크롤 시 속도 다르게 주기
    const duration = (classIndex === sectionCount) ? 2.5 : 1;  // footer는 1.2초로 설정
    const easeEffect = (classIndex === sectionCount) ? "sine.inOut" : "power1.inOut";  // footer는 power2.inOut

    if (scrollAnimation) {
      scrollAnimation.kill(); // 기존 애니메이션을 중지
    }

    scrollAnimation = gsap.to(window, {
      scrollTo: offset,
      duration: duration, // footer에만 속도 다르게
      ease: easeEffect,
      onComplete: () => {
        isScrolling = false;
        updateActiveBar();
        updateIndicatorHighlight();
      }
    });

    // footer에 도달하면 더 빠르게 스크롤할 수 있게 시간 단축
    if (classIndex === sectionCount) {
      setTimeout(() => {
        isScrolling = false; // footer 스크롤 중에 너무 오랜 대기 시간 없이 중복 스크롤 방지
      }, 1000); // 1000ms 후에는 isScrolling을 해제하여 중복 스크롤이 불가능하게 만듦
    }
  }

  $(window).on("wheel", function (e) {
    if (isScrolling) return;

    if (e.originalEvent.deltaY > 0 && currentSection < sectionCount) {
      currentSection++;
    } else if (e.originalEvent.deltaY < 0 && currentSection > 1) {
      currentSection--;
    } else {
      return;
    }

    isScrolling = true;
    scrollToSection(currentSection);
  });

  $(window).on("resize", function () {
    scrollToSection(currentSection);
  });

  // scroll-indicator 클릭 이벤트 추가
  $('.scroll-indicator .bar').on('click', function () {
    const index = $(this).data('index');
    currentSection = index;  // 클릭한 바의 인덱스를 현재 섹션으로 설정
    isScrolling = true;
    scrollToSection(currentSection);  // 해당 섹션으로 스크롤
  });

  // 활성화된 바 업데이트
  function updateActiveBar() {
    $('.scroll-indicator .bar').removeClass('active');
    $(`.scroll-indicator .bar[data-index="${currentSection}"]`).addClass('active');
  }

  // 초기 상태에서 활성화된 바 설정
  updateActiveBar();
  updateIndicatorHighlight();

  // 스크롤 후 바 활성화 업데이트
  $(window).on("scroll", function () {
    updateActiveBar();
    updateIndicatorHighlight();
  });
  
  function updateIndicatorHighlight() {
    if ([3, 8].includes(currentSection)) {
      $('.scroll-indicator').addClass('highlight');
    } else {
      $('.scroll-indicator').removeClass('highlight');
    }
  }
});
