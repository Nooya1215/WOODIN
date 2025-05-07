$(document).ready(function() {

  // 헤더 내려오는 애니메이션
  gsap.timeline()
  .set("header", {opacity: 0, y: -50})
  .to("header", {delay: 1.3, opacity:1, y: 0, duration: 1, ease: "power2.out"})

  // 기본 숨기기
  $(".woodin-list, .products-list, .support-list").hide();

  // 마우스 올리면 보이기
  $("header .gnb > ul > li").mouseenter(function() {
    let index = $(this).index(); // 인덱스 번호 생성으로 메뉴 지정

    $(".woodin-list, .products-list, .support-list").hide(); // 호버했던 메뉴 숨기기

    // index 번호에 따라 보이는 메뉴
    if (index === 0) {
      $(".woodin-list").show();
    } else if (index === 1) {
      $(".products-list").show();
    } else if (index === 2) {
      $(".support-list").show();
    }
  });

  // 마우스떼면 숨기기
  $(".gnb-list, .woodin-list, .products-list, .support-list").mouseleave(function() {
    setTimeout(function() {
      if (!$(".gnb-list:hover, .woodin-list:hover, .products-list:hover, .support-list:hover").length) {
        $(".woodin-list, .products-list, .support-list").hide();
      }
    }, 50); // 50ms 여유
  });

  // enb
  $(".enb-menu").hide();

  // language
  $(".lang-btn").click(function() {
    $(".enb-lang").stop().slideToggle();
    return false;
  });

  $(".enb-lang li a").click(function () {
    let $parent = $(this).parent(); // 클릭한 a 태그의 부모 li 가져오기
    $(".enb-lang li a").removeClass("on"); // 모든 a에서 on 제거
    $(this).addClass("on"); // 클릭한 a에 on 추가
    $(".enb-lang").prepend($parent[0]);  // 클릭한 li를 ul의 맨 앞으로 이동
  });
  
  // search
  const svg = $("header .enb-list li:nth-child(2)");
  // const svg = document.querySelector("header .enb-list li:nth-child(2)");
  $(".search-box").hide();
  $(".search-btn").click(function() {
    $(".search-box").slideToggle(200);
    if ($(svg).css("background-image").includes("search.svg")) {
      $(svg).css("background-image", "url('./img/svg/close.svg')");
    } else {
      $(svg).css("background-image", "url('./img/svg/search.svg')");
    }
    return false;
  });
  
  //button
  $(".close button").click(function () {
    $(".enb-menu").hide();
    return false;
  });

  $(".close").click(function() {
    $(".close").css({ opacity: "0"});
    $(".enb-menu").hide();
  });

  // enb-menu hover
  $(".enb-menu .menu1 li").mouseenter(function () {
    const index = $(this).index();

    if (index === 0 || index === 1) {
      // 첫 번째, 두 번째 항목일 때만 하위 메뉴 보여줌
      $(this).find(".menu-sub").show();
    } else {
      // 3번째나 4번째 항목일 경우는 하위 메뉴를 안 보임
      $(this).find(".menu-sub").hide();
    }
  
    // 형제들의 서브 메뉴는 숨기기
    $(this).siblings().find(".menu-sub").hide();
  });
  

  let menuTimeline;

  $(".menu-btn").click(function() {
    $(".enb-menu").show();
    $(".close").css({ opacity: "1"});

    // 초기화
    $(".menu1, .menu2, .menu3").hide();
  
    // menu1 슬라이드 시작
    $(".menu1").slideDown();
  
    // menu2는 menu1의 50%쯤 진행된 시점(=50ms 후)부터 슬라이드
    setTimeout(function () {
      $(".menu2").slideDown();
    }, 50);
  
    // menu3는 menu2의 50%쯤 진행된 시점(=100 + 50 = 150ms 후)부터 슬라이드
    setTimeout(function () {
      $(".menu3").slideDown();
    }, 100);

    // 순서대로 등장
    if (menuTimeline) menuTimeline.kill();

    menuTimeline = gsap.timeline();

    menuTimeline.fromTo(".menu1 .menu-list",
      { opacity: 0, x: -50 },
      {
        delay: 0.5,
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out"
      })
    .fromTo(".menu2 .menu-list",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out"
      },"-=0.5")
    .fromTo(".menu3 .menu-list",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out"
      },"-=0.5");

    menuTimeline.fromTo(".menu-logo",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },"-=0.3");
      
    menuTimeline.fromTo(".menu-sns",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },"-=1");
    }
  );
});