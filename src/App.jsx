import React, { useContext } from 'react';
import { productos } from './components/Lista';
import { Productos } from './components/ProductList';
import { CartProvider } from './context/CartContext';
import { Carrito } from './components/Cart';
import { ColorProvider, ColorContext } from './context/ThemeContext';
import { ThemeToggleButton } from './components/TheButton';

function App() {
  return (
    <ColorProvider>
      <MainContent />
    </ColorProvider>
  );
}

// Componente separado para el contenido principal
function MainContent() {
  // Usa el contexto
  const { isDarkMode } = useContext(ColorContext);
  return (
    <main className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <ThemeToggleButton />
      <CartProvider>
        <Carrito />
        <Productos productos={productos} />
      </CartProvider>
    </main>
  );
}

export default App;