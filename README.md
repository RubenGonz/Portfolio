# 🌐 Portfolio — rubengonz.com

Portfolio personal **bilingüe (EN/ES)** con un **panel de administración propio** para
gestionar todo el contenido (proyectos, cursos, timeline, stack y textos del home)
sin tocar código. Construido desde cero para enseñar cómo pienso el código, no como
una plantilla.

🔗 **Live:** [www.rubengonz.com](https://www.rubengonz.com)

---

## 🚀 Stack

| Capa | Tecnología |
|------|------------|
| Framework | **Next.js 15** (App Router, Turbopack) · **React 19** · **TypeScript** |
| Estilos | **Tailwind CSS v4** (tokens semánticos en `globals.css`) |
| Base de datos | **PostgreSQL** (Neon) + **Prisma** |
| Auth | **Auth.js v5** (credenciales, sesión JWT) |
| i18n | **next-intl** (rutas `[locale]`, EN/ES) |
| Infra | **Vercel** — Blob (imágenes/CV), Analytics, Speed Insights |
| Email | **nodemailer** (formulario de contacto vía Gmail) |
| Tests | **Jest** + **Testing Library** |

---

## ✨ Características

- **Sitio público bilingüe** — home con secciones (hero, proyectos, sobre mí, cursos,
  stack, contacto), páginas de detalle de proyectos y cursos, listados con filtros y CV.
- **Panel de administración** protegido por sesión — CRUD completo de contenido con
  edición por idioma, subida de imágenes/CV a Vercel Blob y tablero drag-and-drop del stack.
- **i18n de verdad** — contenido traducible por entidad con fallback al idioma por defecto.
- **Tema claro/oscuro** con tokens CSS (sin variantes `dark:` en los componentes).
- **Animaciones** de entrada por scroll (IntersectionObserver) respetando `prefers-reduced-motion`.
- **SEO** — metadata por ruta, canonical + hreflang, OpenGraph/Twitter, imagen OG generada,
  `sitemap.xml`, `robots.txt` y datos estructurados JSON-LD.
- **Seguridad** — server actions con verificación de sesión, rate limiting (login y contacto),
  honeypot, headers de seguridad y validación de subidas.

---

## 🏗️ Arquitectura

```
src/
├─ app/
│  ├─ [locale]/          # sitio público (home, projects, courses, cv, páginas de error)
│  ├─ admin/             # CMS protegido (login + (protected)/… con CRUD)
│  ├─ api/               # contacto + Auth.js
│  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  └─ layout.tsx · globals.css
├─ components/
│  ├─ ui/                # primitivos del design system (Button, Tag, Section…)
│  ├─ layout/            # Header, Footer, Sidebar, ThemeSelector, LocaleSwitcher
│  ├─ sections/          # secciones del home
│  ├─ projects/ · courses/ · common/   # componentes por dominio
│  └─ admin/             # editores del panel
├─ data/                 # capa de acceso a datos por entidad:
│  └─ <entidad>/         #   index.ts (lecturas públicas)  ·  edit.ts (DTOs de admin)
├─ actions/              # server actions (mutaciones) — todas verifican sesión
├─ lib/                  # helpers sin acoplar al framework
│  └─ prisma · auth-guard · rate-limit · form · metadata
├─ i18n/                 # routing de next-intl + fuente única de locales
├─ types/                # tipos de dominio (view-models)
├─ config/               # config del sitio, navegación, fuentes
├─ hooks/                # useInView
└─ middleware.ts · auth.ts · auth.config.ts · navigation.ts

prisma/                  # schema, migraciones y seed
messages/                # en.json · es.json (textos de i18n)
```

Dos ideas clave de organización:

- **`data/` separa público de admin.** Cada entidad expone `index.ts` (lecturas del sitio)
  y `edit.ts` (DTOs y `getXForEdit` del panel), así las páginas públicas no arrastran el
  código de edición.
- **Una sola fuente de verdad para los locales** (`i18n/locales.ts`), de la que derivan
  next-intl, la capa de datos y el sitemap.

---

## ⚙️ Puesta en marcha

**Requisitos:** Node 20+ y una base de datos PostgreSQL (p. ej. [Neon](https://neon.tech)).

```bash
# 1. Instalar dependencias (genera el cliente de Prisma en postinstall)
npm install

# 2. Configurar variables de entorno
cp .env.example .env      # rellena los valores reales (ver abajo)

# 3. Aplicar el esquema y sembrar contenido de ejemplo
npm run db:migrate
npm run db:seed

# 4. Crear el usuario administrador
#    Requiere ADMIN_EMAIL y ADMIN_PASSWORD (mín. 10 caracteres) en .env
npm run db:create-admin

# 5. Arrancar en desarrollo
npm run dev               # http://localhost:3000
```

### Variables de entorno

Los valores reales van en `.env` (gitignored). Ver [`.env.example`](.env.example):

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio (en dev la fija `.env.development`) |
| `DATABASE_URL` / `DATABASE_URL_UNPOOLED` | Conexión Postgres — pooled (runtime) y sin pool (migraciones) |
| `AUTH_SECRET` | Secreto de firma de sesión — `openssl rand -base64 32` |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Cuenta Gmail del formulario de contacto ([app password](https://myaccount.google.com/apppasswords)) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credenciales del admin inicial — solo las lee `db:create-admin` (contraseña mín. 10 caracteres) |

> La subida de imágenes/CV usa **Vercel Blob**; en Vercel el token se inyecta con la
> integración. Para probar subidas en local añade `BLOB_READ_WRITE_TOKEN` a tu `.env`.

---

## 📜 Scripts

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Aplica migraciones y compila para producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm test` | Suite de tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con cobertura |
| `npm run db:migrate` | Migración de desarrollo (Prisma) |
| `npm run db:seed` | Siembra contenido de ejemplo |
| `npm run db:studio` | Prisma Studio |
| `npm run db:create-admin` | Crea el usuario administrador |

---

## 🧪 Testing

**159 tests** (Jest + Testing Library) cubriendo la lógica que no se ve a simple vista:

- **Server actions** — parseo de formularios, validación y CRUD de cada entidad.
- **Capa de datos** — mapeo Prisma → dominio y builders de edición (fallback por locale).
- **Helpers de `lib/`** — rate limiting, lectores de formularios, metadata de detalle.
- **Componentes** — `ProjectGallery`, `ErrorScreen`, `AnimateIn`, badges y botones.
- **API** — ruta de contacto (honeypot, rate limit, validación, envío).

```bash
npm test
```
