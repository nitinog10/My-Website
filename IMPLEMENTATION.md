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


### Adjust Colors

Update the accent color in `tailwind.config.ts`:
```ts
colors: {
  accent: '#00ffc8', // Change this
}
```

Or modify individual section colors in the component files.

### Modify Animations

**GSAP Animations:**
```tsx
gsap.fromTo(element, 
  { opacity: 0, y: 40 },
  { 
    opacity: 1, 
    y: 0,
    duration: 0.8,  // Adjust timing
    ease: 'power2.out',  // Change easing
  }
);
```

**Framer Motion:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}  // Adjust timing
/>
```

---

## Performance Tips

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Lazy Load Components**
   ```tsx
   const TechEcosystem = lazy(() => import('@/components/redesign/TechEcosystem'));
   ```

3. **Reduce Motion for Accessibility**
   ```tsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```

4. **Monitor Performance**
   - Use React DevTools Profiler
   - Check Chrome Performance tab
   - Monitor frame rates

---

## Troubleshooting

### 3D Scene Not Rendering
- Check WebGL support in browser
- Verify Three.js dependencies installed
- Check console for errors

### Animations Not Smooth
- Reduce number of animated elements
- Use `will-change` CSS property
- Enable GPU acceleration

### Horizontal Scroll Issues
- Check ScrollTrigger setup
- Verify container dimensions
- Test on different screen sizes

---

## Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (14+)
- Mobile browsers

---

## Deployment

Before deploying:
1. Run build: `npm run build`
2. Test production build: `npm run preview`
3. Check bundle size
4. Verify all animations work
5. Test on multiple devices

---

## Next Steps

1. Add more projects to showcase
2. Implement project filtering
3. Add sound design (optional)
4. Create mobile-optimized 3D scenes
5. Add keyboard navigation
6. Implement analytics tracking
7. Add SEO metadata
8. Create OG images for social sharing
