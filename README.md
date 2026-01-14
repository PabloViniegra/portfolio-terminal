# Portfolio Interactivo con Terminal

¡Bienvenido a mi portfolio interactivo con temática de terminal! Este proyecto es una aplicación web moderna construida con Astro, React y TypeScript que simula una terminal de comandos para mostrar mi información profesional y proyectos de una manera única y atractiva.

## 🚀 Características

- **Interfaz de terminal interactiva** con autocompletado de comandos
- **Content Collections de Astro** para gestión de contenido estructurado
- **Validación de datos** con Zod schemas y type-safety completo
- **Tema oscuro/ligero** con conmutador integrado (4 temas disponibles)
- **Efecto de lluvia de Matrix** (activable con el comando `/rain`)
- **Navegación por historial** de comandos con las teclas de flecha
- **Contenido fácilmente editable** en archivos JSON

## 🖥️ Comandos Disponibles

| Comando       | Descripción                        |
| ------------- | ---------------------------------- |
| `/home`       | Ir a la página de inicio           |
| `/experience` | Ver experiencia laboral            |
| `/projects`   | Ver proyectos destacados           |
| `/skills`     | Ver habilidades técnicas           |
| `/contact`    | Información de contacto            |
| `/cv`         | Descargar mi CV                    |
| `/rain`       | Activar efecto de lluvia de Matrix |
| `/help`       | Mostrar esta ayuda                 |
| `/clear`      | Limpiar la terminal                |

## 🛠️ Tecnologías Utilizadas

- [Astro 5.11](https://astro.build/) - Framework web con Content Collections
- [React 19](https://reactjs.org/) - Biblioteca de JavaScript para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - JavaScript tipado estáticamente
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utility-first
- [Zod](https://zod.dev/) - Validación de schemas TypeScript-first
- [Vite](https://vitejs.dev/) - Herramienta de compilación y servidor de desarrollo

## 🚀 Cómo Empezar

### Requisitos Previos

- Node.js (v16 o superior)
- pnpm (recomendado) o npm/yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/portfolio-terminal.git
   cd portfolio-terminal
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   # o
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:4321](http://localhost:4321)

## 🏗️ Estructura del Proyecto

```
/
├── public/               # Archivos estáticos
│   └── cv/              # Archivos de CV para descargar
├── src/
│   ├── content/         # 🆕 Content Collections (JSON)
│   │   ├── experience/  # Experiencia laboral
│   │   ├── projects/    # Proyectos personales
│   │   ├── skills/      # Habilidades técnicas
│   │   ├── contact/     # Información de contacto
│   │   ├── commands/    # Comandos de terminal
│   │   └── general/     # Textos generales
│   ├── content.config.ts # 🆕 Configuración de colecciones
│   ├── assets/          # Imágenes y fuentes
│   ├── components/      # Componentes React/TSX
│   │   ├── CommandInput.tsx  # Entrada de comandos
│   │   ├── MatrixRain.tsx    # Efecto de lluvia de Matrix
│   │   ├── SectionOutput.tsx # Salida de secciones
│   │   └── sections/    # Componentes de sección
│   ├── layouts/         # Plantillas de diseño
│   └── pages/           # Páginas de la aplicación
├── docs/                # 🆕 Documentación completa
│   ├── README.md        # Índice de documentación
│   ├── QUICK-START-CONTENT.md    # Guía rápida
│   ├── CONTENT-COLLECTIONS.md   # Guía completa
│   ├── MIGRATION-GUIDE.md       # Guía de migración
│   └── CONTENT-STRUCTURE.md     # Estructura de contenido
└── package.json         # Dependencias y scripts
```

## 🧪 Comandos de Desarrollo

| Comando          | Acción                                    |
| ---------------- | ----------------------------------------- |
| `pnpm install`   | Instalar dependencias                     |
| `pnpm dev`       | Iniciar servidor de desarrollo            |
| `pnpm build`     | Construir para producción                 |
| `pnpm preview`   | Vista previa de la compilación localmente |
| `pnpm astro ...` | Comandos de la CLI de Astro               |

## 📝 Actualizar Contenido

### Opción 1: Edición Rápida (Recomendado)

1. Abre el archivo JSON correspondiente en `src/content/`
2. Edita el contenido siguiendo el formato existente
3. Guarda el archivo
4. El servidor recargará automáticamente

**[⚡ Ver guía rápida](./docs/QUICK-START-CONTENT.md)**

### Opción 2: Documentación Completa

Para entender la arquitectura completa:

**[📖 Documentación de Content Collections](./docs/CONTENT-COLLECTIONS.md)**

## 🌟 Características Especiales

### Content Collections

Todo el contenido está organizado en **Content Collections** de Astro:

- ✅ **Validación automática** con Zod schemas
- ✅ **Type-safety** completo con TypeScript
- ✅ **Fácil edición** en archivos JSON
- ✅ **Intellisense** en el editor

**[📖 Ver documentación completa](./docs/README.md)**

### Gestión de Contenido

Actualiza fácilmente:
- Experiencia laboral
- Proyectos personales
- Habilidades técnicas y blandas
- Información de contacto
- Comandos de terminal
- Textos generales

**[⚡ Guía rápida de edición](./docs/QUICK-START-CONTENT.md)**

### Efecto de Lluvia de Matrix

Activa el efecto de lluvia de Matrix escribiendo `/rain` en la terminal. Puedes desactivarlo presionando `Ctrl+C`.

### Navegación por Historial

- Usa las teclas de flecha arriba/abajo para navegar por el historial de comandos.
- Presiona `Tab` para autocompletar comandos.

### Temas

Cambia entre 4 temas disponibles con el selector de temas:
- One Dark (por defecto)
- Light
- Ayu
- GitHub Dark

La preferencia se guarda localmente en localStorage.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- Diseño inspirado en terminales Unix/Linux
- Efecto de lluvia de Matrix inspirado en la película "The Matrix"
- Desarrollado con ❤️ por Pablo Viniegra

## 📚 Documentación

- **[Índice de Documentación](./docs/README.md)** - Punto de partida
- **[Quick Start](./docs/QUICK-START-CONTENT.md)** - Edición rápida de contenido
- **[Content Collections](./docs/CONTENT-COLLECTIONS.md)** - Guía completa
- **[Migration Guide](./docs/MIGRATION-GUIDE.md)** - Cambios recientes
- **[Content Structure](./docs/CONTENT-STRUCTURE.md)** - Vista general

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Pablo Viniegra - [@PabloViniegra](https://github.com/PabloViniegra)

- Email: pablovpmadrid@gmail.com
- LinkedIn: [pabloviniegra](https://linkedin.com/in/pabloviniegra)

## 🌟 Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
