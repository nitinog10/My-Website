# Implementation Guide

## Quick Start

### 1. View the Redesign

Start your development server:
```bash
npm run dev
```

Navigate to: `http://localhost:5173/redesign`

### 2. Toggle Between Designs

Use the floating button in the bottom-right corner to switch between:
- Original design: `/`
- Redesign: `/redesign`

---

## Integration Options

### Option A: Replace Existing Sections (Recommended)

Update `src/pages/Index.tsx`:

```tsx
// Replace these imports
import SkillsSection from '@/components/SkillsSection';
import TechStackSection from '@/components/TechStackSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';

// With these
import TechEcosystem from '@/components/redesign/TechEcosystem';
import ExperienceJourney from '@/components/redesign/ExperienceJourney';
import ProjectsShowcase from '@/components/redesign/ProjectsShowcase';

// Then replace in JSX
<TechEcosystem />      // Replaces SkillsSection + TechStackSection
<ExperienceJourney />  // Replaces ExperienceSection
<ProjectsShowcase />   // Replaces ProjectsSection
```

### Option B: Keep Both Versions

Keep the `/redesign` route for the new design and `/` for the original.
Users can toggle between them using the DesignToggle button.

---

## Customization

### Update Content

**Tech Ecosystem:**
```tsx
// src/components/redesign/TechEcosystem.tsx
const techStack = [
  { name: 'Python', category: 'Language', color: '#3776AB', x: 2, y: 1, z: 0 },
  // Add your technologies here
];
```

**Experience Journey:**
```tsx
// src/components/redesign/ExperienceJourney.tsx
const experiences = [
  {
    year: '2025',
    role: 'YOUR ROLE',
    company: 'COMPANY NAME',
    description: 'Your description',
    icon: Briefcase,
    color: '#FF6B6B',
    tags: ['Tag1', 'Tag2'],
  },
  // Add your experiences
];
```

**Projects Showcase:**
```tsx
// src/components/redesign/ProjectsShowcase.tsx
const projects = [
  {
    id: '01',
    title: 'PROJECT NAME',
    subtitle: 'Project tagline',
    description: 'Short description',
    fullStory: 'Detailed description for modal',
    image: 'image-url',
    tech: ['Tech1', 'Tech2'],
    github: 'github-url',
    color: '#0EA5E9',
    stats: { metric1: 'value1', metric2: 'value2' },
  },
  // Add your projects
];
```
