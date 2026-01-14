import React, { memo } from "react";

/**
 * Representa un item de conocimiento técnico
 * @interface KnowledgeItem
 * @property {string} name - Nombre de la tecnología o herramienta
 * @property {number} rating - Nivel de dominio (0-4)
 */
interface KnowledgeItem {
  name: string;
  rating: number;
}

/**
 * Representa una categoría de conocimientos técnicos
 * @interface KnowledgeCategory
 * @property {string} category - Nombre de la categoría
 * @property {KnowledgeItem[]} knowledges - Lista de conocimientos en esta categoría
 */
interface KnowledgeCategory {
  category: string;
  knowledges: KnowledgeItem[];
}

/**
 * Representa una habilidad blanda
 * @interface SoftSkill
 * @property {string} name - Nombre de la habilidad
 * @property {number} rating - Nivel de dominio (0-100)
 */
interface SoftSkill {
  name: string;
  rating: number;
}

/**
 * Props del componente SkillsSection
 * @interface SkillsSectionProps
 * @property {KnowledgeCategory[]} knowledgeCategories - Categorías de habilidades técnicas
 * @property {SoftSkill[]} softSkills - Lista de habilidades blandas
 */
interface SkillsSectionProps {
  knowledgeCategories: KnowledgeCategory[];
  softSkills: SoftSkill[];
}

/**
 * Componente memoizado para renderizar un item de conocimiento técnico
 */
const SkillItem = memo(({ skill, maxRating = 4 }: { skill: KnowledgeItem; maxRating?: number }) => {
  const renderRatingStars = (rating: number, maxRating: number = 4) => {
    const percentage = (rating / maxRating) * 100;
    
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(maxRating)].map((_, i) => {
            const filled = i < Math.floor(rating);
            const partial = i === Math.floor(rating) && rating % 1 !== 0;
            
            return (
              <div key={i} className="relative w-4 h-4">
                {filled ? (
                  <svg className="w-4 h-4 text-terminal-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : partial ? (
                  <svg className="w-4 h-4 text-terminal-accent" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id={`half-${i}`}>
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="var(--terminal-border)" />
                      </linearGradient>
                    </defs>
                    <path fill={`url(#half-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-terminal-border" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-xs text-terminal-comment font-medium min-w-[3rem]">
          {rating.toFixed(1)}/4
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-terminal-bg-secondary/30 hover:bg-terminal-bg-secondary/50 border border-terminal-border/30 hover:border-terminal-accent/30 transition-all duration-200">
      <span className="text-terminal-text text-sm font-medium mr-4">
        {skill.name}
      </span>
      {renderRatingStars(skill.rating, maxRating)}
    </div>
  );
});

SkillItem.displayName = 'SkillItem';

/**
 * Componente memoizado para renderizar una habilidad blanda
 */
const SoftSkillItem = memo(({ skill }: { skill: SoftSkill }) => {
  const getSkillLevel = (rating: number): { label: string; color: string } => {
    if (rating >= 80) return { label: "Experto", color: "text-green-400" };
    if (rating >= 60) return { label: "Avanzado", color: "text-blue-400" };
    if (rating >= 40) return { label: "Intermedio", color: "text-yellow-400" };
    return { label: "Básico", color: "text-orange-400" };
  };

  const level = getSkillLevel(skill.rating);

  return (
    <div className="group p-4 rounded-lg bg-terminal-bg-secondary/30 hover:bg-terminal-bg-secondary/50 border border-terminal-border/30 hover:border-terminal-accent/30 transition-all duration-200">
      <div className="flex justify-between items-center mb-3">
        <span className="text-terminal-text text-sm font-medium">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${level.color}`}>
            {level.label}
          </span>
          <span className="text-xs text-terminal-comment font-mono">
            {skill.rating}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border/50">
          <div
            className="h-full bg-gradient-to-r from-terminal-accent via-terminal-accent to-terminal-accent/70 rounded-full transition-all duration-700 ease-out relative"
            style={{
              width: `${skill.rating}%`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

SoftSkillItem.displayName = 'SoftSkillItem';

/**
 * Componente que muestra la sección de habilidades técnicas y blandas
 * 
 * @component
 * @param {SkillsSectionProps} props - Props del componente
 * @returns {JSX.Element} Sección de habilidades renderizada
 * 
 * @example
 * ```tsx
 * <SkillsSection 
 *   knowledgeCategories={categories}
 *   softSkills={softSkills}
 * />
 * ```
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ knowledgeCategories, softSkills }) => {
  return (
    <div className="font-mono">
      <div className="mb-6">
        <span className="text-terminal-prompt">$ </span>
        <span className="text-terminal-accent">cat</span>
        <span> habilidades.txt</span>
      </div>

      <div className="space-y-10">
        {/* Habilidades Técnicas */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-terminal-accent rounded-full"></div>
            <h3 className="text-terminal-accent font-bold text-xl">
              Habilidades Técnicas
            </h3>
          </div>
          
          <div className="space-y-8">
            {knowledgeCategories.map((category, catIdx) => (
              <div key={catIdx} className="group">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-terminal-comment text-xs">#</span>
                  <h4 className="text-terminal-text font-semibold text-base uppercase tracking-wide">
                    {category.category}
                  </h4>
                  <div className="flex-1 h-px bg-terminal-border ml-2"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-4">
                  {category.knowledges.map((skill, skillIdx) => (
                    <SkillItem key={skillIdx} skill={skill} maxRating={4} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Habilidades Blandas */}
        <div className="pt-8 border-t-2 border-terminal-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-terminal-accent rounded-full"></div>
            <h3 className="text-terminal-accent font-bold text-xl">
              Habilidades Blandas
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {softSkills.map((skill, idx) => (
              <SoftSkillItem key={idx} skill={skill} />
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="pt-6 border-t border-terminal-border/30">
          <div className="flex flex-wrap gap-4 text-xs text-terminal-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Experto (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span>Avanzado (60-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span>Intermedio (40-59%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <span>Básico (0-39%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
