import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "bgpicaso - Evaluación de Profesores",
  description: "Plataforma SaaS para transcribir y evaluar clases de profesores con IA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${poppins.variable} antialiased h-full relative`}>
        
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}