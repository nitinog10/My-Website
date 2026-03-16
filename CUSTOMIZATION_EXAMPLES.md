# Customization Examples & Code Snippets

## 🎨 Common Customizations

### 1. Change Component Colors

#### Change Overall Accent Color
In `tailwind.config.ts`:
```typescript
module.exports = {
  theme: {
    colors: {
      accent: '#00FFC8', // Change this to your color
    }
  }
}
```

**Good accent color choices**:
- Cyan: `#00FFC8` (current) - Modern, tech-forward
- Electric Blue: `#00D4FF` - Energetic, professional
- Neon Pink: `#FF006E` - Bold, creative
- Lime Green: `#39FF14` - Vibrant, unique
- Purple: `#7C3AED` - Premium, elegant

#### Change TechEcosystem Node Color
```typescript
// In src/components/TechEcosystem.tsx
// Find the technology in techStack and update:
{
  id: 'react',
  color: '#FF006E',      // Change from current
  bgColor: 'rgba(255, 0, 110, 0.1)',  // Update background
}
```

#### Change Experience Card Colors
```typescript
// In src/components/AnimatedExperienceJourney.tsx
{
  id: '01',
  role: 'CO-FOUNDER',
  color: '#7C3AED',  // Change this
  // ... rest of data
}
```

#### Change Project Theme Colors
```typescript
// In src/components/CinematicProjectsGallery.tsx
{
  id: 'atmopredict',
  name: 'ATMOPREDICT',
  theme: 'from-purple-500 to-violet-400',  // Change gradient
  accentColor: '#7C3AED',                   // Change accent
}
```

---

### 2. Adjust Animation Speeds

#### Speed Up All Scroll Animations
```typescript
// In any component's useEffect with gsap.from():
gsap.from('.element', {
  duration: 0.8,      // Reduce from 1.2 for faster
  stagger: 0.05,      // Reduce from 0.1 for tighter stagger
  ease: 'power3.out',
});
```

**Quick reference**:
- `duration: 0.4` - Very fast, snappy
- `duration: 0.8` - Fast, responsive (current)
- `duration: 1.2` - Smooth, balanced
- `duration: 2.0` - Cinematic, slow

#### Slow Down Hover Transitions
```typescript
// In Framer Motion components:
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.5 }}  // Increase from 0.3
>
```

#### Change GSAP Scrub Speed for Scroll
```typescript
scrollTrigger: {
  trigger: containerRef.current,
  scrub: 2,  // 1 = current, 2 = slower, 0.5 = faster
}
```

---

### 3. Modify Text Content

#### Update TechEcosystem Header
```typescript
// In src/components/TechEcosystem.tsx, find:
<h2 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">
  Tech Ecosystem
</h2>

// Change to:
<h2 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">
  My Technical Arsenal  {/* or your custom title */}
</h2>
```

#### Change Experience Section Title
```typescript
// In src/components/AnimatedExperienceJourney.tsx:
<h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
  Career History  {/* Change from "Experience Timeline" */}
</h2>
```

#### Update Projects Section Title
```typescript
// In src/components/CinematicProjectsGallery.tsx:
<h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
  Featured Work  {/* Change from "Projects & Case Studies" */}
</h2>
```

---

### 4. Add More Items to Lists

#### Add More Technologies
```typescript
// src/components/TechEcosystem.tsx
// Add to techStack array (currently ~15 items):

const techStack: TechNode[] = [
  // ... existing items
  {
    id: 'web3',
    name: 'Web3 & Blockchain',
    category: 'Web',
    description: 'Decentralized protocol development',
    usage: 'Smart contracts, DApp integration',
    connections: ['node', 'react'],
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
];
```

#### Add More Experience Entries
```typescript
// src/components/AnimatedExperienceJourney.tsx
// Add to experiences array (currently 6 items):

const experiences: Experience[] = [
  // ... existing items
  {
    id: '07',
    role: 'FREELANCE CONSULTANT',
    company: 'SELF-EMPLOYED',
    period: '2022 — 2023',
    type: 'work',
    description: 'Independent AI consulting for startups',
    details: [
      'Built ML prototypes for early-stage companies',
      'Architected AI integration strategies',
      'Mentored junior developers',
    ],
    tags: ['Consulting', 'Entrepreneurship', 'AI'],
    color: '#06B6D4',
    icon: <Zap className="w-6 h-6" />,
  },
];
```

