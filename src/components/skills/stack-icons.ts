import {
  siDocker,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siRabbitmq,
  siReact,
  siSymfony,
  siTypescript,
  siKubernetes,
  type SimpleIcon,
} from "simple-icons";

export const stackIcons: Record<string, SimpleIcon> = {
  "Node.js": siNodedotjs,
  Symfony: siSymfony,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  RabbitMQ: siRabbitmq,
  React: siReact,
  TypeScript: siTypescript,
  Docker: siDocker,
  Kubernetes: siKubernetes,
};
