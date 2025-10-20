import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

// type NewsItem = {
//   title: string;
//   link: string;
//   pubDate: string;
//   contentSnippet: string;
//   source: string;
//   enclosure?: { url?: string };
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parser = new Parser();

  const feeds = [
    { url: "https://punchng.com/feed/", source: "Punch" },
    { url: "https://www.vanguardngr.com/feed/", source: "Vanguard" },
    { url: "https://guardian.ng/feed/", source: "Guardian" },
    { url: "https://www.premiumtimesng.com/feed", source: "Premium Times" },
  ];

  try {
    const allFeeds = await Promise.all(
      feeds.map(async ({ url, source }) => {
        try {
          const feed = await parser.parseURL(url);
          return (
            feed.items?.slice(0, 10).map((item) => ({
              title: item.title || "",
              link: item.link || "#",
              pubDate: item.pubDate || "",
              contentSnippet: item.contentSnippet || "",
              source,
              enclosure: item.enclosure,
            })) || []
          );
        } catch (err) {
          console.error(`❌ Error fetching ${source}:`, err);
          return [];
        }
      })
    );

    const items = allFeeds.flat().sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    res.status(200).json({ items });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Failed to fetch news feeds" });
  }
}
