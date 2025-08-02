# Guitar Shop - Apollo Client Application

A 3-page guitar shop application built with React, TypeScript, and Apollo Client.

## Features

- **Page 1**: Guitar Brands listing with navigation
- **Page 2**: Guitar Models with search, filtering, and pagination
- **Page 3**: Guitar Details with specifications and musicians tabs
- **Language Support**: English and Albanian
- **Responsive Design**: Works on all device sizes
- **Apollo Client**: GraphQL data fetching with loading/error states

## Tech Stack

- React 18
- TypeScript
- Apollo Client
- GraphQL
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- React Router DOM

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd guitar-shop
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable components (Layout, LoadingSpinner, ErrorMessage)
├── pages/             # Main page components (Brands, Models, GuitarDetails)
├── apollo/            # GraphQL queries and client setup
└── context/           # Language context
...

