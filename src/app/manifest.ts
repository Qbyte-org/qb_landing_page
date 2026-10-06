import type { MetadataRoute } from "next";
import { siteManifest } from "@/content/pages";

export default function manifest(): MetadataRoute.Manifest {
  return siteManifest;
}
