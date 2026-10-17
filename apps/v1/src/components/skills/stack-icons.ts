import {
  siDocker,
  siGitlab,
  siJest,
  siKubernetes,
  siMongodb,
  siMysql,
  siNestjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siRabbitmq,
  siReact,
  siReactquery,
  siScaleway,
  siStorybook,
  siSymfony,
  siTypescript,
  siVite,
  siVitest,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

export const stackIcons: Record<string, SimpleIcon> = {
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  Symfony: siSymfony,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  RabbitMQ: siRabbitmq,
  React: siReact,
  TypeScript: siTypescript,
  "React Query": siReactquery,
  Storybook: siStorybook,
  Docker: siDocker,
  "GitLab CI": siGitlab,
  Kubernetes: siKubernetes,
  "Vue.js": siVuedotjs,
  Vite: siVite,
  Vitest: siVitest,
  Jest: siJest,
  MySQL: siMysql,
  Scaleway: siScaleway,
};

/**
 * Technos sans logo dans simple-icons (AWS, « Event driven »…) :
 * la boule affiche un sigle à la place.
 */
export function stackAbbreviation(name: string) {
  if (name === "AWS") return "AWS";
  return name
    .split(/[\s.-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
