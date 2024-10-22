"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [selector, setSelector] = useState<string>(""); // New input for selector
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScrapedData(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, selector }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to scrape");
      }

      if (data.content) {
        setScrapedData(data.content);
      } else {
        setError("No data found for the provided selector");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Web scrapper</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here (e.g., https://amazon.com)"
              className="flex-1 p-2 border rounded bg-black text-white"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="Enter selector (e.g., .price or #product-price)"
              className="flex-1 p-2 border rounded bg-black text-white"
              required
            />
            <button
              type="submit"
              disabled={loading || !url || !selector}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Scraping..." : "Scrape"}
            </button>
          </div>
        </form>

        {loading && <div className="mt-4 text-gray-600">Loading...</div>}

        {scrapedData && (
          <div className="mt-6 p-4 rounded">
            <h2 className="font-semibold">Scraped Content:</h2>
            <p className="mt-2">{scrapedData}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-500 rounded">{error}</div>
        )}
      </div>
    </main>
  );
}
