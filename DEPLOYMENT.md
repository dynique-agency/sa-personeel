# Cloudflare Pages Deployment Checklist

## ✅ Pre-Deployment Checklist

### Required Files
- [x] `package.json` - Dependencies and scripts
- [x] `next.config.mjs` - Next.js configuration
- [x] `tsconfig.json` - TypeScript configuration
- [x] `tailwind.config.ts` - Tailwind CSS configuration
- [x] `postcss.config.mjs` - PostCSS configuration
- [x] `.gitignore` - Git ignore rules
- [x] `.nvmrc` - Node version specification
- [x] `wrangler.toml` - Cloudflare configuration
- [x] `README.md` - Project documentation

### Source Files
- [x] `app/` - All Next.js pages and layouts
- [x] `components/` - All React components
- [x] `data/` - Static data files
- [x] `public/` - All static assets (images, videos, icons)

### Build Configuration
- [x] Build command: `npm run build`
- [x] Build output: `.next`
- [x] Node version: 20 (via .nvmrc)

## 🚀 Deployment Steps

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SA Personeel website"
   ```

2. **Create GitHub Repository**
   - Repository name: `sa-personeel` (or as specified)
   - Account: `dynique.nl`
   - Make it private if needed

3. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/dynique.nl/sa-personeel.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Cloudflare Pages**
   - Go to Cloudflare Dashboard
   - Navigate to Pages
   - Connect to GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `.next`
     - Root directory: `/`
     - Node version: 20
   - Deploy!

## 📝 Notes

- All original PNG files are ignored (only WebP versions in public/)
- Video files (hero.mp4) are included in public/
- No environment variables required
- Form submissions go to FormSubmit.co (no backend needed)

