type Props = {
    section: 'home' | 'experience' | 'projects' | 'skills' | 'contact'
}

export default function SectionOutput({ section }: Props) {
    switch (section) {
        case "home":
          return (
            <div className="font-mono">
              <div className="mb-2">
                <span className="text-terminal-prompt">$ </span>
                <span className="text-terminal-accent">echo</span>
                <span> "¡Hola! Soy Pablo, fullstack developer"</span>
              </div>
              <div className="mb-4 text-terminal-text">
                ¡Hola! Soy Pablo, fullstack developer
              </div>
              
              <div className="mb-2">
                <span className="text-terminal-prompt">$ </span>
                <span className="text-terminal-accent">echo</span>
                <span> "Sobre mí:"</span>
              </div>
              <div className="mb-2 text-terminal-text">
                Apasionado por la tecnología y la resolución de problemas.
              </div>
              
              <div className="text-terminal-text-secondary italic text-sm mt-4">
                <span className="text-terminal-comment"># </span>
                "La programación es solo un medio, y el fin es solucionar tus problemas."
              </div>
            </div>
          );
        case "experience":
          return (
            <div>
              <h2 className="text-terminal-accent font-bold">Experiencia</h2>
              <ul className="pl-4 list-disc">
                <li>Empresa X (2022-Actual) – Backend Developer Node.js</li>
                <li>Empresa Y (2020-2022) – Fullstack Developer (JS, Python)</li>
              </ul>
            </div>
          );
        case "projects":
          return (
            <div>
              <h2 className="text-terminal-accent font-bold">Proyectos Destacados</h2>
              <ul className="pl-4 list-disc">
                <li>
                  <a className="underline text-terminal-accent" href="https://github.com/tuprojecto" target="_blank">Proyecto Awesome API</a>
                  <span> – API escalable en Node.js + PostgreSQL</span>
                </li>
                <li>
                  <a className="underline text-terminal-accent" href="https://github.com/tuprojecto" target="_blank">Panel Admin React</a>
                  <span> – Panel de administración modular</span>
                </li>
              </ul>
            </div>
          );
        case "skills":
          return (
            <div>
              <h2 className="text-terminal-accent font-bold">Skills Técnicos</h2>
              <ul className="pl-4 list-disc">
                <li>Node.js, Express, NestJS</li>
                <li>TypeScript, JavaScript (ES6+)</li>
                <li>SQL (Postgres, SQLite)</li>
                <li>Docker, CI/CD</li>
                <li>Astro, React, Vue</li>
              </ul>
            </div>
          );
        case "contact":
          return (
            <div>
              <h2 className="text-terminal-accent font-bold">Contacto</h2>
              <ul>
                <li>Email: <a className="underline" href="mailto:tuemail@mail.com">tuemail@mail.com</a></li>
                <li>LinkedIn: <a className="underline" href="https://linkedin.com/in/tuusuario" target="_blank">@tuusuario</a></li>
                <li>GitHub: <a className="underline" href="https://github.com/tuusuario" target="_blank">@tuusuario</a></li>
              </ul>
            </div>
          );
        default:
          return null;
      }
}