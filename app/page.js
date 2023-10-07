"use client";
import { useEffect } from "react";
import Navigation from "./component/Nav/Navigation";
import { SECTIONS_DATA } from "./data/sections/sections.data";
import useScrollContentAnimation from "./hooks/useScrollContentAnimation";

export default function Home() {
  useScrollContentAnimation();

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
