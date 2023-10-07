import { NAV_DATA } from "@/app/data/nav/nav-data";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Draggable from "gsap/dist/Draggable";
import { useEffect } from "react";
import { useScrollAnimaton } from "@/app/hooks/useScrollAnimation";
import { SECTIONS_DATA } from "@/app/data/sections/sections.data";

export default function Navigation() {
  useEffect(() => {
    useScrollAnimaton();
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-50">
      <div className="marker fixed top-[1.75rem] left-[4rem] w-[1rem] h-[1rem]" />
      <div className="nav-track font-lobster relative h-[6rem]" data-draggable>
        <ul className="nav-list p-0 m-0 flex justify-between">
          {NAV_DATA.map((item, index) => (
            <li key={index}>
              <Link
                href={`#${SECTIONS_DATA[index].title}`}
                className="nav-link"
                data-link
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
