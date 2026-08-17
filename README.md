# Portfolio Interactivo con Terminal

Portfolio web con interfaz de terminal: comandos reales, contenido tipado y un artefacto que demuestra craft de ingeniería fullstack.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-bundler-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=astro,react,ts,tailwind,vite,pnpm" alt="Astro, React, TypeScript, Tailwind CSS, Vite, pnpm" />
  </a>
</p>

## Índice

- [Tecnologías](#tecnologías)
- [Características](#características)
- [Comandos disponibles](#comandos-disponibles)
- [Requisitos](#requisitos)
- [Inicio rápido](#inicio-rápido)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts](#scripts)
- [Contenido](#contenido)
- [Temas](#temas)
- [Documentación de diseño](#documentación-de-diseño)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Tecnologías

| Capa | Stack |
| ---- | ----- |
| Framework | [Astro 7](https://astro.build/) (static-first, islands) |
| UI interactiva | [React 19](https://react.dev/) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) (strict) |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com/) |
| Contenido | Astro Content Collections + Zod (`astro:content`) |
| Build | Vite (via Astro) |
| Tests | [Vitest](https://vitest.dev/) + Testing Library |
| Gestor de paquetes | [pnpm](https://pnpm.io/) 11 |

## Características

- Terminal interactiva con autocompletado (`Tab`), sugerencias y historial (flechas)
- Content Collections con validación Zod y type-safety de extremo a extremo
- Cuatro temas conmutables; preferencia en `localStorage`
- Efecto Matrix Rain (`/rain`; salir con `Ctrl+C`)
- Secciones de perfil, AI engineering, GitHub y certificaciones
- Fallback móvil con aviso desktop-first
- Terminal renderizada desde el servidor y tema aplicado antes de la hidratación (sin FOUC de tema)
- Suite de tests unitarios/componentes con Vitest

## Comandos disponibles

| Comando | Descripción |
| ------- | ----------- |
| `/home` | Página de inicio |
| `/experience` | Experiencia laboral |
| `/projects` | Proyectos destacados |
| `/skills` | Habilidades técnicas |
| `/profile` | Perfil y forma de trabajo |
| `/ai` | Práctica de AI Engineering |
| `/github` | Actividad reciente en GitHub |
| `/certifications` | Certificaciones |
| `/contact` | Datos de contacto |
| `/cv` | Descarga del CV (PDF) |
| `/rain` | Activa la lluvia Matrix |
| `/help` | Ayuda de comandos |
| `/clear` | Limpia la terminal |

## Requisitos

- Node.js `>= 22.22.2`
- pnpm `>= 11.2.2`

## Inicio rápido

```bash
git clone https://github.com/PabloViniegra/portfolio-terminal.git
cd portfolio-terminal
pnpm install
pnpm dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Estructura del proyecto

```
/
├── public/
│   ├── cv/                 # CV en PDF
│   ├── fonts/              # Mona Sans (variable)
│   └── favicon.svg
├── src/
│   ├── commands/           # Resolución y sugerencias de comandos
│   ├── components/         # Terminal, input, secciones, temas
│   ├── constants/          # Comandos, temas, matrix
│   ├── content/            # JSON de Content Collections
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── profile/
│   │   ├── ai-engineering/
│   │   ├── github/
│   │   ├── certifications/
│   │   ├── contact/
│   │   ├── commands/
│   │   └── general/
│   ├── content.config.ts   # Schemas Zod de colecciones
│   ├── hooks/              # useTheme
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── types/
├── design-system/          # Tokens, temas y patrones UI
├── DESIGN.md
├── PRODUCT.md
├── test/
└── package.json
```

## Scripts

| Comando | Acción |
| ------- | ------ |
| `pnpm install` | Instalar dependencias |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build local |
| `pnpm test` | Vitest en modo watch |
| `pnpm test:run` | Ejecutar tests una vez |
| `pnpm typecheck` | Comprobación de tipos (`tsgo`) |
| `pnpm astro ...` | CLI de Astro |

## Contenido

El contenido editable vive en `src/content/*/data.json`. Los schemas están en `src/content.config.ts`.

Flujo típico:

1. Edita el JSON de la colección correspondiente
2. Guarda el archivo
3. El dev server recarga con validación Zod

Colecciones actuales: `experience`, `projects`, `skills`, `profile`, `ai-engineering`, `github`, `certifications`, `contact`, `commands`, `general`.

## Temas

Selector en la UI; la elección se persiste en `localStorage`:

| Tema | Notas |
| ---- | ----- |
| One Dark | Por defecto |
| Light | Variante clara |
| Ayu | Tema de acentos suaves |
| GitHub Dark | Estilo GitHub |

Definiciones y tokens: `design-system/themes/` y `src/constants/themes.ts`.

## Documentación de diseño

| Documento | Contenido |
| --------- | --------- |
| [PRODUCT.md](./PRODUCT.md) | Propósito, usuarios, principios de producto |
| [DESIGN.md](./DESIGN.md) | Lenguaje visual y decisiones de interfaz |
| [design-system/](./design-system/) | Tokens, temas, componentes y patrones |

## Contribuir

1. Fork del repositorio
2. Rama de trabajo: `git checkout -b feature/nombre`
3. Commit con mensaje convencional
4. Push y Pull Request

## Licencia

MIT. Ver [LICENSE](./LICENSE).

## Contacto

**Pablo Viniegra** — [@PabloViniegra](https://github.com/PabloViniegra)

- Email: pablovpmadrid@gmail.com
- LinkedIn: [pabloviniegra](https://linkedin.com/in/pabloviniegra)

<!-- graphify:start -->
## Graphify — AI Knowledge Graph

This project uses [Graphify](https://github.com/safishamsi/graphify) to generate a
queryable knowledge graph of the source code. AI coding assistants read the graph
instead of broad file searches, which reduces unnecessary reads and improves accuracy.

The graph is built locally in `graphify-out/` (git-ignored) and regenerates automatically
after each commit.

### Setup (once per machine)

Requires Python 3.12+.

```bash
pip install graphifyy
python -m graphify .
```

> **Windows note:** always use `python -m graphify`, never `graphify` directly — the
> executable may not be on PATH.

### Manual update

```bash
python -m graphify . --update
```

### Query the graph from your assistant

```
python -m graphify query "where is the projects store?"
python -m graphify path "ModuleA" "ModuleB"
python -m graphify explain "concept-name"
```
<!-- graphify:end -->
