/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "sidebar-tooltip-bg": "#D5F0FB", // Fondo de tooltips en NavSection
        "interactive-hover": "#3B9CE0", // Hover de íconos y texto en NavSection
        "text-secondary": "#6b7280", // Títulos en NavSection y texto secundario

        "brand-gradient-from": "#FFFFFF", // Degradado inicial del logo en Header
        "brand-gradient-to": "#AED6E6", // Degradado final del logo en Header
        
        "brand-text": "#3B9CE0", // Texto de marca (ej. "picasso.ai") en Header
        "notification-dot": "#66B9F4", // Punto de notificación en Header
        "text-muted": "#9ca3af", // Texto gris claro para emails y detalles
        "border-light": "#e5e7eb", // Bordes claros en Sidebar y ActionButtons
        // Nuevos colores para InfoBanner
        "banner-bg": "#DAF0FF", // Fondo del banner
        "banner-text-primary": "#3B7EAE", // Texto principal y hashtag
        "banner-text-dark": "#1B346D", // Texto más oscuro
      },
    },
  },
  plugins: [],
};