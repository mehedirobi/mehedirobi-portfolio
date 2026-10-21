# Portfolio quick start

## Run the app

```bash
npm install
npm run dev
```

Create and preview a production build with:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── About.jsx
│   ├── Certifications.jsx
│   ├── Contact.jsx
│   ├── Education.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   └── UI.jsx
├── data/
│   └── projectData.js
├── App.jsx
├── index.css
└── main.jsx

public/
├── favicon.svg
├── mehedirobi-resume.pdf
└── projects/
    ├── Mehedi-Robi-Professional.jpg
    └── optimized project previews
```

## Content updates

- Update project descriptions, technologies, and links in `src/data/projectData.js`.
- Update section content in the corresponding component under `src/components/`.
- Project previews are local, optimized images in `public/projects/`.
- The contact form validates its fields and opens a prefilled email draft; it does not send messages through a backend.

The portfolio uses a dark theme, responsive Tailwind CSS layouts, and Framer Motion animations that respect the reduced-motion preference.
