import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://teoriainformatyk.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://teoriainformatyk.pl/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://teoriainformatyk.pl/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://teoriainformatyk.pl/search",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://teoriainformatyk.pl/one-question/inf02",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/one-question/inf03",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/exam/inf02",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/exam/inf03",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/flashcards/inf02",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/flashcards/inf03",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://teoriainformatyk.pl/sql-training",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const { data, error } = await supabase.from("questions").select("id, created_at");

  if (data === null) {
    console.error(
      "Supabase returned no question data during sitemap generation. Only static routes added."
    );
    return staticRoutes;
  }

  if (error !== null) {
    console.error(
      "Supabase returned an error during sitemap generation. Only static routes added. Error:",
      error
    );
    return staticRoutes;
  }

  const questionRoutes: MetadataRoute.Sitemap = data.map((question) => ({
    url: `https://teoriainformatyk.pl/question/${question.id}`,
    lastModified: question.created_at ? new Date(question.created_at) : new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...questionRoutes];
}
