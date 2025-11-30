# Cloudflare Pages Setup Instructies

## Build Settings voor Cloudflare Pages

Bij het aanmaken van een nieuwe deployment in Cloudflare Pages, vul de volgende instellingen in:

### Framework Preset
Selecteer: **Next.js**

### Build Configuratie

**Build command:**
```
npm run build
```

**Build output directory:**
```
.next
```

**BELANGRIJK:** 
- Als je de **Next.js** framework preset gebruikt, laat de build output directory **LEEG** - Cloudflare Pages detecteert dit automatisch
- Als je handmatig een directory moet opgeven, gebruik dan `.next`
- De `wrangler.toml` file bevat al `pages_build_output_dir = ".next"` voor automatische detectie

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

## Na Deployment

### Waar vind je je website URL?

1. Ga naar je **Cloudflare Dashboard**
2. Klik op **Pages** in het linkermenu
3. Klik op je project: **sa-personeel**
4. Je ziet nu de **Production** deployment
5. De URL staat bovenaan: `https://sa-personeel-XXXXX.pages.dev`

### Deployment Status

- **Building**: Deployment is bezig (kan 2-5 minuten duren)
- **Success**: Deployment is klaar, website is live
- **Failed**: Er is een fout opgetreden, check de logs

### Website is nog niet bereikbaar?

1. **Wacht 2-3 minuten** - De eerste deployment kan langer duren
2. **Check de deployment status** - Zorg dat deze op "Success" staat
3. **Refresh de pagina** - Soms moet je de browser cache legen
4. **Check de logs** - Als er errors zijn, zie je deze in de deployment logs

### Custom Domain Toevoegen

Na de eerste deployment kun je een custom domain toevoegen:
1. Ga naar je project in Cloudflare Pages
2. Klik op **Custom domains** tab
3. Klik op **Set up a custom domain**
4. Voer je domain in (bijv. `sapersoneel.nl`)
5. Volg de DNS instructies

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

