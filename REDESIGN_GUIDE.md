s# Portfolio Redesign - Immersive Experience

## Overview

Three completely reimagined portfolio sections featuring cinematic motion design, interactive 3D elements, and scroll-driven storytelling.

## New Sections

### 1. Tech Ecosystem (What I Work With)
**Location:** `src/components/redesign/TechEcosystem.tsx`

**Features:**
- Interactive 3D tech stack visualization using Three.js
- Floating nodes with real-time connections
- Hover interactions revealing tech details
- Smooth camera controls with OrbitControls
- Particle-like connection lines between technologies
- Category-based color coding

**Motion Design:**
- Entry animations with GSAP
- Continuous floating motion for nodes
- Scale transitions on hover
- Smooth camera rotation

### 2. Experience Journey (Timeline)
**Location:** `src/components/redesign/ExperienceJourney.tsx`

**Features:**
- Horizontal scroll storytelling
- Pinned section with smooth scrubbing
- Individual experience cards with 3D transforms
- Color-coded by role/company
- Progress indicator
- Staggered card reveals

**Motion Design:**
- Horizontal scroll with GSAP ScrollTrigger
- Card entrance with rotation and scale
- Hover effects with 3D transforms
- Smooth scroll progress tracking


### 3. Projects Showcase (Case Studies)
**Location:** `src/components/redesign/ProjectsShowcase.tsx`

**Features:**
- Grid layout with cinematic project cards
- Full-screen modal for detailed case studies
- Image parallax on hover
- Smooth modal transitions
- Project stats and metrics
- Direct GitHub links

**Motion Design:**
- Card entrance with scale and opacity
- Image zoom on hover
- Modal slide-in with backdrop blur
- Exit animations with scale
- Staggered content reveals in modal

## Tech Stack

- **React** - Component framework
- **GSAP** - Advanced scroll animation