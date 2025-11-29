# SA Personeel - Premium Recruitment Website

Ultra-premium Next.js web application voor SA Personeel Talent Solutions.

## Tech Stack

- **Next.js 14** - React framework met App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Premium animations
- **Cloudflare Pages** - Hosting & deployment

## Features

- Ultra-premium design met luxe animaties
- Responsive design voor alle devices
- Optimized images (WebP format)
- Form handling met FormSubmit.co
- Dynamic routing voor vacatures
- Premium typography (Playfair Display, Cinzel, Cormorant Garamond)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Cloudflare Pages Deployment

This project is configured for Cloudflare Pages deployment.

### Build Settings

- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Node version**: 20 (specified in `.nvmrc`)

### Environment Variables

No environment variables required for basic functionality.

### Deployment via Cloudflare Dashboard

1. Connect your GitHub repository to Cloudflare Pages
2. Select the repository: `dynique.nl/sa-personeel`
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node version: 20
4. Deploy!

### Deployment via Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=sa-personeel
```

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Homepage
│   ├── layout.tsx       # Root layout
│   ├── globals.css      # Global styles
│   ├── contact/         # Contact page
│   ├── overons/         # About us page
│   ├── sectoren/        # Sectors page
│   ├── talenten/        # For talents page
│   ├── vacatures/       # Vacancies listing
│   ├── vacature/        # Individual vacancy pages
│   └── werkgevers/      # For employers page
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Hero section
│   └── Loading.tsx      # Loading screen
├── data/                # Static data
│   └── vacatures.ts     # Vacancies data
├── public/              # Static assets
│   ├── hero.mp4         # Hero video
│   ├── *.webp           # Optimized images
│   └── icon.png         # Favicon
└── package.json         # Dependencies

```

## Performance Optimizations

- WebP image format for all images
- Lazy loading for images and videos
- Optimized video loading with IntersectionObserver
- GPU-accelerated animations
- Code splitting with Next.js
- Static generation where possible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - SA Personeel Talent Solutions
