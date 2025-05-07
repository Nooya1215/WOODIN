$(document).ready(function () {
  const footer = document.querySelector('#footer');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // footer가 화면에 조금이라도 보이면
        $('header').css('position', 'absolute');
      } else {
        // footer가 화면에서 사라지면
        $('header').css('position', 'fixed');
      }
    });
  }, {
    threshold: 0 // 0 이상이면 조금이라도 보일 때 감지
  });

  observer.observe(footer);
});
