const cursor_circle = document.querySelector(".cursor-circle"),
  cursor = document.querySelectorAll(".cursor"),
  elements = document.querySelectorAll(".getHover"),
  image_wrap = document.querySelector(".image-wrap");

document.addEventListener("DOMContentLoaded", () => {
  const timeline = gsap.timeline({
    defaults: { duration: 1.3, ease: "power4.inOut" },
  });

  timeline
    .to(".image-wrap", {
      height: "550px",
      backgroundSize: "105%",
      duration: 1.5,
      ease: "power1.inOut",
    })
    .to(
      ".image-wrap",
      {
        height: "250px",
        backgroundPosition: "50% 58%",
        y: "0",
      },
      1.5
    )
    .from(
      ".big-name",
      {
        y: getYDistance(".big-name"),
      },
      1.5
    )
    .from(
      ".hide",
      {
        opacity: "0",
      },
      1.5
    );
});

function getYDistance(el) {
  const element = document.querySelector(el);
  if (element) {
    return window.innerHeight - element.getBoundingClientRect().top;
  }
  return 0;
}

window.addEventListener("mousemove", (e) => {
  const xPosition = e.clientX;
  const yPosition = e.clientY;
  cursor.forEach((el) => {
    el.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
    el.style.opacity = "1";
  });
});

elements.forEach((el) => {
  el.addEventListener("mouseover", () => {
    cursor_circle.classList.add("biggerCursor");
  });
  el.addEventListener("mouseout", () => {
    cursor_circle.classList.remove("biggerCursor");
  });
});

image_wrap.addEventListener("mousemove", (e) => {
let rect = image_wrap.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    let xSpeed = 0.008, 
    ySpeed = 0.02;

    let xMoving = x - image_wrap.clientWidth / 2;
    let yMoving = y - image_wrap.clientHeight / 2;

    image_wrap.style.backgroundPosition = `calc(50% + ${xMoving * xSpeed }px) calc(58% + ${yMoving * ySpeed }px)`;
});


image_wrap.addEventListener("mouseover", () => {
  image_wrap.style.transtion = ".2s background-position";
  setTimeout(() => {
    image_wrap.style.transition = "0s background-position";
  }, 200);
});

image_wrap.addEventListener("mouseout", () => {
  image_wrap.style.transtion = ".5s background-position";
  image_wrap.style.backgroundPosition = "50% 50%";
});


setTimeout(() => {
  image_wrap.style.pointerEvents = "auto";
  }, timeline.endTime() * 1000);