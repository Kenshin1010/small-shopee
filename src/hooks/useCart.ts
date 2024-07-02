import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

const useCart = (): UseCartContextType => {
  const {
    cartProductItems,
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    totalUniqueItems,
  } = useContext(CartContext);

  return {
    cartProductItems,
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    totalUniqueItems,
  };
};

export default useCart;
