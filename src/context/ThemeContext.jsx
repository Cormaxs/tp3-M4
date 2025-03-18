import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ColorContext = createContext();

// Proveedor del contexto
export const ColorProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recuperar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("tema");
    return savedTheme ? JSON.parse(savedTheme) : false; // Valor predeterminado: false (modo claro)
  });
  
  useEffect(() => {
    localStorage.setItem("tema", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Función para alternar entre modo oscuro y claro
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ColorContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ColorContext.Provider>
  );
};