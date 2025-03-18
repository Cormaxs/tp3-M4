import React, { useContext } from "react";
import { ColorContext } from "../context/ThemeContext"; 
export function ThemeToggleButton() {
  // Usa el contexto para obtener el estado del tema y la función para cambiarlo
  const { isDarkMode, toggleTheme } = useContext(ColorContext);

  return (
    <button
      onClick={toggleTheme} // Alterna el tema al hacer clic
      className={`px-8 py-2 rounded-lg transition-colors cursor-pointer  ${
        isDarkMode
          ? "bg-gray-700 text-white hover:bg-gray-600" // Estilos para modo oscuro
          : "bg-gray-200 text-gray-800 hover:bg-gray-300" // Estilos para modo claro
      }`}
    >
      {isDarkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
    </button>
  );
}