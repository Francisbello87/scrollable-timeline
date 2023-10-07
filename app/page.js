"use client";
import { useEffect } from "react";
import Navigation from "./component/Nav/Navigation";
import { SECTIONS_DATA } from "./data/sections/sections.data";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray("section");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const initSectionAnimation = () => {
      if (prefersReducedMotion.matches) return;

      sections.forEach((section, index) => {
        const heading = section.querySelector("h2");
        const image = section.querySelector(".section-img");
        console.log(heading);

        gsap.set(heading, { opacity: 0, y: 50 });
        gsap.set(image, { opacity: 0, rotateY: 15 });

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => "top center",
            end: () => `+=${window.innerHeight}`,
            toggleActions: "play reverse play reverse",
          },
        });
        /* Add tweens to the timeline */
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
      });
    };
    initSectionAnimation();
  }, []);

  return (
    <div className="">
      <Navigation />
      <main className="mt-28">
        {SECTIONS_DATA.map((section, index) => {
          const { src, title, year, backgroundColor } = section;
          return (
            <section
              className=" flex items-center justify-center"
              id={section.title}
              key={index}
              style={{ backgroundColor: backgroundColor }}
            >
              <div className=" container grid md:grid-cols-2 grid-cols-1 w-full max-w-[80rem]">
                <h2 className="heading flex flex-col">
                  <span className=" text-base text-white">{year}</span>
                  <span className=" md:text-7xl text-2xl font-bold  whitespace-pre-wrap uppercase font-monte">
                    {title}
                  </span>
                </h2>
                <div className="section-img">
                  <img src={src} alt={section.title} />
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
