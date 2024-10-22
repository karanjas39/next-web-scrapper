import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url, reviewType } = await req.json();

    if (!url || !reviewType) {
      return NextResponse.json(
        { error: "URL and review type are required" },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const reviews = $(".detail_content_review");

    if (!reviews.length) {
      return NextResponse.json({ error: "No reviews found" }, { status: 404 });
    }

    let selectedReviews: string[] = [];

    // Loop through all reviews to find all matches
    reviews.each((i, el) => {
      const heading = $(el).find("h4").text().trim();
      // Check if the heading matches the requested review type
      if (heading === reviewType) {
        selectedReviews.push($(el).find("p").text().trim());
      }
    });

    if (selectedReviews.length > 0) {
      return NextResponse.json({ content: selectedReviews }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `No review found for ${reviewType}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
