# Portfolio Interactivo con Terminal

¡Bienvenido a mi portfolio interactivo con temática de terminal! Este proyecto es una aplicación web moderna construida con Astro, React y TypeScript que simula una terminal de comandos para mostrar mi información profesional y proyectos de una manera única y atractiva.

## 🚀 Características

- **Interfaz de terminal interactiva** con autocompletado de comandos
- **Tema oscuro/ligero** con conmutador integrado
- **Efecto de lluvia de Matrix** (activable con el comando `/rain`)
- **Navegación por historial** de comandos con las teclas de flecha

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

- [Astro](https://astro.build/) - El framework web todo en uno
- [React](https://reactjs.org/) - Biblioteca de JavaScript para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - JavaScript tipado estáticamente
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
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
│   ├── assets/          # Imágenes y fuentes
│   ├── components/      # Componentes React/TSX
│   │   ├── CommandInput.tsx  # Entrada de comandos
│   │   ├── MatrixRain.tsx    # Efecto de lluvia de Matrix
│   │   ├── SectionOutput.tsx # Salida de secciones
│   │   └── ...
│   ├── layouts/         # Plantillas de diseño
│   └── pages/           # Páginas de la aplicación
└── package.json         # Dependencias y scripts
```

## 🧪 Comandos Disponibles

| Comando          | Acción                                    |
| ---------------- | ----------------------------------------- |
| `pnpm install`   | Instalar dependencias                     |
| `pnpm dev`       | Iniciar servidor de desarrollo            |
| `pnpm build`     | Construir para producción                 |
| `pnpm preview`   | Vista previa de la compilación localmente |
| `pnpm astro ...` | Comandos de la CLI de Astro               |

## 🌟 Características Especiales

### Efecto de Lluvia de Matrix

Activa el efecto de lluvia de Matrix escribiendo `/rain` en la terminal. Puedes desactivarlo presionando `Ctrl+C`.

### Navegación por Historial

- Usa las teclas de flecha arriba/abajo para navegar por el historial de comandos.
- Presiona `Tab` para autocompletar comandos.

### Temas

Cambia entre varios temas con el selector de temas. La preferencia se guarda localmente.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- Diseño inspirado en terminales Unix/Linux
- Efecto de lluvia de Matrix inspirado en la película "The Matrix"
- Desarrollado con ❤️ por Pablo Viniegra

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
