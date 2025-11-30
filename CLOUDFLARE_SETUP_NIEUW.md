# Cloudflare Pages - NIEUWE Deployment Instructies

## Stap 1: Verwijder het oude project (optioneel)

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
Selecteer: **Next.js**

### Build Configuratie

**Build command:**
```
npm run build
```

**Build output directory:**
```
(LAAT LEEG - Cloudflare detecteert dit automatisch met Next.js preset)
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
2. Wacht 2-3 minuten tot de deployment klaar is
3. Je website is live op: `https://sa-personeel-XXXXX.pages.dev`

## Belangrijk

- **Gebruik de Next.js preset** - Dit is cruciaal!
- **Laat de build output directory LEEG** - Cloudflare detecteert dit automatisch
- De website gebruikt server-side rendering voor dynamische routes
- Alle images zijn geoptimaliseerd als WebP
- Forms gebruiken FormSubmit.co (geen backend nodig)

## Troubleshooting

Als de deployment faalt:
- Controleer of de Node.js versie 20 is
- Controleer of alle dependencies zijn geïnstalleerd
- Check de build logs voor specifieke errors

Als de website nog steeds "Page can't be found" toont:
- Wacht 2-3 minuten na een succesvolle deployment
- Refresh de pagina met Ctrl+Shift+R (of Cmd+Shift+R op Mac)
- Check of de deployment status op "Success" staat

