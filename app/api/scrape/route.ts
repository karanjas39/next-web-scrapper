import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const acceptedReviewTypes = [
  "Academics",
  "College Infrastructure",
  "Placements",
];

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API Key" },
      { status: 401 }
    );
  }

  try {
    const { collegeId, reviewType, maxPages = 3 } = await req.json();

    if (!collegeId || !reviewType) {
      return NextResponse.json(
        { error: "College ID and review type are required" },
        { status: 400 }
      );
    }

    if (!acceptedReviewTypes.includes(reviewType)) {
      return NextResponse.json(
        {
          error: `Review type should be one of these ${acceptedReviewTypes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    if (maxPages > 3) {
      return NextResponse.json(
        {
          error: "Max pages allowed are 3.",
        },
        { status: 400 }
      );
    }

    const baseUrl = `https://www.careers360.com/colleges/reviews`;
    const urls = Array.from(
      { length: maxPages },
      (_, i) => `${baseUrl}?page=${i + 1}&college_id=${collegeId}`
    );

    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.text())
          .catch((err) => null)
      )
    );

    const selectedReviews: string[] = [];

    responses.forEach((html) => {
      if (!html) return;

      const $ = cheerio.load(html);
      const reviews = $(".detail_content_review");

      reviews.each((i, el) => {
        const heading = $(el).find("h4").text().trim();
        if (heading === reviewType) {
          selectedReviews.push($(el).find("p").text().trim());
        }
      });
    });

    if (selectedReviews.length > 0) {
      return NextResponse.json({ content: selectedReviews }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `No reviews found for ${reviewType}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
