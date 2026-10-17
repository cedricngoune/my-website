/**
 * Le contenu est désormais partagé entre la v1 et la v2 :
 * il vit dans packages/content/src/site.ts.
 * Ce fichier le ré-exporte pour que les imports de la v1 restent inchangés.
 */
export { sections, site } from "@portfolio/content";
