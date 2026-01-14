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
 * Schema para la colección de habilidades blandas
 */
const softSkillsCollection = defineCollection({
  loader: file('src/content/skills/soft-skills.json'),
  schema: z.object({
    name: z.string(),
    rating: z.number().min(0).max(100),
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

export const collections = {
  experience: experienceCollection,
  projects: projectsCollection,
  skills: skillsCollection,
  'soft-skills': softSkillsCollection,
  contact: contactCollection,
  commands: commandsCollection,
  general: generalCollection,
};
