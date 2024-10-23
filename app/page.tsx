function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-6">
      <p className="text-5xl font-bold mb-6">Scrape360</p>

      <div className="text-left bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">How to Use the API</h2>
        <p>
          To scrape reviews from the Career360 website, send a POST request to
          the following endpoint:
        </p>

        <div className="bg-black text-white p-4 rounded-lg my-4">
          <code>POST https://scrape360.vercel.app/api/scrape</code>
        </div>

        <p>The request should include the following JSON payload:</p>

        <div className="bg-gray-200 p-4 rounded-lg my-4">
          <code>
            collegeId: 12345, <br />
            reviewType: Academics, <br />
            maxPages: 3
          </code>
        </div>

        <p>Example response:</p>

        <div className="bg-gray-200 p-4 rounded-lg my-4">
          <code>
            content: [ <br />
            &nbsp;&nbsp;Review 1 text..., <br />
            &nbsp;&nbsp;Review 2 text... <br />
            ], <br />
            status: 200
          </code>
        </div>

        <p>Make sure to include the API key in the headers as:</p>

        <div className="bg-gray-200 p-4 rounded-lg my-4">
          <code>x-api-key: YOUR_API_KEY</code>
        </div>

        <h3 className="text-lg font-semibold mt-4">
          About the Request Fields:
        </h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>collegeId</strong>: The unique identifier for the college.
          </li>
          <li>
            <strong>reviewType</strong>: The type of review you&lsquo;re looking
            for (e.g., Academics, College Infrastructure, or Placements).
          </li>
          <li>
            <strong>maxPages</strong>: The maximum number of pages to scrape
            (optional, defaults to 3).
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
