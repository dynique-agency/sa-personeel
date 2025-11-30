# Cloudflare Pages - FINALE Setup (Met Adapter)

## Belangrijk: Nieuwe Build Command

De applicatie gebruikt nu de officiële Cloudflare adapter voor Next.js. Dit betekent dat de **build command** anders is.

## Stap 1: Verwijder het oude project

1. Ga naar Cloudflare Dashboard → Pages
2. Klik op je project: **sa-personeel**
3. Ga naar **Settings** → **General**
4. Scroll naar beneden en klik op **Delete project**
5. Bevestig de verwijdering

## Stap 2: Maak een NIEUW project aan

1. Ga naar **Cloudflare Dashboard** → **Pages**
2. Klik op **Create a project**
3. Klik op **Connect to Git**
4. Selecteer je GitHub account en repository: **dynique-agency/sa-personeel**
5. Klik op **Begin setup**

## Stap 3: Configureer de Build Settings

### Framework Preset
Selecteer: **Next.js** (of laat leeg)

### Build Configuratie

**Build command:**
```
npm run build && npm run pages:build
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory (optional):**
```
(LAAT LEEG)
```

### Environment Variables
Geen environment variables nodig.

### Advanced Settings

**Node.js Version:**
```
20
```
(Of laat leeg - wordt automatisch opgepikt uit `.nvmrc`)

## Stap 4: Deploy

1. Klik op **Save and Deploy**
2. Wacht 3-5 minuten tot de deployment klaar is (eerste build duurt langer)
3. Je website is live op: `https://sa-personeel-XXXXX.pages.dev`

## Wat is er veranderd?

- **Next.js geüpgraded** naar versie 15.5.2 (compatibel met adapter)
- **@cloudflare/next-on-pages adapter** geïnstalleerd
- **Build command aangepast** naar: `npm run build && npm run pages:build`
- **Build output directory** is nu: `.vercel/output/static`
- **wrangler.toml** geconfigureerd met `pages_build_output_dir`

## Troubleshooting

Als de deployment faalt:
- Controleer of de Node.js versie 20 is
- Controleer of alle dependencies zijn geïnstalleerd
- Check de build logs voor specifieke errors
- Zorg dat de build command exact is: `npm run build && npm run pages:build`

Als de website nog steeds "Page can't be found" toont:
- Wacht 3-5 minuten na een succesvolle deployment (eerste build duurt langer)
- Refresh de pagina met Ctrl+Shift+R (of Cmd+Shift+R op Mac)
- Check of de deployment status op "Success" staat
- Controleer of de build output directory correct is ingesteld op `.vercel/output/static`

