# Quick Reference - Cinematic Portfolio Components

## 📦 Components Summary

| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| **TechEcosystem** | `TechEcosystem.tsx` | Tech visualization | Interactive nodes, connections, hover tooltips |
| **AnimatedExperienceJourney** | `AnimatedExperienceJourney.tsx` | Career timeline | Expandable cards, scroll sync, timeline dots |
| **CinematicProjectsGallery** | `CinematicProjectsGallery.tsx` | Project showcase | Grid cards, modal case studies, hover effects |

---

## 🎬 Animation Patterns

### 1. Scroll-Triggered Entrance (GSAP)
```typescript
gsap.from('.element', {
  duration: 0.8,
  opacity: 0,
  y: 100,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: ref.current,
    start: 'top 60%',
    toggleActions: 'play none none none',
  },
});
```

### 2. Hover Micro-Interaction (Framer Motion)
```typescript
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
>
  Content
</motion.div>
```

### 3. Expandable Content Reveal
```typescript
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
    >
      Hidden content
    </motion.div>
  )}
</AnimatePresence>
```

### 4. Modal Entrance
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  Modal content
</motion.div>
```

---

## 🎨 Color Reference

### Utility Colors
```css
/* Accent (Primary) */
--accent: #00FFC8  /* Bright Cyan */

/* Semantic Colors */
--red: #FF6B6B    /* Danger, Work */
--orange: #FF8C42 /* Warning, Learning */
--yellow: #FFD93D /* Info, Data */
--green: #10B981  /* Success, Environment */
--blue: #4ECDC4   /* Primary, Web */
--purple: #8B5CF6 /* Secondary, Systems */
--pink: #FD79A8   /* Accent, UI */
```

### Component Colors

#### TechEcosystem
```typescript
const colors = {
  llms: '#FF6B6B',        // Red
  rag: '#FF8C42',         // Orange
  agents: '#FFD93D',      // Yellow
  cv: '#6BCB77',          // Green
  torch: '#FF6B6B',       // Red
  tf: '#FF8C42',          // Orange
  react: '#4ECDC4',       // Cyan
  node: '#45B7D1',        // Blue
  three: '#96CEB4',       // Green
  embedding: '#FFEAA7',   // Light Yellow
  db: '#DFE6E9',          // Gray
  cloud: '#A29BFE',       // Purple
  gsap: '#FD79A8',        // Pink
  nlp: '#74B9FF',         // Light Blue
  tools: '#55EFC4',       // Light Green
};
```

#### Experience Types
```typescript
const typeColors = {
  'CO-FOUNDER': '#FF6B6B',     // Red
  'HEAD ALUMNI': '#4ECDC4',    // Cyan
  'AI DEVELOPER': '#FFD93D',   // Yellow
  'INTERN': '#95E1D3',         // Teal
  'TECH OPS': '#F38181',       // Pink-Red
  'EDUCATION': '#A8DADC',      // Light Blue
};
```

#### Projects
```typescript
const projectColors = {
  atmopredict: '#0EA5E9',    // Sky Blue
  airpulse: '#10B981',       // Green
  campusmitra: '#F59E0B',    // Amber
  bharattripai: '#EF4444',   // Red
  foundationlms: '#8B5CF6',  // Purple
};
```

---

## 🖼️ Component Structure

### TechEcosystem Layout
```
┌─ Section Container
│  ├─ Header (Title + Description)
│  ├─ Interactive Canvas
│  │  ├─ SVG Grid Background
│  │  ├─ Tech Nodes (arranged in radius)
│  │  │  ├─ Circle with color
│  │  │  ├─ Pulse animation on hover
│  │  │  └─ Tooltip popup
│  │  ├─ Connection Lines (SVG)
│  │  └─ Center Pulse
│  └─ Stats Footer
└─ Background Gradients (animated)
```

### AnimatedExperienceJourney Layout
```
┌─ Section Container
│  ├─ Header (Title + Description)
│  ├─ Timeline Visualization
│  │  ├─ Vertical Line (animated)
│  │  └─ Experience Cards (staggered entry)
│  │     ├─ Timeline Dot
│  │     ├─ Card Content
│  │     │  ├─ Icon + Type Badge
│  │     │  ├─ Title + Company
│  │     │  ├─ Description (always visible)
│  │     │  ├─ Details (expandable)
│  │     │  └─ Tags (interactive)
│  │     └─ Underline (on hover)
│  └─ Stats (3 columns)
└─ Background Gradients
```

### CinematicProjectsGallery Layout
```
┌─ Section Container
│  ├─ Header (Title + Description)
│  ├─ Project Grid (3 columns, responsive)
│  │  ├─ Project Card (repeated)
│  │  │  ├─ Image (grayscale on load)
│  │  │  ├─ Gradient Overlay
│  │  │  ├─ Icon Badge
│  │  │  ├─ Title + Category
│  │  │  ├─ Description
│  │  │  ├─ CTA (on hover)
│  │  │  └─ Underline Bar
│  ├─ CTA Section
│  └─ Project Modal (on click)
│     ├─ Backdrop (blur + fade)
│     ├─ Modal Content
│     │  ├─ Close Button
│     │  ├─ Hero Image Section
│     │  ├─ Two-Column Content
│     │  │  ├─ Overview + Challenge
│     │  │  └─ Solution + Impact
│     │  ├─ Technology Stack
│     │  └─ Action Links
│     └─ Exit Animation (reverse)
└─ Background Gradients
```

---

## 🎯 Key Animation Values

### Durations
```typescript
// Entrance animations
entry: 0.6s - 1.2s

