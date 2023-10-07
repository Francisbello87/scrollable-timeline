"use client";
import { useEffect } from "react";
import Navigation from "./component/Nav/Navigation";
import { SECTIONS_DATA } from "./data/sections/sections.data";
import useScrollContentAnimation from "./hooks/useScrollContentAnimation";

export default function Home() {
  useScrollContentAnimation();
  const bgColors = ["bg-blue-900", "bg-gray-100"];

  return (
    <div className="">
      <Navigation />
      <main className="mt-24">
        {SECTIONS_DATA.map((section, index) => {
          const { src, title, year } = section;
          const isEvenIndex = index % 2 === 0;
          const yearColor = isEvenIndex ? "text-gray-800" : "text-white";
          const bgColorClass = isEvenIndex
            ? "bg-gray-200 text-yellow-600"
            : "bg-blue-900 text-yellow-400";
          return (
            <section
              className={`flex items-center justify-center ${bgColorClass}`}
              id={section.title}
              key={index}
            >
              <div className=" container grid md:grid-cols-2 grid-cols-1 w-full max-w-[80rem]">
                <h2 className="heading flex flex-col">
                  <span className={`" text-base font-lobster " ${yearColor}`}>
                    {year}
                  </span>
                  <span className=" md:text-7xl text-2xl font-bold  whitespace-pre-line uppercase font-monte">
                    {title}
                  </span>
                </h2>
                <div className="section-img">
                  <img src={src} alt={section.title} className=" w-full" />
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
