import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ColorContext } from "../context/ThemeContext";

export function Productos({ productos }) {
  const { addToCart } = useContext(CartContext); 
  const { isDarkMode } = useContext(ColorContext); // Estado del modo oscuro

  return (
    <div
      className={`container mx-auto p-6 rounded-2xl ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className={`border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            } p-5 flex flex-col items-center`}
          >
            {/* Imagen del producto */}
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-contain mb-3"
            />

            {/* Nombre del producto */}
            <div className="text-center w-full">
              <h3
                className={`text-md font-semibold truncate ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {producto.nombre}
              </h3>

              {/* Precio del producto */}
              <span
                className={`text-lg font-bold block mt-1 ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                ${producto.precio.toLocaleString("es-AR")}
              </span>
            </div>

            {/* Botón para agregar al carrito */}
            <button
              onClick={() => addToCart(producto)}
              className={`mt-3 px-4 py-2 rounded-lg hover:opacity-90 transition-colors w-full font-medium cursor-pointer ${
                isDarkMode
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              Agregar al carrito
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}