// Hover transitions
hover: 0.2s - 0.5s

// Modal open
modal: 0.3s - 0.5s

// Content reveal
reveal: 0.4s - 0.8s

// Scroll scrub
scrub: 0.5s - 2s (varies by effect)
```

### Easing Curves
```typescript
// GSAP Easing
'power3.out'        // Smooth exit
'power3.inOut'      // Smooth both ways
'back.out'          // Bouncy exit
'elastic.out'       // Elastic bounce
'none'              // Linear for scroll

// Framer Motion Spring
{ type: 'spring', stiffness: 400, damping: 10 }
```

### Scale Values
```typescript
// Interactive scales
rest: 1.0
hover: 1.05 (5% larger)
active: 0.95 (5% smaller)

// Modal
initial: 0.95 (starts small)
animate: 1.0 (full size)
```

---

## 📊 Data Structure Quick Reference

### Tech Stack Entry
```typescript
{
  id: 'tech-id',
  name: 'Technology Name',
  category: 'AI' | 'Web' | 'Data' | 'Tools',
  description: 'What it does',
  usage: 'How I use it',
  connections: ['related-1', 'related-2'],
  color: '#FF6B6B',
  bgColor: 'rgba(255, 107, 107, 0.1)',
}
```

### Experience Entry
```typescript
{
  id: '01',
  role: 'JOB TITLE',
  company: 'COMPANY NAME',
  period: 'TIME PERIOD',
  type: 'work' | 'education' | 'achievement',
  description: 'Short summary',
  details: ['Detail 1', 'Detail 2', 'Detail 3'],
  tags: ['tag1', 'tag2'],
  color: '#FF6B6B',
  icon: <IconComponent className="w-6 h-6" />,
}
```

### Project Entry
```typescript
{
  id: 'project-id',
  number: '01',
  name: 'PROJECT NAME',
  category: 'CATEGORY',
  description: 'Tagline',
  overview: 'Long form overview',
  challenge: 'Problem statement',
  solution: 'How solved',
  impact: 'Results',
  stack: ['Tech1', 'Tech2'],
  image: 'url',
  github: 'https://...',
  live: 'https://...',
  theme: 'from-color-500 to-color-400',
  accentColor: '#HEX',
  icon: <IconComponent className="w-8 h-8" />,
}
```

---

## 🔑 Props & Configuration

### No Required Props
All three components are self-contained and take no props:

```typescript
// All usage the same:
<TechEcosystem />
<AnimatedExperienceJourney />
<CinematicProjectsGallery />
```

### State Management (Internal)

Each component manages its own state:

**TechEcosystem**:
- `hoveredNode` - Currently hovered tech node

**AnimatedExperienceJourney**:
- `selectedExp` - Currently selected experience

**CinematicProjectsGallery**:
- `selectedProject` - Currently selected project for modal

---

## 🎪 Component Import Statements

```typescript
// In your Index.tsx or page file:
import TechEcosystem from '@/components/TechEcosystem';
import AnimatedExperienceJourney from '@/components/AnimatedExperienceJourney';
import CinematicProjectsGallery from '@/components/CinematicProjectsGallery';

