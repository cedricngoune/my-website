export type SiteVersion = "v1" | "v2";

export const siteVersionUrls: Record<SiteVersion, string> = {
  v1: process.env.NEXT_PUBLIC_V1_URL ?? "https://www.cedricngoune.com",
  v2: process.env.NEXT_PUBLIC_V2_URL ?? "https://v2.cedricngoune.com",
};
