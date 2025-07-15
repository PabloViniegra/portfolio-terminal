import React from "react";

interface KnowledgeItem {
  name: string;
  rating: number;
}

interface KnowledgeCategory {
  category: string;
  knowledges: KnowledgeItem[];
}

interface SoftSkill {
  name: string;
  rating: number;
}

const SkillsSection: React.FC = () => {
  const knowledgeCategories: KnowledgeCategory[] = [
    {
      category: "Backend",
      knowledges: [
        { name: ".NET", rating: 4 },
        { name: "Python", rating: 4 },
        { name: "Flask", rating: 4 },
        { name: "FastAPI", rating: 3 },
        { name: "Java", rating: 4 },
        { name: "Springboot", rating: 3 },
      ],
    },
    {
      category: "Frontend",
      knowledges: [
        { name: "Javascript", rating: 3 },
        { name: "Typescript", rating: 3 },
        { name: "HTML5", rating: 3 },
        { name: "CSS", rating: 2 },
        { name: "Tailwind CSS", rating: 3 },
        { name: "Vue JS", rating: 3 },
        { name: "Astro", rating: 2 },
        { name: "React", rating: 2 },
      ],
    },
    {
      category: "Herramientas",
      knowledges: [
        { name: "Git", rating: 3 },
        { name: "Docker", rating: 3 },
        { name: "Azure", rating: 3 },
      ],
    },
    {
      category: "Bases de Datos",
      knowledges: [
        { name: "SQL Server", rating: 2 },
        { name: "MySQL", rating: 3 },
        { name: "PostgreSQL", rating: 3 },
        { name: "MongoDB", rating: 2 },
      ],
    },
  ];

  const softSkills: SoftSkill[] = [
    {
      name: "Comunicación con el equipo",
      rating: 60,
    },
    {
      name: "Trabajo en equipo",
      rating: 50,
    },
    {
      name: "Adaptación al cambio",
      rating: 75,
    },
    {
      name: "Gestión del tiempo",
      rating: 55,
    },
    {
      name: "Responsabilidad",
      rating: 80,
    },
    {
      name: "Resolución de problemas",
      rating: 75,
    },
    {
      name: "Habilidades interpersonales",
      rating: 55,
    },
  ];

  const renderRatingBars = (rating: number, maxRating: number = 4) => {
    const fullBars = Math.floor(rating);
    const hasHalfBar = rating % 1 >= 0.5;
    const emptyBars = maxRating - fullBars - (hasHalfBar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullBars)].map((_, i) => (
          <div
            key={`full-${i}`}
            className="w-4 h-4 bg-terminal-accent rounded-sm flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-terminal-bg rounded-full"></div>
          </div>
        ))}
        {hasHalfBar && (
          <div className="w-4 h-4 relative">
            <div className="w-2 h-4 bg-terminal-accent absolute left-0 top-0 rounded-l-sm"></div>
            <div className="w-2 h-4 bg-terminal-bg-secondary absolute right-0 top-0 rounded-r-sm border-r border-t border-b border-terminal-border"></div>
          </div>
        )}
        {[...Array(emptyBars)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-4 h-4 bg-terminal-bg-secondary border border-terminal-border rounded-sm"
          ></div>
        ))}
        <span className="text-xs text-terminal-comment ml-1">
          {rating.toFixed(1)}/4
        </span>
      </div>
    );
  };

  return (
    <div className="font-mono">
      <div className="mb-4">
        <span className="text-terminal-prompt">$ </span>
        <span className="text-terminal-accent">cat</span>
        <span> habilidades.txt</span>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-terminal-accent font-bold mb-4">
            Habilidades Técnicas
          </h3>
          <div className="space-y-6">
            {knowledgeCategories.map((category, catIdx) => (
              <div
                key={catIdx}
                className="border-l-2 border-terminal-accent pl-4"
              >
                <h4 className="text-terminal-text font-semibold mb-2">
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {category.knowledges.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-terminal-text text-sm">
                        {skill.name}
                      </span>
                      {renderRatingBars(skill.rating, 4)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-terminal-border mt-6">
          <h3 className="text-terminal-accent font-bold mb-6 text-lg">
            Habilidades Blandas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {softSkills.map((skill, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-terminal-text text-sm font-medium">
                    {skill.name}
                  </span>
                  <span className="text-xs text-terminal-comment">
                    {skill.rating}%
                  </span>
                </div>
                <div className="w-full h-3 bg-terminal-bg-secondary rounded-full overflow-hidden border border-terminal-border">
                  <div
                    className="h-full bg-gradient-to-r from-terminal-accent to-terminal-accent/80 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${skill.rating}%`,
                      boxShadow: "0 0 6px rgba(99, 102, 241, 0.5)",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