// Individual usage:
<TechEcosystem />
<CinematicProjectsGallery />
<AnimatedExperienceJourney />
```

---

## 🧪 Testing Checklist

### Functionality
- [ ] Click tech nodes - see tooltip
- [ ] Hover tech nodes - show connections
- [ ] Click experience cards - expand/collapse
- [ ] Hover project cards - see CTA
- [ ] Click project - modal opens
- [ ] Click close btn - modal closes
- [ ] Scroll through - animations trigger

### Responsiveness
- [ ] Mobile (375px) - layouts stack
- [ ] Tablet (768px) - 2-column grids
- [ ] Desktop (1024px+) - 3-column grids
- [ ] Landscape mobile - content fits

### Performance
- [ ] No layout shifts on load
- [ ] Smooth 60fps scrolling
- [ ] Modal opens without lag
- [ ] Images load quickly
- [ ] No console errors

### Accessibility
- [ ] Keyboard navigation works
- [ ] High contrast maintained
- [ ] Alt text on images
- [ ] ARIA labels on buttons
- [ ] Focus states visible

---

## 🔗 File Dependencies

```
Index.tsx
├── TechEcosystem.tsx
│  ├── gsap/ScrollTrigger
│  ├── framer-motion
│  └── lucide-react (none)
├── CinematicProjectsGallery.tsx
│  ├── gsap/ScrollTrigger
│  ├── framer-motion
│  └── lucide-react (many icons)
└── AnimatedExperienceJourney.tsx
   ├── gsap/ScrollTrigger
   ├── framer-motion
   └── lucide-react (4 icons)
```

### No Additional Dependencies Required
All new components use existing dependencies:
- ✅ react
- ✅ framer-motion
- ✅ gsap
- ✅ lucide-react

---

## 🚀 Quick Deploy

```bash
# Test locally
npm run dev

# Build
npm run build

# Deploy (Vercel auto-deploys on push)
git push origin main

# Verify build
npm run preview
```

---

## 📈 Metrics & Monitoring

### Performance Targets
```
LCP: < 2.5s
FCP: < 1.8s
CLS: < 0.1
TTI: < 3.8s
```

### Bundle Metrics
```
HTML: 1.41 KB (gzip: 0.59 KB)
CSS: 89.56 KB (gzip: 14.68 KB)  
JavaScript: 1,667.17 KB (gzip: 508.77 KB)
```

---

## 💬 Component Signals

### TechEcosystem
```
Ideal for: Showcasing tech variety
Best scroll: Medium-fast (1-2 screens)
Animation load: Medium
User interaction: High (hover-heavy)
```

### AnimatedExperienceJourney
```
Ideal for: Timeline storytelling
Best scroll: Moderate (2-3 screens)
Animation load: Medium
User interaction: High (click-expand)
```

### CinematicProjectsGallery
```
Ideal for: Featured showcase
Best scroll: Moderate (2-3 screens)
Animation load: Medium-High
User interaction: Very High (modal)
```

---

**Last Updated**: March 2026
**Component Status**: Production Ready
**Last Build**: ✓ Successful
