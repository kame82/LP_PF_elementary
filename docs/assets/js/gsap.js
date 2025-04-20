// gsap.registerPlugin(ScrollTrigger);
// gsap.to(".green", {
//   scrollTrigger: {
//     trigger: ".green",
//     markers: true,
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
gsap.set(".opening-view", { display: "block" }).then(() => {
  document.querySelector("body").style.overflow = "hidden";
});
// gsap.set(".opening-view__back1", { });
// gsap.set(".fv", { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, "z-index": 999, width: "100vw", height: "100vh" });

const tl = gsap.timeline();
tl.to(".opening-view", { opacity: 0, duration: 1, delay: 2 }).then(() => {
  document.querySelector(".opening-view").style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});

// tl.to(".opening-view__back1", { width: "100vw", duration: 1, delay: 1 });
