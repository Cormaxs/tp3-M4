import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ColorContext } from "../context/ThemeContext";

export function Carrito() {
  const { cart, removeFromCart, updateQuantity, removeAllCart, totalPrice } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isDarkMode } = useContext(ColorContext); // Obtener el estado del modo oscuro

  return (
    <div className="container mx-auto p-6">
      {/* Botón para abrir/cerrar el carrito */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className={`cursor-pointer fixed bottom-4 right-4 ${
          isDarkMode ? "bg-gray-800" : "bg-green-600"
        } text-white p-4 rounded-full shadow-lg hover:${
          isDarkMode ? "bg-gray-700" : "bg-green-700"
        } transition-colors z-50 flex items-center justify-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
          {cart.length}
        </span>
      </button>

      {/* Fondo oscuro cuando el carrito está abierto */}
      <div
        className={`fixed inset-0 ${
          isDarkMode ? "bg-[var(--fondo)]" : "bg-[var(--fondo)]"
        } bg-opacity-50 transition-opacity ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Contenedor del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-lg transform transition-transform ease-in-out duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Carrito de Compras</h2>

          {/* Botón para cerrar el carrito */}
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Botón para eliminar todo el carrito */}
          <button
            onClick={() => removeAllCart()}
            className="cursor-pointer mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Eliminar todo el carrito
          </button>

          {/* Lista de productos */}
          <div className="overflow-y-auto max-h-[70vh]">
            {cart.map((producto) => {
              if (!producto || !producto.precio || !producto.nombre || !producto.imagen) {
                console.error("Producto mal formado:", producto);
                return null;
              }

              return (
                <div
                  key={producto.id}
                  className={`border rounded-xl shadow-sm p-4 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } flex flex-col items-center mb-4 transition-all duration-200 hover:shadow-md`}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-24 h-24 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold truncate">{producto.nombre}</h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>

                  {/* Input para actualizar la cantidad */}
                  <div className="flex items-center mt-3">
                    <label htmlFor={`quantity-${producto.id}`} className="mr-2">
                      Cantidad:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${producto.id}`}
                      value={producto.quantity}
                      onChange={(e) => updateQuantity(producto.id, parseInt(e.target.value))}
                      min="1"
                      className="w-16 px-2 py-1 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  {/* Botón para eliminar el producto */}
                  <button
                    onClick={() => removeFromCart(producto.id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>

          {/* Precio total del carrito */}
          <div className={`mt-8 p-6 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
            <h3 className="text-xl font-bold">
              Total: <span className="text-green-600">${totalPrice.toLocaleString("es-AR")}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}