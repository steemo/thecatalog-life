# النسيج القرآني | Quranic Fabric

An interactive web application transforming traditional Quranic study materials into engaging visual content.

**Created by:** Tiko Abousteit  
**Date:** 22 February 2026

---

## Overview

This application presents Surah analysis through interactive charts, diagrams, and visual components instead of flat text files. Built with modern web technologies and designed with an Islamic aesthetic.

## Features

- ✅ Bilingual support (Arabic + English)
- ✅ Responsive design (mobile-first)
- ✅ Dark mode
- ✅ Search & filter Surahs
- ✅ Interactive visualisations
- ✅ Smooth animations
- ✅ RTL support for Arabic

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 18.x |
| Build Tool | Vite | 5.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Routing | React Router | 6.x |
| State | Zustand | 4.x |
| Icons | Lucide React | - |
| Animations | Framer Motion | 11.x |

## Project Structure

```
quranic-app/
├── src/
│   ├── features/          # Feature-based components
│   │   ├── home/         # Home page
│   │   ├── surah/        # Surah detail page
│   │   └── shared/       # Shared components
│   ├── data/             # JSON data files
│   ├── lib/              # Utilities & store
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── docs/
│   ├── architecture.md   # Architecture document
│   └── adr/             # Architecture Decision Records
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app runs on `http://localhost:5173` by default.

## Architecture

See [docs/architecture.md](docs/architecture.md) for detailed architecture documentation.

Key architectural decisions:
- [ADR-0001: React over Next.js](docs/adr/0001-react-over-nextjs.md)
- [ADR-0002: Tailwind CSS for Styling](docs/adr/0002-tailwind-styling.md)
- [ADR-0003: Zustand for State Management](docs/adr/0003-zustand-state.md)
- [ADR-0004: Prerendering for SEO](docs/adr/0004-prerender-seo.md)

## Deployment

### VPS Deployment

1. Build the application:
```bash
npm run build
```

2. Copy `dist/` folder to your VPS:
```bash
scp -r dist/* user@your-vps:/var/www/quranic-app/
```

3. Configure nginx:
```nginx
server {
    listen 80;
    server_name quran.yourdomain.com;
    root /var/www/quranic-app;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Content

Currently includes 3 Surahs:
- Al-Baqarah (The Cow)
- Aal-Imran (The Family of Imran)
- An-Nisa (The Women)

More Surahs will be added incrementally.

## Contributing

This is a personal project. If you'd like to contribute, please reach out.

## License

MIT License - See LICENSE file for details.

## Acknowledgements

- Content sourced from "النسيج القرآني" (Quranic Fabric) book
- Arabic fonts: Amiri, Noto Naskh Arabic
- English fonts: Inter

---

**Made with ♥ by Tiko Abousteit**
