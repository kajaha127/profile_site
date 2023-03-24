// 메뉴바
$(function () {
  const $h1 = $("h1");
  const $home = $h1.next(".home");
  const $header = $("header");

  const $nav = $header.find("nav");
  const $gnb = $nav.find(".gnb");
  const $mnu = $gnb.find("a");

  const arrTopVal = [];
  let nowIdx = 0;

  const headerH = $header.height();

  $("article").each(function (idx) {
    arrTopVal[idx] = $(this).offset().top;
  });

  $(window).on("scroll", function () {
    let scrollTop = Math.ceil($(this).scrollTop());

    // 메뉴바(header) 고정
    if (scrollTop > 50) {
      $header.addClass("fixed");
      $home.css({
        marginTop: headerH,
      });
    } else {
      $header.removeClass("fixed");
      $home.css({
        marginTop: 0,
      });
    }

    // 메뉴 활성화 표시
    for (let i = 0; i < $mnu.length; i++) {
      if (scrollTop >= arrTopVal[i] - headerH - 50) {
        $mnu.eq(i).parent().addClass("on").siblings().removeClass("on");
      } else if (scrollTop < arrTopVal[0] - headerH - 50) {
        $mnu.parent().removeClass("on");
      }
    }
  });

  // 네비게이션 클릭에 따른 페이지 이동
  $mnu.click(function (evt) {
    preventDefault(evt);
    $("html, body").animate({ scrollTop: $(this.hash).offset.top }, 300);
  });

  // 로고 클릭시 상단으로 이동
  $(".logo").on("click", function (evt) {
    evt.priventDefault();
    $("html,body").animate({ scrollTop: 0 });
  });
});

// skill - tools
$(function () {
  $("#skill").on("inview", function (visible) {
    if (visible) {
      for (let i = 0; i < 7; i++) {
        const $that = $("#skill .bar").eq(i);
        $that.width($that.parent().attr("data-bar") + "%");
      }
    }
  });
});

// skill - ability
$(".skill-ability").on("inview", function (visible) {
  if (visible) {
    $(".chart").easyPieChart({
      //your configuration goes here
      delay: 500,
      barColor: "#ffcc00",
      trackColor: "#3C3D4A",
      scaleColor: false,
      lineWidth: 8,
      size: 120,
      animate: 2000,
      onStep: function (from, to, percent) {
        this.el.children[0].innerHTML = Math.round(percent);
      },
    });
  }
});

// 제작과정 모달창
$(function () {
  const $portfolioContainer = $(
    "#portfolio > .portfolio-containers > .portfolio-container"
  );
  const $btnProcess = $portfolioContainer.find(".show > .process > a");
  const $shadow = $portfolioContainer.children(".shadow");
  const $modal = $shadow.children(".modal");
  const $btnClse = $shadow.children(".clse");

  const $shadowCJ = $portfolioContainer.eq(0).children(".shadow");
  const $shadowSub = $portfolioContainer.eq(1).children(".shadow");
  const $shadowMRT = $portfolioContainer.eq(2).children(".shadow");
  const $shadowLP = $portfolioContainer.eq(3).children(".shadow");

  $btnProcess.on("click", function (evt) {
    evt.preventDefault();
    if (
      $(this).parents(".show").siblings(".shadow").find("img").attr("alt") ===
      "CJ 뉴스룸 제작과정"
    ) {
      $shadowCJ.show();
    } else if (
      $(this).parents(".show").siblings(".shadow").find("img").attr("alt") ===
      "써브웨이 제작과정"
    ) {
      $shadowSub.show();
    } else if (
      $(this).parents(".show").siblings(".shadow").find("img").attr("alt") ===
      "마이 리얼 트립 제작과정"
    ) {
      $shadowMRT.show();
    } else if (
      $(this).parents(".show").siblings(".shadow").find("img").attr("alt") ===
      "룩핀 제작과정"
    ) {
      $shadowLP.show();
    }
  });

  $btnClse.on("click", function () {
    $shadow.hide();
  });

  $shadow.on("click", function (evt) {
    evt.stopPropagation();
    $shadow.hide();
  });

  $(document).on("keyup", function (evt) {
    if (evt.which === 27) {
      $shadow.hide();
    }
  });

  $modal.on("click", function (evt) {
    evt.stopPropagation();
  });
});
