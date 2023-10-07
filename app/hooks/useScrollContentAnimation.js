import { useEffect } from "react";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollContentAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray("section");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    gsap.set("body", { autoAlpha: 1 });
    const initSectionAnimation = () => {
      if (prefersReducedMotion.matches) return;

      sections.forEach((section, index) => {
        const heading = section.querySelector("h2");
        const image = section.querySelector(".section-img");

        gsap.set(heading, { opacity: 0, y: 50 });
        gsap.set(image, { opacity: 0, rotateY: 15 });

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: `+=${window.innerHeight}`,
            toggleActions: "play reverse play reverse",
          },
        });

        sectionTl
          .to(image, {
            opacity: 1,
            rotateY: -5,
            duration: 6,
            ease: "elastic",
          })
          .to(
            heading,
            {
              opacity: 1,
              y: 0,
              duration: 2,
            },
            0.5
          );

        // Cleanup function for the ScrollTrigger instance
        const sectionScrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: `+=${window.innerHeight}`,
          toggleActions: "play reverse play reverse",
        });

        // Destroy the ScrollTrigger instance when unmounting
        return () => {
          sectionScrollTrigger.kill();
        };
      });
    };

    initSectionAnimation();

    // Destroy all ScrollTrigger instances when unmounting the component
    return () => {
      sections.forEach((section) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.kill();
        });
      });
    };
  }, []);
}
