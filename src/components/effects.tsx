"use client";

import { useEffect } from "react";

/**
 * Trois comportements, aucun rendu :
 *  - apparition des blocs marqués [data-apparition]
 *  - levée des lignes du titre au chargement
 *  - lien de navigation actif et filet sous l'en-tête au défilement
 */
export function Effects() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const heros = document.getElementById("accueil");
    const lancer = requestAnimationFrame(() => heros?.classList.add("pret"));

    const observateurApparition = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vu");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-apparition]")
      .forEach((element) => observateurApparition.observe(element));

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav] a"),
    );
    const blocs = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    const observableSection = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          entree.target.classList.toggle("actif", entree.isIntersecting);
        });
        const current = blocs.find((bloc) => bloc.classList.contains("actif"));
        links.forEach((link) => {
          if (current && link.hash === `#${current.id}`)
            link.dataset.actif = "true";
          else delete link.dataset.actif;
        });
      },
      { rootMargin: "-20% 0px -62% 0px" },
    );
    blocs.forEach((bloc) => observableSection.observe(bloc));

    const header = document.querySelector<HTMLElement>("header[data-header]");
    const scrollAnimation = () => {
      if (header) header.dataset.defile = window.scrollY > 8 ? "true" : "false";
    };
    scrollAnimation();
    window.addEventListener("scroll", scrollAnimation, { passive: true });

    return () => {
      cancelAnimationFrame(lancer);
      observateurApparition.disconnect();
      observableSection.disconnect();
      window.removeEventListener("scroll", scrollAnimation);
    };
  }, []);

  return null;
}
