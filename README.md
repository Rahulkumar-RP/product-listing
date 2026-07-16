# Product Listing App (Next.js + Bootstrap)

A responsive product listing page built with **Next.js**, **React**, and **Bootstrap 5**, using **Server-Side Rendering (SSR)** to fetch data from the [Fake Store API](https://fakestoreapi.com/products).

## Features

- ✅ SSR product listing via `getServerSideProps`
- ✅ Product cards: image, title, price, category, rating
- ✅ Responsive layout using Bootstrap grid (1 / 2 / 3 / 4 columns depending on screen size)
- ✅ Client-side search bar (debounced) to filter products by title
- ✅ Loading spinner shown while filtering
- ✅ Client-side pagination (8 products per page)
- ✅ Dynamic product details page (`/product/[id]`) with SSR
- ✅ Graceful error handling if the API call fails

## Tech Stack

- React.js
- Next.js 14 (Pages Router)
- Bootstrap 5
- Native Fetch API

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd product-listing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. Keep default settings (Next.js is auto-detected) and click **Deploy**.
4. Add the live URL to this README once deployed.

**Live demo:** _add your Vercel URL here after deploying_

## Project Structure

```
product-listing/
├── components/
│   └── ProductCard.js       # Reusable product card component
├── pages/
│   ├── _app.js               # Global app wrapper (imports Bootstrap CSS)
│   ├── index.js               # SSR product listing page (search + pagination)
│   └── product/
│       └── [id].js            # Dynamic product details page (SSR)
├── styles/
│   └── globals.css            # Custom styles on top of Bootstrap
├── next.config.js
├── package.json
└── README.md
```

## Assumptions

- Since the Fake Store API doesn't support server-side search or pagination, search and pagination are implemented **client-side** after the full product list is fetched via SSR on the homepage.
- The search bar is debounced (400ms) and shows a spinner during that window to simulate/demonstrate a loading state, as required by the assignment.
- Pagination is reset to page 1 whenever the search term changes.
- Product images are rendered with plain `<img>` tags (not `next/image`) to keep things simple and avoid extra image-domain configuration issues; `next.config.js` still whitelists `fakestoreapi.com` in case you want to switch to `next/image` later.
- No authentication, cart, or checkout functionality was implemented — out of scope per the assignment brief.
- TypeScript and unit tests were left out to meet the tight deadline; the codebase is small and can be migrated to TypeScript incrementally by renaming `.js` → `.tsx` and adding types.

## Possible Next Steps (if more time were available)

- Add TypeScript types for the API response.
- Add Jest + React Testing Library tests for `ProductCard` and the search/pagination logic.
- Add category-based filtering dropdown.
- Use `next/image` with proper responsive `sizes` for better performance.
