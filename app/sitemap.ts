import type { MetadataRoute } from "next";

const BASE = "https://infofis.vercel.app";

const ROUTES = [
  "",
  "/servicios",
  "/nosotros",
  "/precios",
  "/portfolio",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({ url: `${BASE}${route}`, lastModified }));
}
