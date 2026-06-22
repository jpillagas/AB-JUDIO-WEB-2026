# El Abogado Judio – Neuhauser Law

Sitio web profesional construido con **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP** y **Lenis** (smooth scroll). Diseño replicando y mejorando el sitio actual elabogadojudio.com con énfasis en SEO, velocidad y dinamismo.

## Páginas

- `/` Inicio
- `/nosotros` Nosotros (misión, visión y equipo)
- `/servicios` Servicios (USCIS + Corte de Inmigración)
- `/contacto` Contacto (formulario + mapa + FAQ + WhatsApp)
- `/blog` Blog (listado + artículo individual `/blog/[slug]`)
- API: `/api/contact` recibe el formulario de contacto

## Cómo correr el proyecto en tu máquina

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo (recarga automática)
npm run dev
# abre http://localhost:3000

# 3. Build de producción
npm run build
npm start
```

## Personalización rápida

Toda la información del despacho está centralizada en `lib/site.ts`:

- Teléfono, email, horarios, redes sociales
- Stats del hero (Abogados, Casos Ganados, etc.)
- Lista de servicios USCIS y Corte de Inmigración
- Equipo (16 personas)
- Testimonios

Cambias ahí y se actualiza en todas las páginas.

Las imágenes provisionales vienen de Unsplash. Para reemplazarlas con las reales:

1. Pon las imágenes en `public/imagenes/` (crea la carpeta).
2. Cambia los `backgroundImage: "url('https://...')"` por `url('/imagenes/foto.jpg')`.
3. En `next.config.mjs` ya están permitidos los dominios remotos por si las dejas externas.

## Despliegue recomendado: Vercel + Hostinger DNS

Como el dominio está en Hostinger pero Next.js corre mejor en Node.js, lo más limpio es:

### 1. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Sitio inicial Abogado Judio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/abogado-judio-web.git
git push -u origin main
```

### 2. Desplegar en Vercel

1. Entra a https://vercel.com y conecta tu cuenta de GitHub.
2. Importa el repositorio `abogado-judio-web`.
3. Vercel detecta Next.js automáticamente. Click "Deploy".
4. En 1–2 minutos tendrás una URL `nombre-proyecto.vercel.app`.

### 3. Apuntar el dominio elabogadojudio.com (Hostinger → Vercel)

En Vercel:

1. Ve a **Project Settings → Domains** y agrega `elabogadojudio.com` y `www.elabogadojudio.com`.
2. Vercel te dará dos registros DNS:
   - **A record** `@` → `76.76.21.21`
   - **CNAME record** `www` → `cname.vercel-dns.com`

En Hostinger (panel hPanel):

1. Entra a **Dominios → DNS / Nameservers**.
2. Borra los registros A y CNAME existentes que apunten al hosting actual.
3. Agrega los dos registros que te dio Vercel.
4. Espera 10–60 minutos a que propague.

Listo: el dominio sigue gestionado por Hostinger pero el sitio se sirve desde Vercel.

## Alternativa: Hostinger 100% (export estático)

Si por alguna razón prefieres seguir todo en Hostinger:

1. Edita `next.config.mjs` y agrega `output: 'export'`.
2. Ejecuta `npm run build`. Se genera la carpeta `out/`.
3. Sube por FTP el contenido de `out/` a `public_html/` en Hostinger.

Limitaciones del modo export:

- No funciona la API `/api/contact` (mover a Formspree, Resend, EmailJS).
- El blog ya está pre-renderizado, así que sigue funcionando.

## Pendientes / mejoras opcionales

- [ ] Reemplazar imágenes de Unsplash por fotos reales del despacho (equipo, oficinas).
- [ ] Conectar `/api/contact` con Resend o SendGrid (variable de entorno `RESEND_API_KEY`).
- [ ] Agregar reCAPTCHA v3 al formulario para evitar spam.
- [ ] Conectar un CMS (Sanity, Contentful) si quieren editar el blog desde un panel.
- [ ] Embebido real de Google Maps con la dirección exacta (ahora apunta a "Brooklyn, New York" genérico).
- [ ] Agregar página individual por servicio (`/servicios/visa-u`, `/servicios/asilo`, etc.) — la estructura ya está lista.
- [ ] Verificar Open Graph / metadata por página para SEO redes sociales.

## Estructura del proyecto

```
app/
  layout.tsx           Layout raíz (header, footer, fuentes, smooth scroll)
  globals.css          Estilos globales y utilidades de Tailwind
  page.tsx             Inicio
  nosotros/page.tsx    Nosotros
  servicios/page.tsx   Servicios
  contacto/page.tsx    Contacto
  blog/page.tsx        Listado de blog
  blog/[slug]/page.tsx Artículo individual
  api/contact/route.ts Endpoint del formulario
  not-found.tsx        404 personalizada
components/
  Header.tsx, Footer.tsx
  SmoothScroll.tsx, RevealOnScroll.tsx, WhatsAppFloat.tsx
  PageHero.tsx, ProgressBar.tsx, AnimatedCounter.tsx
  sections/
    HomeHero, HomeStats, HomeWhyUs, HomeServices, HomeTestimonials, HomeCTA
    AboutIntro, AboutQuote, AboutTeam
    ServicesIntro, ServicesUSCIS, ServicesCourt
    ContactBlock, ContactMap, ContactFAQ
lib/
  site.ts              Configuración global (datos del despacho, servicios, equipo)
  blog.ts              Posts de muestra
  utils.ts             Helper cn()
types/
  lucide-react.d.ts    Declaración de tipos para iconos
public/                Carpeta para imágenes propias del despacho
_referencias/          PDFs originales del sitio actual (no se publica)
```

## Stack y por qué cada cosa

- **Next.js 14 + App Router**: SSR/SSG, ideal para SEO local de un abogado.
- **TypeScript**: tipado fuerte, código más mantenible.
- **Tailwind CSS**: paleta personalizada (`ink`, `bone`, `gold`) que replica el look del despacho.
- **Framer Motion**: microinteracciones, fade-ins, transiciones del menú.
- **GSAP** (instalado, listo para usar): efectos de scroll cinematográficos cuando se quieran agregar.
- **Lenis**: scroll suave estilo agencia premium.
- **Lucide React**: librería de íconos limpios y consistentes.

---

Hecho con cuidado para la comunidad hispana en NY, NJ y CT.
