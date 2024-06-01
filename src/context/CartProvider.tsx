import { createContext, ReactElement, useMemo, useReducer } from "react";
import { ProductItemCartType } from "../components/ProductItemCart/ProductItemCart";

type CartStateType = { cart: ProductItemCartType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: ProductItemCartType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      const { isbn13, title, price } = action.payload.product;
      const updatedCart = updateCart(state.cart, isbn13, title, price, 1);
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      const { isbn13 } = action.payload.product;
      const updatedCart = removeCartItem(state.cart, isbn13);
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      const { isbn13, quantity } = action.payload.product;
      const updatedCart = updateCartItemQuantity(state.cart, isbn13, quantity);
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

// Hàm cập nhật giỏ hàng
const updateCart = (
  cart: ProductItemCartType[],
  isbn13: number,
  title: string,
  price: string,
  quantityDelta: number
) => {
  const itemExists = cart.find((item) => item.product.isbn13 === isbn13);
  const quantity = itemExists ? itemExists.product.quantity + quantityDelta : 1;
  const updatedItem = { isbn13, title, price, quantity };
  const updatedCart = itemExists
    ? cart.map((item) => (item.product.isbn13 === isbn13 ? updatedItem : item))
    : [...cart, updatedItem];
  return updatedCart;
};

// Hàm xóa một mục từ giỏ hàng
const removeCartItem = (cart: ProductItemCartType[], isbn13: number) => {
  return cart.filter((item) => item.product.isbn13 !== isbn13);
};

// Hàm cập nhật số lượng của một mục trong giỏ hàng
const updateCartItemQuantity = (
  cart: ProductItemCartType[],
  isbn13: number,
  quantity: number
) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const itemExists = cart.find((item) => item.product.isbn13 === isbn13);
  if (!itemExists) {
    throw new Error("Item must exists in order to update quantity");
  }
  const updatedItem = { ...itemExists, quantity };
  const updatedCart = cart.map((item) =>
    item.product.isbn13 === isbn13 ? updatedItem : item
  );
  return updatedCart;
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.product.quantity;
  }, 0);
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return (
        previousValue +
        cartItem.product.quantity * parseInt(cartItem.product.price)
      );
    }, 0)
  );

  const cart = state.cart;

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
