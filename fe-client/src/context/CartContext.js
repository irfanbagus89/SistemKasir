import { createContext, useReducer, useContext } from 'react'

const CartContext = createContext(null);
const CartDispatchContext = createContext(null)

const cartReducer = (carts, action) => {
  switch (action.type) {
    case 'add': {
      const index = carts.findIndex((obj) => obj.id === action.payload.id)
      if (index === -1) {
        return [...carts, {...action.payload, quantity: 1}]
      } else {
        return carts.map((cart) => {
          if (cart.id === action.payload.id) {
            return { ...cart, quantity: cart.quantity + 1}
          } else {
            return cart
          }
        })
      }
    }
    case 'decrease': {
      const index = carts.findIndex((obj) => obj.id === action.payload.id)
      if (index !== -1) {
        if (carts[index].quantity === 1) {
          return carts.filter((obj) => obj.id !== action.payload.id)
        } else {
          return carts.map((cart) => {
            if (cart.id === action.payload.id) {
              return { ...cart, quantity: cart.quantity - 1}
            } else {
              return cart
            }
          })
        }
      }
    }
    case 'clear': {
      return []
    }
    default: {
      throw Error('Error')
    }
  }
}

const initialState = []

const CartProvider = ({ children }) => {
  const [carts, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext)
}
export const useCartDispatch = () => {
  return useContext(CartDispatchContext)
}