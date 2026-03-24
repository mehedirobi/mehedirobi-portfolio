import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContext.jsx'
import './styles/global.css'

// Inject CDN styles (Tailwind + Font Awesome) so index.html can remain minimal.
if (typeof document !== 'undefined') {
  const head = document.head || document.getElementsByTagName('head')[0]
  if (head && !document.querySelector('link[data-injected-tailwind]')) {
    const tailwind = document.createElement('link')
    tailwind.rel = 'stylesheet'
    tailwind.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
    tailwind.setAttribute('data-injected-tailwind', 'true')
    head.appendChild(tailwind)
  }
  if (head && !document.querySelector('link[data-injected-fa]')) {
    const fa = document.createElement('link')
    fa.rel = 'stylesheet'
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
    fa.setAttribute('data-injected-fa', 'true')
    head.appendChild(fa)
  }
  // Remove hardcoded body classes - theme will be applied via CSS variables
  if (document.body) {
    document.body.classList.remove('bg-gray-900','text-gray-200','font-sans','leading-normal','tracking-normal')
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
