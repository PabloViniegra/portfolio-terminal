import React from 'react';
import type { AiEngineeringItem } from '../../types/content';
import SectionHeader from './SectionHeader';

interface AiEngineeringSectionProps {
  aiEngineering: AiEngineeringItem;
}

const AiEngineeringSection: React.FC<AiEngineeringSectionProps> = ({ aiEngineering }) => (
  <div className="font-sans">
    <SectionHeader verb="inspect" args="ai-engineering" meta="en producción" />

    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-terminal-text">{aiEngineering.subtitle}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{aiEngineering.intro}</p>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{aiEngineering.positioning}</p>
        <dl className="mt-5 grid gap-4 md:grid-cols-3">
          {aiEngineering.metrics.map((metric) => (
            <div key={metric.label} className="border-t border-terminal-border/40 pt-3">
              <dt className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">{metric.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-terminal-text">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {aiEngineering.sections.map((section) => (
        <section key={section.title} className="border-t border-terminal-border/40 pt-5">
          <h3 className="text-base font-semibold text-terminal-text">{section.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{section.description}</p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs text-terminal-text-secondary">
            {section.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ))}

      <section className="border-t border-terminal-border/40 pt-5">
        <h3 className="text-base font-semibold text-terminal-text">Agent Skills</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">Skills que he escrito para que mis agentes trabajen con el mismo criterio que yo.</p>
        <div className="mt-4 space-y-4">
          {aiEngineering.agentSkills.map((skill) => (
            <article key={skill.name} className="border-t border-terminal-border/30 py-4 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h4 className="text-sm font-semibold text-terminal-text">{skill.name}</h4>
                <a href={skill.repository} target="_blank" rel="noopener noreferrer" className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-accent underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-terminal-accent/50">Repositorio ↗</a>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{skill.description}</p>
              <code className="mt-3 block overflow-x-auto rounded-lg border border-terminal-border/40 bg-terminal-bg-secondary/60 px-3 py-2 font-mono text-mono-xs text-terminal-text">{skill.install}</code>
            </article>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default AiEngineeringSection;
