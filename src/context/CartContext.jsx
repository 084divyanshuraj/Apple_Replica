import { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty <= 0) return state.filter(item => item.id !== id);
      return state.map(item => item.id === id ? { ...item, qty } : item);
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsOpen(true); // open drawer on add
  };

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleCart = () => setIsOpen(prev => !prev);
  const closeCart = () => setIsOpen(false);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{
      items,
      cartCount,
      cartTotal,
      isOpen,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
