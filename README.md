# ARTEMIS-RCL | Advanced Recycling & Transformation System

A completely redesigned, unique single-page website showcasing Mars waste recycling technology with advanced interactive features.

## 🚀 Features

### Visual Design
- **Deep Space Theme** - Glassmorphism design with layered gradients
- **Animated Particle Background** - 80 interconnected particles creating a dynamic space atmosphere
- **Custom Color Palette** - Cyan/purple/orange accents on dark space background
- **Glassmorphic Cards** - Frosted glass effect with backdrop blur
- **Responsive Layout** - Mobile-first design that adapts to all screen sizes

### Interactive Elements

#### 1. Hero Section
- Large animated gradient text
- Floating Mars planet with rotating orbital rings
- Scroll indicator with bounce animation
- Mission badge with glow effect

#### 2. Stats Counter
- Animated number counting from 0 to target
- Triggers on scroll into view
- Smooth easing animation (2 second duration)
- Shows: 12,600 kg waste processed, 87% recovery rate, 1,095 day mission, 2,400+ items produced

#### 3. Technology Cards (3D Flip)
- Hover to flip and reveal specifications
- 4 core technologies with detailed specs
- Smooth 3D rotation effect
- Front: Description / Back: Technical specifications

#### 4. Interactive Timeline
- 3-year mission phases
- Animated dots with pulse effect
- Gradient line connector
- Hover effects with slide animation

#### 5. Enhanced Simulator
**Most Advanced Feature:**
- **Drag & Drop** - Drag waste items into the processing machine
- **Weight Tracking** - Shows total weight and item count
- **Energy Metrics** - Real-time energy (kW) and recovery (%) bars
- **Process Button** - Click to start 3-second processing animation
- **Processing States:**
  - READY (green) → PROCESSING (yellow, animated) → COMPLETE → READY
  - Spinning chamber animation during processing
  - Pulsing indicator lights
- **Dynamic Outputs** - Shows unique products based on materials added
- **Keyboard Support** - Press Enter/Space on items to add them

#### 6. FAQ Accordion
- Click questions to expand/collapse answers
- Smooth max-height animation
- Rotating + icon indicator
- Only one answer open at a time

### Sections

1. **Hero** - Full-height introduction with call-to-action buttons
2. **Stats** - Mission data with animated counters
3. **Technology** - 4 flip cards (Neural Sorting, Plasma Reformation, Adaptive Extrusion, Safe Processing)
4. **Timeline** - 3-year mission deployment phases
5. **Simulator** - Interactive waste processing experience
6. **Impact** - 4 sustainability benefits
7. **FAQ** - 5 common questions with expandable answers
8. **Footer** - Multi-column links and project info

## 🎨 Design Highlights

### Colors
- **Primary**: `#06b6d4` (Cyan)
- **Secondary**: `#ff6b35` (Mars Orange)
- **Tertiary**: `#a78bfa` (Purple)
- **Background**: `#05080f` (Deep Space)
- **Glass**: `rgba(20, 35, 60, 0.4)` with blur

### Typography
- System fonts: Inter, Segoe UI
- Large hero title: up to 5.5rem
- Section titles: up to 3.2rem
- Tight letter-spacing for modern feel

### Animations
- **Float** - Hero elements, Mars planet (3-6s)
- **Gradient Shift** - Animated gradient text (8s)
- **Pulse** - Timeline dots, logo icon (2-3s)
- **Spin** - Orbital rings, processor (1-30s)
- **Bounce** - Scroll indicator (2s)
- **Flip** - Technology cards (0.8s 3D rotation)
- **Reveal** - Fade + slide up on scroll (0.8s)

## 📂 File Structure

```
mars-recycling/
├── index.html    (26 KB) - Complete semantic HTML structure
├── style.css     (28 KB) - Deep space glassmorphic theme
├── script.js     (11 KB) - Particles, counters, FAQ, simulator
└── README.md     (this file)
```

## 🌐 How to Run

### Option 1: Direct Open
Double-click `index.html` to open in your default browser.

### Option 2: Local Server (Recommended)
```powershell
cd "C:\Users\MY PC\mars-recycling"
python -m http.server 5500
```
Then visit: http://localhost:5500

## ⚡ Performance

- No external dependencies
- Vanilla HTML/CSS/JavaScript
- Inline SVG icons (no image requests)
- Optimized animations (GPU-accelerated)
- Lazy-loaded scroll animations
- Particle system runs on Canvas API

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support (Tab, Enter, Space)
- Focus visible styles
- Reduced motion media query support
- Live regions for dynamic content

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1240px (max container width)

## 🎯 Unique Selling Points

1. **Particle Background System** - Creates living, breathing atmosphere
2. **3D Flip Cards** - Unique way to display technical specs
3. **Processing Animation** - Full state machine with visual feedback
4. **Metric Tracking** - Real-time calculation of energy and recovery rates
5. **Glassmorphism** - Modern frosted glass aesthetic throughout
6. **Deep Space Theme** - Truly unique Mars-appropriate design

## 🔧 Technologies

- HTML5 (Canvas, Semantic elements)
- CSS3 (Grid, Flexbox, Animations, Backdrop-filter, Transforms)
- JavaScript ES6+ (Classes, Arrow functions, Optional chaining)
- IntersectionObserver API
- RequestAnimationFrame API
- Canvas 2D Context

---

**Project**: ARTEMIS-RCL Concept  
**Mission**: Jezero Crater Base, Mars  
**Duration**: 2027-2030  
**Purpose**: Educational simulation