#### Add More Projects
```typescript
// src/components/CinematicProjectsGallery.tsx
// Add to projects array (currently 5 items):

const projects: Project[] = [
  // ... existing items
  {
    id: 'mynewaigame',
    number: '06',
    name: 'AI GAME ENGINE',
    category: 'GAME DEVELOPMENT',
    description: 'ML-powered procedural game generation',
    overview: 'A game engine powered by AI that generates unique levels and narratives dynamically.',
    challenge: 'Creating procedural generation that remains coherent and fun to play',
    solution: 'Built multi-agent system with reinforcement learning for balanced level generation',
    impact: 'Prototype played by 1000+ testers with 4.5★ average rating',
    stack: ['PyTorch', 'UnityML', 'FastAPI', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1538481143235-e7df5deb6bea?w=1600',
    github: 'https://github.com/yourusername/ai-game-engine',
    live: 'https://aigame-demo.vercel.app',
    theme: 'from-pink-500 to-rose-400',
    accentColor: '#EC4899',
    icon: <Gamepad2 className="w-8 h-8" />,
  },
];
```

---

### 5. Layout & Spacing Adjustments

#### Change Grid Columns (Projects)
```typescript
// In src/components/CinematicProjectsGallery.tsx
// Current: 3 columns on desktop
{/* Change from: */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

// To: 4 columns on ultra-wide screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
```

#### Adjust Card Padding
```typescript
// In any component's card rendered with:
<div className="p-6 md:p-8">  {/* current */}
  
// Change to:
<div className="p-4 md:p-6">   {/* more compact */}
// or
<div className="p-8 md:p-12">  {/* more spacious */}
```

#### Change Modal Width
```typescript
// In src/components/CinematicProjectsGallery.tsx
// Current:
<motion.div
  className="relative w-full max-w-5xl max-h-[90vh]"

// To make wider:
<motion.div
  className="relative w-full max-w-7xl max-h-[90vh]"
```

---

### 6. Background & Visual Effects

#### Change Background Gradient Colors
```typescript
// In TechEcosystem.tsx:
Current:
<motion.div
  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]"

// Change to:
<motion.div
  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]"
```

#### Increase/Decrease Background Blur
```typescript
// Current blur values:
blur-[80px]   // Light blur
blur-[100px]  // Medium blur (current)
blur-[120px]  // Strong blur

// Adjust in any component
```

#### Remove or Adjust Gradient Overlays
```typescript
// If image overlay is too dark:
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

// Make lighter:
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

// Make darker:
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
```

---

### 7. Typography Adjustments

#### Change Section Title Size
```typescript
// Current sizes:
text-5xl    // Mobile
md:text-7xl // Desktop

// To make bigger:
text-6xl md:text-8xl

// To make smaller:
text-4xl md:text-6xl
```

#### Change Font Weight
```typescript
// Current:
className="font-black"  // Weight 900

// Options:
className="font-bold"   // Weight 700
className="font-semibold"  // Weight 600
```

#### Adjust Letter Spacing
```typescript
// Current:
tracking-tighter    // Tighter spacing
tracking-widest     // Wider spacing

// Options:
tracking-normal
tracking-wide
tracking-[0.2em]    // Custom value
```

---

### 8. Interaction & Hover Effects

#### Modify Hover Scale
```typescript
// Current in projects:
whileHover={{ scale: 1.05 }}

// Options:
whileHover={{ scale: 1.02 }}  // Subtle
whileHover={{ scale: 1.10 }}  // More dramatic
```

#### Change Hover Motion Direction
```typescript
// Current:
whileHover={{ scale: 1.05, y: -5 }}

// Alternative directions:
whileHover={{ scale: 1.05, y: 5 }}    // Move down instead
whileHover={{ scale: 1.05, x: 10 }}   // Move right
whileHover={{ scale: 1.05, x: -10 }}  // Move left
```

#### Modify Click/Tap Effects
```typescript
// Current:
whileTap={{ scale: 0.95 }}

// Options:
whileTap={{ scale: 0.98 }}  // Subtle
whileTap={{ scale: 0.90 }}  // More dramatic
whileTap={{ scale: 0.95, y: 2 }}  // Add movement
```

---

### 9. Image Updates

#### Change Project Images
```typescript
// In src/components/CinematicProjectsGallery.tsx
{
  id: 'atmopredict',
  name: 'ATMOPREDICT',
  // Current:
  image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600',
  
  // Replace with your own image:
  image: 'https://your-domain.com/images/atmopredict.jpg',
}
```

**Good image sources**:
- Your own images
- Unsplash (free): unsplash.com
- Pexels (free): pexels.com
- Your GitHub repo screenshots
- Live project previews

---

### 10. Mobile Optimization

