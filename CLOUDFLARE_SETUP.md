# Cloudflare Pages Setup Instructies

## Build Settings voor Cloudflare Pages

Bij het aanmaken van een nieuwe deployment in Cloudflare Pages, vul de volgende instellingen in:

### Framework Preset
Selecteer: **Next.js**

### Build Configuratie

**Build command:**
```
npx @cloudflare/next-on-pages@1
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory (optional):**
```
/
```
(Of laat leeg)

### Environment Variables
Geen environment variables nodig.

### Advanced Settings

**Node.js Version:**
```
20
```
(Wordt automatisch opgepikt uit `.nvmrc` bestand)

## Deployment Stappen

1. Log in op [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Ga naar **Pages** in het linkermenu
3. Klik op **Create a project**
4. Klik op **Connect to Git**
5. Selecteer je GitHub account en repository: `dynique-agency/sa-personeel`
6. Klik op **Begin setup**
7. Vul de bovenstaande build settings in
8. Klik op **Save and Deploy**

## Belangrijk

- De website gebruikt **server-side rendering** voor dynamische routes zoals `/vacature/[id]`
- Alle images zijn geoptimaliseerd als WebP
- Video's worden lazy-loaded voor optimale performance
- Forms gebruiken FormSubmit.co (geen backend nodig)

## Custom Domain (Optioneel)

Na deployment kun je een custom domain toevoegen:
1. Ga naar je project in Cloudflare Pages
2. Klik op **Custom domains**
3. Voeg je domain toe (bijv. `sapersoneel.nl`)
4. Volg de DNS instructies

## Troubleshooting

Als de build failt:
- Controleer of de Node.js versie correct is (20)
- Controleer of alle dependencies zijn geïnstalleerd
- Check de build logs voor specifieke errors

De website zou binnen 2-3 minuten live moeten zijn!

