# Midnight Media Studio

A modern, premium developer portfolio website built with Next.js 14, React, TypeScript, and Tailwind CSS.

**Website:** [studio.midnightclub.media](https://studio.midnightclub.media)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Docker

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Docker Deployment

### Build and run with Docker Compose:

```bash
docker-compose up -d --build
```

### Or build manually:

```bash
# Build the image
docker build -t midnight-media-studio .

# Run the container
docker run -p 3000:3000 midnight-media-studio
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── animations/      # Animation components
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── sections/        # Page sections
└── ...
```

## Features

- ✅ Fully responsive design
- ✅ Dark premium theme
- ✅ Smooth scroll animations with Framer Motion
- ✅ SEO optimized
- ✅ Production-ready Docker configuration
- ✅ Clean, modular component architecture

## Sections

1. **Hero** - Headline, subheadline, and CTAs
2. **Clients** - Client logos grid
3. **Projects** - Featured and additional projects
4. **Services** - Web development services
5. **Tech Stack** - Technology logos
6. **About** - Company and developer info
7. **Contact** - Contact form and information

## License

MIT License

---

Built with ❤️ by Midnight Media Studio
