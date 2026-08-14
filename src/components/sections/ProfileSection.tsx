import React from 'react';
import SectionHeader from './SectionHeader';

interface ProfileSectionProps {
  profile: {
    role: string;
    stack: string[];
    location: string;
    status: string;
    bio: string;
    availability: string;
    about: string[];
    principles: { label: string; content: string }[];
    categories: {
      title: string;
      description: string;
      groups: { title: string; skills: string[] }[];
    }[];
  };
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => (
  <div className="font-sans">
    <SectionHeader verb="read" args="profile.md" meta={profile.status} />

    <div className="space-y-8">
      <section>
        <p className="max-w-3xl text-base font-semibold leading-7 text-terminal-text">{profile.bio}</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{profile.availability}</p>
        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div>
            <dt className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">rol</dt>
            <dd className="mt-1 text-terminal-text">{profile.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">stack</dt>
            <dd className="mt-1 text-terminal-text">{profile.stack.join(', ')}</dd>
          </div>
          <div>
            <dt className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">ubicación</dt>
            <dd className="mt-1 text-terminal-text">{profile.location}</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-3 border-t border-terminal-border/40 pt-5">
        {profile.about.map((paragraph) => (
          <p key={paragraph} className="max-w-3xl text-sm leading-7 text-terminal-text-secondary">{paragraph}</p>
        ))}
        <dl className="grid gap-3 pt-2 md:grid-cols-2">
          {profile.principles.map((principle) => (
            <div key={principle.label}>
              <dt className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">{principle.label}</dt>
              <dd className="mt-1 text-sm text-terminal-text">{principle.content}</dd>
            </div>
          ))}
        </dl>
      </section>

      {profile.categories.map((category) => (
        <section key={category.title} className="border-t border-terminal-border/40 pt-5">
          <h3 className="text-base font-semibold text-terminal-text">{category.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{category.description}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {category.groups.map((group) => (
              <div key={group.title}>
                <h4 className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">{group.title}</h4>
                <p className="mt-2 text-sm text-terminal-text">{group.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default ProfileSection;
