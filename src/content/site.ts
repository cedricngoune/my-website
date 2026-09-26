import { randomUUID } from "node:crypto";

export const sections = [
  { id: "profil", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "realisations", label: "Réalisations" },
  { id: "contact", label: "Contact" },
];

export const site = {
  fullname: "Cédric Ngouné",
  firstname: "Cédric",
  job: "Développeur full-stack",
  presentation: "Hey, je suis Cédric",
  email: "gabyngoune@yahoo.fr",
  telephone: "07 62 19 60 04",
  location: "Le Vésinet (78), Île-de-France",
  availability: "",

  // Déposez une photo dans /public et mettez son chemin ici, ex. "/photo.jpg".
  photo: "/me.jpeg",
  initial: "CN",

  // Déposez votre CV dans /public (ex. cv.pdf). Chaîne vide = le bouton disparaît.
  cv: "/cv.pdf",

  titre: "Ingénieur développeur web",

  figures: [
    { value: "05", legend: "années d’expérience" },
    { value: "04", legend: "plateformes livrées" },
    { value: "15+", legend: "technologies maîtrisées" },
    { value: "02", legend: "semaines par cycle de livraison" },
  ],

  about: [
    "Ingénieur développeur web et passionné de nouvelles technologies, je travaille actuellement dans une agence de campagne publicitaire destinées aux grands groupes.  j'accorde une grande importance à la qualité d'un projet tant sur l'aspect UX, fonctionnel et technique.",
    "Mon parcours et mes expériences professionnelles m'ont permis d'acquérir de bonnes pratiques et d'avoir le discernement pour faire les bons choix.",
    "Découvrez en plus sur mes réalisations d'entreprises et mon parcours académique.",
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
      sigle: "EG",
      period: "Depuis sept. 2024",
      role: "Développeur full-stack, CDI",
      resume:
        "Développement des nouvelles fonctionnalités : administration, configuration, gestion des commandes et paiement.",
      points: [
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
      sigle: "RA",
      period: "Mai – sept. 2024",
      role: "Développeur full-stack",
      resume:
        "Reprise d’un back-office difficile à utiliser et instable, refondu vers une interface plus directe pour les équipes internes.",
      points: [
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
      sigle: "HM",
      period: "Mai 2023 – fév. 2024",
      role: "Développeur full-stack",
      resume:
        "Construction d’une plateforme de gestion de commandes partie de zéro, dans un système d’information existant et fortement cloisonné.",
      points: [
        "Choix architectural d’un BFF pour rassembler les données transverses entre les services",
        "Évolution des API en place sans rupture pour leurs consommateurs",
        "Développement piloté par les événements, ateliers techniques et démonstrations",
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
      sigle: "PM",
      period: "Avril 2022 – avril 2023",
      role: "Développeur front-end React",
      resume:
        "Migration et refonte graphique d’un module de la plateforme, sur un produit à fort trafic où chaque régression se voit immédiatement.",
      points: [
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
    { name: "Node.js", sigle: "JS", category: "Back-end" },
    { name: "NestJS", sigle: "NS", category: "Back-end" },
    { name: "Symfony", sigle: "SF", category: "Back-end" },
    { name: "PostgreSQL", sigle: "PG", category: "Données" },
    { name: "MongoDB", sigle: "MG", category: "Données" },
    { name: "Prisma", sigle: "PR", category: "Données" },
    { name: "RabbitMQ", sigle: "MQ", category: "Messagerie" },
    { name: "React", sigle: "RC", category: "Front-end" },
    { name: "TypeScript", sigle: "TS", category: "Front-end" },
    { name: "React Query", sigle: "RQ", category: "Front-end" },
    { name: "Storybook", sigle: "SB", category: "Front-end" },
    { name: "Docker", sigle: "DK", category: "Infra" },
    { name: "GitLab CI", sigle: "CI", category: "Infra" },
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
  langages: ["Français, langue maternelle", "Anglais, parlé et écrit"],

  links: {
    github: "https://github.com/votre-compte",
    linkedin: "https://www.linkedin.com/in/c%C3%A9dric-ngoun%C3%A9-4105bb172/",
  },
};