#### Adjust Mobile Font Sizes
```typescript
// For smaller screens:
// Current:
<h3 className="text-2xl md:text-3xl font-bold">

// Mobile-friendly:
<h3 className="text-xl md:text-3xl font-bold">
```

#### Stack Grid on Mobile
```typescript
// Current (responsive):
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Force single column on mobile:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Already does this!

// Force double column:
className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
```

#### Disable Complex Animations on Mobile
```typescript
// In any component:
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // Use simpler animations
  return <SimplerComponent />;
} else {
  // Use full animations
  return <ComplexComponent />;
}
```

---

## 📋 Copy-Paste Templates

### New Tech Stack Item Template
```typescript
{
  id: 'unique-id',
  name: 'Technology Name',
  category: 'AI' | 'Web' | 'Data' | 'Tools',
  description: 'One-line description of what it is',
  usage: 'How/where you use this technology',
  connections: ['related-tech-id', 'another-tech-id'],
  color: '#FF6B6B',  // Hex color code
  bgColor: 'rgba(255, 107, 107, 0.1)',  // RGBA with transparency
}
```

### New Experience Entry Template
```typescript
{
  id: '##',  // Use next number
  role: 'JOB TITLE IN CAPS',
  company: 'COMPANY NAME IN CAPS',
  period: '2024 — PRESENT',  // or specific dates
  type: 'work' | 'education' | 'achievement',
  description: 'Short one-line description of the role',
  details: [
    'Achievement or responsibility #1',
    'Achievement or responsibility #2',
    'Achievement or responsibility #3',
  ],
  tags: ['Skill1', 'Skill2', 'Skill3'],
  color: '#FF6B6B',  // Theme color
  icon: <IconName className="w-6 h-6" />,  // From lucide-react
}
```

### New Project Template
```typescript
{
  id: 'lowercase-id',
  number: '##',  // Next number in sequence
  name: 'PROJECT NAME IN CAPS',
  category: 'CATEGORY NAME',
  description: 'Catchy one-liner tagline',
  overview: 'Detailed 2-3 sentence explanation of the project',
  challenge: 'The problem it solves or challenge it addresses',
  solution: 'How you built it and your approach',
  impact: 'Results, metrics, or real-world impact',
  stack: ['Tech1', 'Tech2', 'Tech3', 'Tech4'],
  image: 'https://your-image-url.jpg',
  github: 'https://github.com/yourname/repo',
  live: 'https://live-demo-url.com',  // Optional
  theme: 'from-color-500 to-color-400',  // Tailwind gradient
  accentColor: '#FF6B6B',  // Hex color
  icon: <IconName className="w-8 h-8" />,  // From lucide-react
}
```

---

## 🎨 Color Palette Reference

### Recommended Color Combinations
```
Blue + Cyan:      #0EA5E9 (sky), #06B6D4 (cyan)
Green + Emerald:  #10B981 (green), #059669 (emerald)
Purple + Pink:    #8B5CF6 (purple), #EC4899 (pink)
Orange + Red:     #F59E0B (amber), #EF4444 (red)
Yellow + Orange:  #FFD93D (yellow), #FF8C42 (orange)
```

### Accessible Color Combinations
```
High Contrast (Best for readability):
- #000000 (black) + #FFFFFF (white)
- #000000 (black) + #FFFF00 (yellow)
- #FFFFFF (white) + #0000FF (blue)
- #FFFFFF (white) + #FF0000 (red)

Medium Contrast:
- #333333 (dark gray) + #00FFC8 (cyan)
- #1F2937 (darker gray) + #60A5FA (light blue)
```

---

## 🚀 Quick Deploy Checklist

Before deploying after customizations:

```bash
# 1. Test locally
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview

# 4. Check for console errors
# (Open DevTools → Console)

# 5. Test on mobile
# (Use responsive design mode)

# 6. Verify animations work
# (Check all hover, click, scroll)

# 7. Check performance
# (Run Lighthouse in DevTools)

# 8. Deploy
git add .
git commit -m "Portfolio redesign customization"
git push origin main
```

---

## 💡 Pro Tips

1. **Color Picker Tool**: Use [this tool](https://htmlcolorcodes.com/) to convert hex colors
2. **Test Colors**: Open DevTools and use color picker on elements
3. **Animation Speed**: Use browser DevTools slow-motion (25%) to test
4. **Mobile View**: Use DevTools device emulation for realistic testing
5. **Gradient Generator**: [CSS Gradient Generator](https://cssgradient.io/)
6. **Shadow Generator**: [Shadows Brewer](https://shadows.brewer.top/)

---

**Last Updated**: March 2026
