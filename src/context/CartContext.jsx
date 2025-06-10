import {createContext, useReducer, useContext} from 'react';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? {...item, qty: item.qty + 1} : item
        );
      }
      return [...state, {...action.payload, qty: 1}];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QTY':
      return state.map(item =>
        item.id === action.payload.id
          ? {...item, qty: Math.max(1, action.payload.qty)}
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const handleAddToCart = (product) => {
    dispatch({type: 'ADD_ITEM', payload: product });
  };
  const handleChangeQty = (id, qty) => {
    dispatch({type: 'UPDATE_QTY', payload: { id, qty }});
  };
  const handleRemove = (id) => {
    dispatch({type: 'REMOVE_ITEM', payload: id});
  };
  const handleClear = () => {
    dispatch({type: 'CLEAR_CART'});
  };
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{cart, cartCount, handleAddToCart, handleChangeQty, handleRemove, handleClear}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 
