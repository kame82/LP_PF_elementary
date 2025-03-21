// ハンバーガーボタンとドロワー
$("#js-button-drawer").on("click", function () {
  $(this).toggleClass("is-checked");
  $("#js-drawer").slideToggle();
  $("body").toggleClass("is-fixed");
});

//上部に戻るボタンの設置
jQuery(function () {
  //コマンドボタンを隠す
  var topBtn = jQuery("#js-return-top");
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
