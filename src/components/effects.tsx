"use client";

import { useEffect } from "react";

/**
 * Trois comportements, aucun rendu :
 *  - apparition des sections marqués [data-apparition]
 *  - levée des lignes du titre au chargement
 *  - lien de navigation actif et filet sous l'en-tête au défilement
 */
export function Effects() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const hero = document.getElementById("accueil");
    const startFrame = requestAnimationFrame(() => hero?.classList.add("is-ready"));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => revealObserver.observe(element));

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav] a"),
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
        const current = sections.find((section) => section.classList.contains("is-active"));
        links.forEach((link) => {
          if (current && link.hash === `#${current.id}`)
            link.dataset.active = "true";
          else delete link.dataset.active;
        });
      },
      { rootMargin: "-20% 0px -62% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const header = document.querySelector<HTMLElement>("header[data-header]");
    const onScroll = () => {
      if (header) header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(startFrame);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
