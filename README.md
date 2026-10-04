# Adnan Oktar - Professional Portfolio

This repository contains the source code for my personal portfolio website. It is engineered with a strict **Neo-Brutalist architectural approach**, prioritizing performance, zero-dependency rendering, and a striking monochromatic aesthetic.

## 🌐 Live Demo
The website is deployed and automatically synced via Vercel:
**[adnanoktar.vercel.app](https://adnanoktar.vercel.app)**

## 🛠️ Technology Stack
- **Architecture**: Multi-page Application (MPA) for optimal static routing and SEO.
- **Structure**: Semantic HTML5.
- **Styling**: Pure Vanilla CSS3 (Custom Design System with CSS Variables, no Tailwind/Bootstrap).
- **Logic**: Vanilla ES6 JavaScript (Zero heavy frameworks like React/Vue).
- **Asset Management**: GitHub Issues CDN (All high-resolution certificates and media are hosted externally via GitHub Issues CDN to maintain an ultra-lightweight repository and prevent Vercel 404 deployment errors).
- **Deployment**: Vercel Git Integration.

## ✨ Core Features
- **Strict Monochrome Theme**: Designed with an absolute black, white, and gray palette to give an elegant architectural feel.
- **Hydrangea Violet Accent**: A single, striking interactive accent color (`#8c52ff`) injected strictly on hovers, text selection, and active states to provide micro-interaction feedback without cluttering the UI.
- **Native Light/Dark Mode**: Built-in instantaneous theme toggling engine powered by root CSS variables and `localStorage` caching. Flashbang prevention integrated for comfortable dark mode hover states.
- **Absolute Precision Spacing & Alignment**: Strict adherence to a 1rem (`gap-4`) spacing system and `-1px -1px 0px` box-shadows across all structural components to maintain true Brutalist alignment without sub-pixel rendering bugs on high-DPI screens.
- **Micro-Interactions & Custom Cursor**: 
  - Sharp, brutalist square custom cursor that rotates into a diamond (`45deg`) on interactive elements.
  - Enterprise deployment-style boot loader sequence.
  - Brutalist drop-shadow popping animations with precise `.card-static` exceptions for complex SVGs.
- **Smooth PPT-like Page Transitions**: A custom Javascript link interceptor creates seamless, presentation-style `slide-up` and `fade-in` transitions across the Multi-page Application.
- **Interactive Radar Chart**: A bespoke, pure SVG-based psychographic profiling engine (Radar Chart) integrated with a custom-built `.brutalist-tooltip` logic.

## 🗂️ Site Structure
1. **Home**: High-impact landing page restricted to a strict 100vh, non-scrollable viewport (`overflow: hidden`).
2. **Profile**: Detailed grid encompassing Education, Organization, Technical Expertise, Competitions, and Languages, with dedicated sub-pages for verifiable certificates. Includes a robust "Applied Data Science practitioner" bio section.
3. **Projects**: In-depth case studies for flagship Data Science and Software Engineering projects (Web-ISPU, REGOKEMON, ELYSIA, VibePlay).
4. **Persona**: Personal identity, psychographic metrics (MBTI INFJ-T, Enneagram 5w4 & 5w6, Hogwarts House), curated Spotify audio logs, and repositories of leisure.
5. **CV (Curriculum Vitae)**: Dedicated interactive resume preview page featuring high-res PDF display and an action panel for downloading the ATS-optimized master document.

## 🚀 How to Run Locally
Because this project is built entirely with pure HTML, CSS, and JS, no build tools or package managers (`npm`) are required.
1. Clone this repository: `git clone https://github.com/Bejochan/portofolio.git`
2. Open the folder and double-click `index.html` to open it directly in your favorite web browser.

---
*Engineered by Adnan Oktar (2026).*