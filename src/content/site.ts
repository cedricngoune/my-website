import { randomUUID } from "node:crypto";

export const sections = [
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "realisations", label: "Réalisations" },
  { id: "contact", label: "Contact" },
];

export const site = {
  fullname: "Cédric Ngouné",
  firstname: "Cédric",
  job: "Développeur full-stack",
  intro: "Hey, je suis Cédric",
  email: "gabyngoune@yahoo.fr",
  phone: "07 62 19 60 04",
  location: "Le Vésinet (78), Île-de-France",
  availability: "",

  photo: "/me.jpeg",
  initial: "CN",

  cv: "/cv.pdf",

  headline: "Ingénieur développeur web",

  figures: [
    { value: "05", legend: "années d’expérience" },
    { value: "04", legend: "plateformes livrées" },
    { value: "15+", legend: "technologies maîtrisées" },
    { value: "02", legend: "semaines par cycle de livraison" },
  ],

  tagline: [
    { text: "Ingénieur développeur web, je construis des" },
    { text: "API solides", accent: true },
    { text: "et des" },
    { text: "interfaces web modernes", accent: true },
    { text: "avec une sensibilité sur l'expérience utilisateur." },
  ],

  currentJob: {
    year: "2024",
    description: "Développeur full-stack, CDI",
    school: "ELPEV Group",
  },

  about: [
    "Ingénieur développeur web et passionné de nouvelles technologies, je travaille actuellement dans une agence de campagnes publicitaires destinées aux grands groupes. J'accorde une grande importance à la qualité d'un projet tant sur l'aspect UX, fonctionnel et technique.",
  ],

  // services: [
  //   {
  //     icon: "api" as const,
  //     title: "Création d’API robustes",
  //     description:
  //       "Une API que vos équipes utilisent sans documentation orale, et font évoluer sans tout casser six mois plus tard.",
  //     details: [
  //       "Conception des contrats REST et modélisation du domaine",
  //       "Architecture en couches, BFF ou services dédiés selon le besoin",
  //       "Authentification, droits d’accès et gestion explicite des erreurs",
  //       "Tests d’intégration et documentation maintenue avec le code",
  //     ],
  //   },
  //   {
  //     icon: "interface" as const,
  //     title: "Création d’interfaces modernes",
  //     description:
  //       "Des écrans rapides, accessibles et cohérents, construits sur un socle de composants réutilisable plutôt qu’au coup par coup.",
  //     details: [
  //       "Design system léger, documenté sous Storybook",
  //       "États de chargement, d’erreur et d’écran vide traités, pas oubliés",
  //       "Navigation clavier et contrastes vérifiés",
  //       "Rendu serveur, cache et images maîtrisés",
  //     ],
  //   },
  //   {
  //     icon: "bug" as const,
  //     title: "Correction de bugs et d’anomalies",
  //     description:
  //       "Un comportement inexpliqué en production, une régression que personne n’arrive à reproduire : je prends le sujet du diagnostic jusqu’au correctif.",
  //     details: [
  //       "Reproduction du problème et analyse des logs",
  //       "Correctif accompagné d’un test qui empêche le retour du bug",
  //       "Note écrite expliquant la cause, pas seulement la solution",
  //       "Reprise de code existant, même peu ou pas documenté",
  //     ],
  //   },
  // ],

  projects: [
    {
      id: randomUUID(),
      name: "CDI",
      client: "ELPEV Group — Nanotera",
      initials: "EG",
      period: "Depuis sept. 2024",
      role: "Développeur full-stack, CDI",
      summary:
        "Développement des nouvelles fonctionnalités : administration, configuration, gestion des commandes et paiement.",
      highlights: [
        "Migration d’une API GraphQL vers des services REST plus stables et plus simples à maintenir",
        "Architecture trois tiers, séparation nette entre présentation, métier et données",
        "Mise en production à chaque fin de sprint, avec démonstration",
      ],
      stack: [
        "React",
        "TypeScript",
        "NestJS",
        "Symfony",
        "PostgreSQL",
        "RabbitMQ",
        "Kubernetes",
      ],
    },
    {
      id: randomUUID(),
      name: "Consultant",
      client: "Reforest’Action",
      initials: "RA",
      period: "Mai – sept. 2024",
      role: "Développeur full-stack",
      summary:
        "Reprise d’un back-office difficile à utiliser et instable, refondu vers une interface plus directe pour les équipes internes.",
      highlights: [
        "Développement des fonctionnalités côté front, sur une base Vue.js",
        "Reprise de la conception du code et de sa documentation",
        "Mise en place des tests et de l’outillage de développement",
      ],
      stack: [
        "Vue.js",
        "Vite",
        "Vitest",
        "Node.js",
        "Prisma",
        "MongoDB",
        "Scaleway",
      ],
    },
    {
      id: randomUUID(),
      name: "Consultant",
      client: "Hermès",
      initials: "HM",
      period: "Mai 2023 – fév. 2024",
      role: "Développeur full-stack",
      summary:
        "Construction d’une plateforme de gestion de commandes partie de zéro, dans un système d’information existant et fortement cloisonné.",
      highlights: [
        "Création du back office'",
        "Création des APIs + système évenementiel entre les micros services, ",
        "Corrections de bugs, démos",
      ],
      stack: [
        "React",
        "TypeScript",
        "Jest",
        "Event driven",
        "MongoDB",
        "MySQL",
        "AWS",
      ],
    },
    {
      id: randomUUID(),
      name: "Consultant",
      client: "PMU",
      initials: "PM",
      period: "Avril 2022 – avril 2023",
      role: "Développeur front-end React",
      summary:
        "Migration et refonte graphique d’un module de la plateforme, sur un produit à fort trafic où chaque régression se voit immédiatement.",
      highlights: [
        "Migration du module vers React et TypeScript",
        "Correction des anomalies remontées en production",
        "Ateliers techniques et démonstrations auprès des équipes produit",
      ],
      stack: [
        "React",
        "TypeScript",
        "Jest",
        "Symfony",
        "MySQL",
        "Docker",
        "AWS",
      ],
    },
  ],

  stacks: [
    { name: "Node.js", initials: "JS", category: "Back-end" },
    { name: "NestJS", initials: "NS", category: "Back-end" },
    { name: "Symfony", initials: "SF", category: "Back-end" },
    { name: "PostgreSQL", initials: "PG", category: "Données" },
    { name: "MongoDB", initials: "MG", category: "Données" },
    { name: "Prisma", initials: "PR", category: "Données" },
    { name: "RabbitMQ", initials: "MQ", category: "Messagerie" },
    { name: "React", initials: "RC", category: "Front-end" },
    { name: "TypeScript", initials: "TS", category: "Front-end" },
    { name: "React Query", initials: "RQ", category: "Front-end" },
    { name: "Storybook", initials: "SB", category: "Front-end" },
    { name: "Docker", initials: "DK", category: "Infra" },
    { name: "GitLab CI", initials: "CI", category: "Infra" },
  ],

  schools: [
    {
      year: "2019 – 2020",
      description: "Mastère expert développement web",
      school: "Ynov Campus, Paris",
    },
    {
      year: "2018 – 2019",
      description: "Master 1 management des systèmes d’information",
      school: "3IL Academy, Limoges",
    },
    {
      year: "2017 – 2018",
      description: "Licence conception des systèmes d’information",
      school: "IUC, Douala",
    },
  ],

  certifications: ["Microservices"],
  languages: ["Français, langue maternelle", "Anglais, parlé et écrit"],

  links: {
    github: "https://github.com/votre-compte",
    linkedin: "https://www.linkedin.com/in/c%C3%A9dric-ngoun%C3%A9-4105bb172/",
  },
};
