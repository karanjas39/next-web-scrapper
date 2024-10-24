# Scrape360

Scrape360 is a web scraping API designed to extract review data from the Career360 website. You can scrape specific reviews like Academics, College Infrastructure, or Placements, filtered by college and review type, across multiple pages.

## Features

- Scrape reviews from Career360 website.
- Filter by `collegeId` and `reviewType`.
- Scrape multiple pages of reviews (up to 3 max).
- Secure API with authentication via an API key.

## Demo

Check out the live demo: [Scrape360](https://scrape360.vercel.app/)

## How to Use the API

To scrape reviews from the Career360 website, send a POST request to the following endpoint:

```bash
POST https://scrape360.vercel.app/api/scrape
```

### Request Payload

Send a JSON payload with the following fields:

```json
{
  "collegeId": "12345",
  "reviewType": "Academics",
  "maxPages": 3
}
```

- **collegeId**: The unique identifier for the college.
- **reviewType**: The type of review you're looking for (e.g., "Academics", "College Infrastructure", or "Placements").
- **maxPages**: (Optional) The maximum number of pages to scrape is 3. Defaults to 3.

### Example Response

```json
{
  "content": [
    "Review 1 text...",
    "Review 2 text..."
  ],
  "status": 200
}
```

### Authentication

Make sure to include the API key in the headers as:

```bash
"x-api-key": "YOUR_API_KEY"
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/karanjas39/scrape360.git
cd scrape360
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables by creating a `.env` file. Contact me for to get your key:

```
API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Links

- **GitHub Repo**: [Scrape360 GitHub](https://github.com/karanjas39/scrape360)
- **Live Website**: [Scrape360 Website](https://scrape360.vercel.app/)
- **Contact Me**: [Jaskaran Singh on LinkedIn](https://www.linkedin.com/in/singhjaskaran/)

## Contact

If you have any questions or feedback, feel free to reach out to me:

- Email: dhillonjaskaran4486@gmail.com
- LinkedIn: [Jaskaran Singh](https://www.linkedin.com/in/singhjaskaran/)
