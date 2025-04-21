// ハンバーガーボタンとドロワー
$("#js-button-drawer").on("click", function () {
  $(this).toggleClass("is-checked");
  $("#js-drawer").slideToggle();
  $("body").toggleClass("is-fixed");
});

//上部に戻るボタンの設置
jQuery(function () {
  //コマンドボタンを隠す
  var topBtn = jQuery("#js-return-top-wrap");
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
