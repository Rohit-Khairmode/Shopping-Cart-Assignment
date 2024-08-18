"use client";
import { createContext, useContext, useState } from "react";

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  cartItems: number;
  setCartItems: any;
};

// The context is created with `| null` in the type, to accurately reflect the default value.
const CartItemsQuantityContext = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
function CartItemContextProvider({ children }: any) {
  const [cartItems, setCartItems] = useState(0);
  return (
    <CartItemsQuantityContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemsQuantityContext.Provider>
  );
}
const useCartItemsQuantity = () => {
  const object = useContext(CartItemsQuantityContext);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};

export { CartItemContextProvider, useCartItemsQuantity };
