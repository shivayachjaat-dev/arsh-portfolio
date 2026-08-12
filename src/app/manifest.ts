import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arsh Shivayach — AI Automation Engineer",
    short_name: "Arsh Shivayach",
    description:
      "AI Automation Engineer & Senior Systems Engineer. Building AI-powered software systems, automation platforms, and developer tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/profile.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
