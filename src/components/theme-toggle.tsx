"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  // Le thème réel est posé sur <html> par le script d'amorçage, avant le rendu React.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function basculer() {
    const suivant: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = suivant;
    setTheme(suivant);
    try {
      localStorage.setItem("theme", suivant);
    } catch {
      // navigation privée : le choix ne sera pas mémorisé
    }
  }

  const sombre = theme === "dark";

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={sombre ? "Passer en thème clair" : "Passer en thème sombre"}
      title={sombre ? "Thème clair" : "Thème sombre"}
      className="relative grid h-9 w-9 place-items-center rounded-sm border border-bord text-sm transition-colors duration-200 hover:border-accent"
    >
      {/* L'icône montrée est celle du thème vers lequel on bascule. */}
      <span
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          sombre ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      >
        ☀️
      </span>
      <span
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          sombre ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      >
        🌙
      </span>
    </button>
  );
}
