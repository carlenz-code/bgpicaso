"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    nombre_completo: "",
    email: "",
    password: "",
  });
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
      const res = await fetch("https://back-sgce.onrender.com/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        let errorMessage = "Error en el registro";
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          errorMessage = data?.message || errorMessage;
        } else {
          const text = await res.text();
          console.error("🧨 Respuesta inesperada del servidor:", text);
        }
        throw new Error(errorMessage);
      }

      toast.success("Registro exitoso! Por favor, inicia sesión.", {
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

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      console.error("🧨 Error en el registro:", error);

      toast.error(error.message || "Error en el registro. Intenta de nuevo.", {
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registrarse</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: jose123"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Jose María"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo</label>
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
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
        <p className="text-sm text-gray-600 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Inicia Sesión
          </a>
        </p>
      </form>
    </div>
  );
}
