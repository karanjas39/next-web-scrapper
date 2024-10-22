import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url, selector } = await req.json();

    if (!url || !selector) {
      return NextResponse.json(
        { error: "URL and selector are required" },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const elements = $(selector);

    if (!elements.length) {
      return NextResponse.json(
        { error: "No element found for the given selector" },
        { status: 404 }
      );
    }

    const content = $(elements[0]).text().trim();

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
