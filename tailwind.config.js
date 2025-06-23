/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // 🌐 Identidad / Marca
        "brand-text": "#2362EE",               // Texto de marca (actualizado)
        "brand-gradient-from": "#FFFFFF",      // Degradado inicial del logo
        "brand-gradient-to": "#2362EE",        // Degradado final del logo
        "notification-dot": "#2362EE",         // Punto de notificación

        // 🎨 UI / Navegación
        "sidebar-tooltip-bg": "#D5F0FB",       // Fondo de tooltips en NavSection
        "hover-navsection": "#F0F6FF",         // Hover en opciones del sidebar
        "interactive-hover": "#2362EE",        // Hover en íconos y texto

        // 📑 Texto
        "text-secondary": "#6b7280",           // Títulos y texto secundario
        "text-muted": "#9ca3af",               // Detalles o texto gris claro

        // 📏 Bordes
        "border-light": "#e5e7eb",             // Bordes claros generales
        "border-subtle": "#E1E1E8",            // Borde del breadcrumb, etc.

        // 📢 Banners o Info
        "banner-bg": "#DAF0FF",                // Fondo del banner
        "banner-text-primary": "#3B7EAE",      // Texto principal (banner)
        "banner-text-dark": "#1B346D",         // Texto más oscuro (banner)

        // ✨ Fondos decorativos
        "blur-primary": "#A1B0FF",             // Color base para blur decorativo
      },
    },
  },
  plugins: [],
};
