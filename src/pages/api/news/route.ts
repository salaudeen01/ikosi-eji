import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();
  const feeds = [
    { url: "https://punchng.com/feed/", source: "Punch" },
    { url: "https://www.vanguardngr.com/feed/", source: "Vanguard" },
  ];

  const allFeeds = await Promise.all(
    feeds.map(async ({ url, source }) => {
      const feed = await parser.parseURL(url);
      return (
        feed.items?.slice(0, 10).map((item) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          contentSnippet: item.contentSnippet,
          source,
        })) || []
      );
    })
  );

  const items = allFeeds.flat();
  return NextResponse.json({ items });
}
