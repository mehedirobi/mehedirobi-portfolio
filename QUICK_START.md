# Quick Reference Guide

## 🚀 Getting Started

### Installation & Running
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 File Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar
│   ├── Hero.jsx                # Landing/hero section
│   ├── About.jsx               # About me section
│   ├── Skills.jsx              # Skills & proficiency
│   ├── Experience.jsx          # Experience timeline
│   ├── Certifications.jsx      # Certifications and training
│   ├── Education.jsx           # Education timeline
│   ├── Projects.jsx            # Projects showcase
│   ├── Contact.jsx             # Contact form
│   ├── Footer.jsx              # Footer
│   └── UI.jsx                  # Shared UI primitives
├── data/
│   └── projectData.js          # Project descriptions and links
├── hooks/
│   └── useCopyToClipboard.js   # Clipboard helper
├── index.css                   # Tailwind and global styles
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## 🎨 Color System

### Primary Colors
```
Accent:  #4f46e5 (indigo)
Ink:     #0f172a (slate)
Muted:   #64748b (slate)
Border:  #e2e8f0 (slate)
```

### Backgrounds
```
Canvas:  #ffffff (white)
Subtle:  #f8fafc (slate)
```

## 🧩 Using Components

### Button Component
```jsx
import { Button } from './components/UI';

// Primary button
<Button>Click me</Button>

// With variant
<Button variant="secondary">Click me</Button>

// With size
<Button size="lg">Click me</Button>

// Variants: primary, secondary, ghost
// Sizes: sm, md, lg
```

### Card Component
```jsx
import { Card } from './components/UI';

<Card padding="p-6">
  Content here
</Card>

// Props:
// - as: element type (default: div)
// - padding: Tailwind spacing classes (default: p-5)
// - className: string for additional styles
```

### Badge Component
```jsx
import { Badge } from './components/UI';

<Badge variant="primary" size="md">React</Badge>

// Variants: default, primary, secondary, success, warning
// Sizes: sm, md
```

## 🎯 Section IDs

Each section has a unique ID for navigation:
```
#home       → Hero section
#about      → About section
#skills     → Skills section
#education  → Education section
#experience → Experience section
#projects   → Projects section
#contact    → Contact section
```

## 🔧 Customization Guide

### Update Navigation
**File**: `src/components/Navbar.jsx`
```jsx
// Line 7: Update logo text
<span className="hidden sm:inline">Your Name</span>

// Lines 15-17: Change social links
```

### Update Hero Section
**File**: `src/components/Hero.jsx`
```jsx
// Line 38: Profile image URL
src="your-image-url"

// Line 45: Your name
Your Name

// Line 49: Profession
Your Profession

// Lines 53-54: Social links at bottom
```

### Update Skills
**File**: `src/components/Skills.jsx`
```jsx
// Modify skillsData array (lines 21-45)
// Add/remove categories and skills
```

### Update Projects
**File**: `src/components/Projects.jsx`
```jsx
// Modify projectData array (lines 20-75)
// Add your actual projects
```

### Update Contact Info
**File**: `src/components/Contact.jsx`
```jsx
// Lines 45-62: Update contact information
// Lines 73-97: Update form handling
```

## 🎬 Animations

Section reveals and interactive transitions use Framer Motion. Reduced-motion
preferences are respected, and the global stylesheet disables smooth scrolling
and nonessential transitions when requested.

## 📱 Responsive Breakpoints

```
Mobile:  < 640px (use: sm:, md:)
Tablet:  640px - 1024px (use: md:, lg:)
Desktop: > 1024px (use: lg:)
```

### Example
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## ⌨️ Keyboard Navigation

All interactive elements support keyboard navigation:
- **Tab**: Navigate between elements
- **Enter**: Activate buttons/links
- **Space**: Toggle buttons
- **Esc**: Close modals

## ♿ Accessibility Features

### Already Implemented
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Alt text on images
- ✅ Form labels
- ✅ Color contrast

### Verify with
```bash
# Use browser accessibility tools
# Firefox: Dev Tools > Accessibility
# Chrome: Lighthouse in DevTools
```

## 🐛 Debugging

### Common Issues

**Issue**: Styles not applying
```
Solution: Check the Tailwind directives in src/index.css and the content paths in tailwind.config.js
```

**Issue**: Animations not working
```
Solution: Check the Framer Motion component and browser console
```

**Issue**: Components not rendering
```
Solution: Verify import paths and component exports
```

### Browser Console
```javascript
// Check for errors in browser DevTools (F12)
// Use console.log for debugging
```

## 📊 Form Validation

Contact form has built-in validation:
- ✅ Name required
- ✅ Email required and valid
- ✅ Subject required
- ✅ Message required

Error messages display automatically above fields.

## 🔄 State Management

### Using State in Components
```jsx
import { useState } from 'react';

const [open, setOpen] = useState(false);
setOpen(!open);
```

### Using Effects
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Your code here
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## 📦 Available Utilities

### Global CSS Utilities
- `.text-gradient` - Gradient text effect
- `.glass-effect` - Glass morphism effect
- `.animate-*` - Various animations
- Custom scrollbar styling

## 🚀 Performance Tips

1. **Optimize Images**
   - Use WebP format
   - Compress before uploading
   - Use lazy loading

2. **Reduce Bundle Size**
   - Tree-shake unused code
   - Lazy load components with React.lazy()
   - Use dynamic imports

3. **Caching**
   - Enable browser caching
   - Use service workers
   - Implement versioning

## 🌐 Deployment Checklist

Before deploying:
- [ ] Update all placeholder text
- [ ] Add real images
- [ ] Verify all links
- [ ] Test on mobile
- [ ] Check console for errors
- [ ] Optimize images
- [ ] Update meta tags
- [ ] Add favicon
- [ ] Test form submission
- [ ] Run accessibility check

## 📚 Useful Resources

- **Tailwind CSS**: https://tailwindcss.com/
- **React Docs**: https://react.dev/
- **Font Awesome**: https://fontawesome.com/
- **Web Accessibility**: https://www.w3.org/WAI/
- **SEO Guide**: https://developers.google.com/search

## 🎓 Learning Path

1. Learn React basics
2. Master Tailwind CSS
3. Understand component composition
4. Study web accessibility
5. Optimize performance
6. Deploy to production

---

**Need help?** Check the documentation files:
- `REFACTORING.md` - Detailed improvement notes
- `IMPROVEMENTS.md` - Completed improvements
- `ENHANCEMENTS.md` - Future enhancement ideas
