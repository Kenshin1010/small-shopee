import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

const useCart = (): UseCartContextType => {
  const {
    cart,
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    totalUniqueItems,
  } = useContext(CartContext);

  return {
    cart,
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    totalUniqueItems,
  };
};

export default useCart;
