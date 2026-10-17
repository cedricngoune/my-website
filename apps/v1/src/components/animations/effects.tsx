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
    const startFrame = requestAnimationFrame(() =>
      hero?.classList.add("is-ready"),
    );

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

    // Lien actif du menu : la section active est la dernière dont le haut a
    // dépassé le tiers supérieur de l'écran. Tout en bas de la page, c'est la
    // dernière section (Contact), même si elle est trop courte pour remonter.
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav] a"),
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    ).filter((section) => links.some((link) => link.hash === `#${section.id}`));

    const setActiveLink = (id: string | undefined) => {
      links.forEach((link) => {
        if (id && link.hash === `#${id}`) link.dataset.active = "true";
        else delete link.dataset.active;
      });
    };

    const updateActiveLink = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveLink(sections.at(-1)?.id);
        return;
      }
      const threshold = window.innerHeight / 3;
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= threshold)
        .at(-1);
      setActiveLink(current?.id);
    };

    // Au clic, le lien s'allume tout de suite, sans attendre la fin du défilement
    const onLinkClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      setActiveLink(link.hash.slice(1));
    };
    links.forEach((link) => link.addEventListener("click", onLinkClick));

    const header = document.querySelector<HTMLElement>("header[data-header]");
    // Hauteur réelle de l'en-tête, utilisée par scroll-padding-top (globals.css)
    const syncHeaderHeight = () => {
      if (header)
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`,
        );
    };
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    let scrollFrame = 0;
    const onScroll = () => {
      if (header)
        header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateActiveLink);
    };
    onScroll();
    updateActiveLink();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(startFrame);
      revealObserver.disconnect();
      cancelAnimationFrame(scrollFrame);
      links.forEach((link) => link.removeEventListener("click", onLinkClick));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  return null;
}
