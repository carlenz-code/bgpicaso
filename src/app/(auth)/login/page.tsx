"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("🔄 Enviando solicitud al API con:", formData);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("📩 Respuesta recibida:", res);

      const response = await res.json();

      console.log("📦 Cuerpo de respuesta:", response);

      if (res.ok && response.status_code === 200) {
        localStorage.setItem("token", response.token);

        toast.success("Login exitoso!", {
          position: "bottom-right",
          autoClose: 3000,
          style: {
            backgroundColor: "#BBF7D0",
            border: "1px solid #22C55E",
            color: "black",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "14px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontFamily: "Poppins, sans-serif",
            marginRight: "20px",
            minWidth: "250px",
          },
          icon: <CheckCircleIcon className="h-6 w-6 text-black mr-2" />,
        });

        router.push("/planificador/nueva-clase");
      } else {
        console.error("❌ Login fallido. Estado:", res.status, "Respuesta:", response);
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      console.error("🧨 Error en login:", error);

      toast.error("Error en el login. Verifica tus credenciales.", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
          marginRight: "20px",
          minWidth: "250px",
        },
        icon: <InformationCircleIcon className="h-6 w-6 text-white mr-2" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
        </button>
        <p className="text-sm text-gray-600 text-center">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
