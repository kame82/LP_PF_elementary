var windowWidth = window.innerWidth;
var windowSmall = window.matchMedia("(max-width: 768px)");

if (windowSmall.matches) {
  // スマホ用の処理
} else {
  gsap.registerPlugin(ScrollTrigger);
  // gsap.to(".green", {
  //   scrollTrigger: {
  //     trigger: ".green",
  markers: true,
    //     start: "top center",
    //     scrub: true,
    //     toggleActions: "restart none none none",
    //   },
    //   rotation: 360,
    //   x: 100,
    //   duration: 1,
    // });

    // // target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second.
    // gsap.from(".purple", { rotation: -360, x: -100, duration: 1 });

    // // target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second.
    // gsap.fromTo(".blue", { x: -100 }, { rotation: 360, x: 100, duration: 1 });

    // ============================
    // FVアニメーション
    // ============================
    gsap.set(".opening-view", { display: "block" });
  gsap.set("body", { overflow: "hidden" });

  const tl = gsap.timeline();
  tl.to(".opening-view", {
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
    onComplete: () => {
      document.querySelector(".opening-view").style.display = "none";
      document.querySelector("body").style.overflow = "auto";
    },
  });
  // tl.to(".opening-view__back1", { width: "100vw", duration: 1, delay: 1 });

  // ============================
  //
  // ============================

  document.getElementById("js-drawer-reverse").addEventListener("click", function (e) {
    e.preventDefault();
    const wrapper = document.querySelector(".wrapper");
    const sidebar = document.querySelector(".header");
    const main = document.querySelector(".main");
    const mainWidth = main.clientWidth;
    const isReverse = wrapper.style.flexDirection === "row-reverse";

    gsap.to(sidebar, {
      x: isReverse ? 300 : -300,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // flexDirection 切り替え
        wrapper.style.flexDirection = isReverse ? "row" : "row-reverse";

        // 位置リセットして、スライドイン
        gsap.set(sidebar, { x: isReverse ? -300 : 300 });
        gsap.to(sidebar, {
          x: 0,
          opacity: 1,
          duration: 0.3,
        });
      },
    });
    gsap.to(main, {
      x: isReverse ? "13%" : "-13%",
      opacity: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.set(main, { x: isReverse ? "-13%" : "13%", opacity: 0.8 });
        gsap.to(main, {
          x: 0,
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  });

  // ============================
  // service section animation
  // ============================

  gsap.from("#service-scroll-content1", {
    y: 50,
    scrollTrigger: {
      trigger: "#service-scroll-content1",
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      // markers: true,
    },
  });
  gsap.from("#service-scroll-content2", {
    y: 120,
    scrollTrigger: {
      trigger: "#service-scroll-content1",
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
      // markers: true,
    },
  });
  gsap.from("#service-scroll-content3", {
    y: 170,
    scrollTrigger: {
      trigger: "#service-scroll-content1",
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
      // markers: true,
    },
  });
  // ============================
  // flow section animation
  // ============================

  for (let i = 1; i <= 4; i++) {
    gsap.from(`#wf-smooth-content${i}`, {
      y: 100,
      opacity: 0,
      duration: 0.25 + i * 0.25,
      delay: 0.2,
      scrollTrigger: {
        trigger: "#wf-smooth-content1",
        start: "top 80%",
        end: "top 30%",
        // markers: true,
      },
    });
  }

  // ============================
  // smooth-scroll
  // ============================
  //   const container = document.querySelector("#smooth-content");
  //   const height = container.clientHeight; //コンテンツの高さを取得
  //   document.body.style.height = `${height}px`; //bodyタグにスタイル付与

  //   gsap.to(container, {
  //     y: -(height - document.documentElement.clientHeight), //ページ内要素の高さ - ウインドウの高さ
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: document.body,
  //       start: "top top",
  //       end: "bottom bottom",
  //       scrub: 1,
  //     },
  //   });
}
