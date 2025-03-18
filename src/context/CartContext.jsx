import { createContext, useState, useEffect } from "react";

// 1. Crear el contexto
export const CartContext = createContext(); 

// Crear el proveedor del contexto
export const CartProvider = ({ children }) => {
  // Estado para manejar el carrito
  const [cart, setCart] = useState(() => {
    //  Inicializar el carrito con los datos del localStorage o un array vacío
    return JSON.parse(localStorage.getItem("cart")) || [];
  });



  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
 
  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscar si el producto ya está en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // si el producto ya está en el carrito, incrementar su cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

  const removeAllCart = () =>{
    localStorage.clear();
    setCart([]);
  }
  //  Calcular el precio total del carrito
  const totalPrice = cart.reduce((total, product) => total + product.precio * product.quantity, 0);
  // Proveer el valor del contexto a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity,removeAllCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};