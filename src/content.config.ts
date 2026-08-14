import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Schema para la colección de experiencia laboral
 */
const experienceCollection = defineCollection({
  loader: file('src/content/experience/data.json'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    achievements: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    order: z.number().optional(),
  }),
});

/**
 * Schema para la colección de proyectos
 */
const projectsCollection = defineCollection({
  loader: file('src/content/projects/data.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    scope: z.string(),
    link: z.string().optional(),
    github: z.string(),
    technologies: z.array(z.string()),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

/**
 * Schema para la colección de habilidades técnicas
 */
const skillsCollection = defineCollection({
  loader: file('src/content/skills/data.json'),
  schema: z.object({
    category: z.string(),
    knowledges: z.array(
      z.object({
        name: z.string(),
        rating: z.number().min(0).max(4),
      })
    ),
    order: z.number().optional(),
  }),
});

/**
 * Schema para la colección de información de contacto
 */
const contactCollection = defineCollection({
  loader: file('src/content/contact/data.json'),
  schema: z.object({
    title: z.string(),
    content: z.string(),
    link: z.string(),
    icon: z.string().optional(),
    order: z.number().optional(),
  }),
});

/**
 * Schema para la colección de comandos disponibles
 */
const commandsCollection = defineCollection({
  loader: file('src/content/commands/data.json'),
  schema: z.object({
    command: z.string(),
    description: z.string(),
    category: z.enum(['navigation', 'info', 'utility', 'special']),
    aliases: z.array(z.string()).optional(),
    hint: z.string().optional(),
    order: z.number().optional(),
  }),
});

/**
 * Schema para la colección de mensajes generales (bienvenida, ayuda, etc.)
 */
const generalCollection = defineCollection({
  loader: file('src/content/general/data.json'),
  schema: z.object({
    key: z.string(),
    title: z.string().optional(),
    content: z.string(),
    metadata: z.record(z.string(), z.any()).optional(),
  }),
});

const profileCollection = defineCollection({
  loader: file('src/content/profile/data.json'),
  schema: z.object({
    role: z.string(),
    stack: z.array(z.string()),
    location: z.string(),
    status: z.string(),
    bio: z.string(),
    availability: z.string(),
    about: z.array(z.string()),
    principles: z.array(z.object({ label: z.string(), content: z.string() })),
    categories: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        groups: z.array(z.object({ title: z.string(), skills: z.array(z.string()) })),
      })
    ),
  }),
});

const aiEngineeringCollection = defineCollection({
  loader: file('src/content/ai-engineering/data.json'),
  schema: z.object({
    subtitle: z.string(),
    intro: z.string(),
    positioning: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })),
    sections: z.array(
      z.object({ title: z.string(), description: z.string(), items: z.array(z.string()) })
    ),
    agentSkills: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        install: z.string(),
        repository: z.string(),
      })
    ),
  }),
});

const certificationsCollection = defineCollection({
  loader: file('src/content/certifications/data.json'),
  schema: z.object({
    year: z.string(),
    title: z.string(),
    issuer: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

const githubCollection = defineCollection({
  loader: file('src/content/github/data.json'),
  schema: z.object({
    summary: z.string(),
    contributions: z.number(),
    period: z.string(),
    profileUrl: z.string().url(),
    months: z.array(z.object({ label: z.string(), contributions: z.number() })),
  }),
});

export const collections = {
  experience: experienceCollection,
  projects: projectsCollection,
  skills: skillsCollection,
  contact: contactCollection,
  commands: commandsCollection,
  general: generalCollection,
  profile: profileCollection,
  'ai-engineering': aiEngineeringCollection,
  certifications: certificationsCollection,
  github: githubCollection,
};
