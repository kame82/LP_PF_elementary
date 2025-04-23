// ハンバーガーボタンとドロワー
$("#js-button-drawer").on("click", function () {
  $(this).toggleClass("is-checked");
  $("#js-drawer").slideToggle();
  $("body").toggleClass("is-fixed");
});

//上部に戻るボタンの設置
jQuery(function () {
  //コマンドボタンを隠す
  const topBtn = jQuery("#js-return-top-wrap");
  topBtn.hide();

  //スクロールが規定値に到達でボタン表示
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 80) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //ボタン押すとトップに戻る
  topBtn.click(function () {
    jQuery("body,html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

// ============================
// スクロールアニメーション
// ============================
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1); // Remove the '#' from the href
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});

// ============================
// 追従navigation
// ============================
window.addEventListener("scroll", function () {
  let lastScrollY = window.scrollY;
  const navLinks = document.querySelectorAll(".header__nav-item a");
  navLinks.forEach((link) => {
    link.classList.remove("is-active");
    const sectionId = link.getAttribute("href").substring(1);
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      const sectionTop = sectionElement.offsetTop; // Adjust for fixed header height
      const sectionBottom = sectionTop + sectionElement.offsetHeight;
      if (lastScrollY >= sectionTop && lastScrollY < sectionBottom) {
        link.classList.add("is-active");
      }
    }
  });
});

// ============================
// FV typewriter animation
// ============================

// new TypeIt(".fv__image_content-text_1", {
//   strings: "aaaaaaaaaaaaaaaa",
//   //
//   // <p class="fv__image_content-text_2"></p>
//   // <p class="fv__image_content-text_3"></p>
// }).go();

const typAnime = new TypeIt(".fv__image_content-text", {
  speed: 50,
  loop: true,
  loopDelay: 1000,
  delay: 1000,
})
  .type(
    '<span class="font-gray">&lt;</span><span class="font-blue">div</span><span class="font-gray">&gt;</span><span class="font-gray">&lt;</span><span class="font-blue">/div</span><span class="font-gray">&gt;</span>',
    { delay: 1000 }
  )
  .pause(1000)
  .move(-6)
  .pause(300)
  .type("<br>")
  .pause(300)
  .move(-1)
  .pause(1000)
  .type("<br>")
  .pause(300)
  .type("&nbsp;&nbsp;&nbsp;&nbsp;")
  .type(
    '<span class="font-gray">&lt;</span><span class="font-blue">h1</span><span class="font-gray">&gt;</span><span class="font-white">Welcome!!</span><span class="font-gray">&lt;</span><span class="font-blue">/h1</span><span class="font-gray">&gt;</span>'
  )
  .pause(1000)
  .move(-5)
  .delete(9)
  .type('<span class="font-white">Hello&nbsp;World!!</span>')
  .pause(1000)
  .move(12)
  .pause(10000)
  .delete()
  .go();

/** バニラJS
 * // ハンバーガーボタンとドロワー
document.getElementById("js-button-drawer").addEventListener("click", function () {
  this.classList.toggle("is-checked");
  const drawer = document.getElementById("js-drawer");
  if (drawer.style.display === "none" || drawer.style.display === "") {
    drawer.style.display = "block";
  } else {
    drawer.style.display = "none";
  }
  document.body.classList.toggle("is-fixed");
});

// 上部に戻るボタンの設置
document.addEventListener("DOMContentLoaded", function () {
  // コマンドボタンを隠す
  const topBtn = document.getElementById("js-return-top");
  topBtn.style.display = "none";

  // スクロールが規定値に到達でボタン表示
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  // ボタン押すとトップに戻る
  topBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
 *
 *
 * **/
