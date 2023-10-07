import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Draggable from "gsap/dist/Draggable";
import { useEffect } from "react";

export function useScrollAnimaton() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    const navLinks = gsap.utils.toArray("[data-link]");
    const lastNavWidth = () => navLinks[navLinks.length - 1].offsetWidth;
    const track = document.querySelector("[data-draggable]");
    const tl = gsap.timeline().to(track, {
      x: () => {
        return (track.offsetWidth * 0.5 - lastNavWidth()) * -1;
      },
      ease: "none",
    });

    const st = ScrollTrigger.create({
      animation: tl,
      scrub: 0,
    });

    const getDraggableWidth = () => {
      return track.offsetWidth * 0.5 - lastNavWidth();
    };
    const getUseableHeight = () =>
      document.documentElement.offsetHeight - window.innerHeight;

    const updatePosition = () => {
      const left = track.getBoundingClientRect().left * -1;
      const width = getDraggableWidth();
      const useableHeight = getUseableHeight();
      const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);

      st.scroll(y);
    };
    const draggablenstance = Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: {
        minX: 0,
        maxX: getDraggableWidth() * -1,
      },
      edgeResistance: 1,
      onDragStart: () => st.disable(),
      onDragEnd: () => st.enable(),
      onThrowUpdate: updatePosition,
    });

    track.addEventListener("keyup", (e) => {
      const id = e.target.getAttribute("href");

      if (!id || e.key !== "Tab") return;

      const section = document.querySelector(id);

      const y = section.getBoundingClientRect().top + window.scrollY;

      st.scroll(y);
    });
  }, []);
}
