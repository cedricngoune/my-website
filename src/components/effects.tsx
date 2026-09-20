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
      (entrees, observateur) => {
        entrees.forEach((entree) => {
          if (!entree.isIntersecting) return;
          entree.target.classList.add("vu");
          observateur.unobserve(entree.target);
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
    const observateurSection = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          entree.target.classList.toggle("actif", entree.isIntersecting);
        });
        const current = blocs.find((bloc) => bloc.classList.contains("actif"));
        links.forEach((lien) => {
          if (current && lien.hash === `#${current.id}`)
            lien.dataset.actif = "true";
          else delete lien.dataset.actif;
        });
      },
      { rootMargin: "-20% 0px -62% 0px" },
    );
    blocs.forEach((bloc) => observateurSection.observe(bloc));

    const header = document.querySelector<HTMLElement>("header[data-header]");
    const auDefilement = () => {
      if (header) header.dataset.defile = window.scrollY > 8 ? "true" : "false";
    };
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });

    return () => {
      cancelAnimationFrame(lancer);
      observateurApparition.disconnect();
      observateurSection.disconnect();
      window.removeEventListener("scroll", auDefilement);
    };
  }, []);

  return null;
}
