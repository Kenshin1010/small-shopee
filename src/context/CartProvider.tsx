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
  payload?: { product: ProductItemCartType["product"] };
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload || !action.payload.product) {
        console.error("Action payload or product is missing", action);
        return state;
      }

      const _id: string | undefined = action.payload?.product?._id;
      const isbn13: number | undefined = action.payload?.product?.isbn13;
      const title = action.payload?.product?.title;
      const price = action.payload?.product?.price;
      const image = action.payload?.product?.image;
      const quantity = action.payload?.product?.quantity;

      if (
        _id === undefined ||
        isbn13 === undefined ||
        title === undefined ||
        price === undefined ||
        image === undefined ||
        quantity === undefined
      ) {
        console.error("Some parameters are undefined", action);
        return state;
      }

      const updatedCart = updateCart(
        state.cart,
        _id,
        isbn13,
        title,
        price,
        image,
        1
      );
      console.log("Quantity: ", quantity);

      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload || !action.payload.product) {
        console.error("Action payload or product is missing", action);
        return state;
      }
      const { _id } = action.payload.product;
      const updatedCart = removeCartItem(state.cart, _id ?? "");
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload || !action.payload.product) {
        console.error("Action payload or product is missing", action);
        return state;
      }
      const { _id, quantity } = action.payload.product;
      const updatedCart = updateCartItemQuantity(
        state.cart,
        _id ?? "",
        quantity
      );
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

// Update cart
const updateCart = (
  cart: ProductItemCartType[],
  _id: string,
  isbn13: number,
  title: string,
  price: string,
  image: string,
  quantityDelta: number
) => {
  if (
    _id === undefined ||
    isbn13 === undefined ||
    title === undefined ||
    price === undefined ||
    image === undefined
  ) {
    throw new Error("Some parameters are undefined");
  }
  const itemExists = cart.find((item) => item.product._id === _id);
  const quantity = itemExists ? itemExists.product.quantity + quantityDelta : 1;
  const updatedItem: ProductItemCartType = {
    product: { _id, isbn13, title, price, quantity, image },
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  };
  const updatedCart = itemExists
    ? cart.map((item) => (item.product._id === _id ? updatedItem : item))
    : [...cart, updatedItem];
  return updatedCart;
};

// Remove cart item
const removeCartItem = (cart: ProductItemCartType[], _id: string) => {
  if (_id === undefined) {
    throw new Error("ID is undefined");
  }
  return cart.filter((item) => item.product._id !== _id);
};

// Update cart item quantity
const updateCartItemQuantity = (
  cart: ProductItemCartType[],
  _id: string,
  quantity: number
) => {
  if (_id === undefined || quantity === undefined) {
    throw new Error("ID or quantity is undefined");
  }
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const itemExists = cart.find((item) => item.product._id === _id);
  if (!itemExists) {
    throw new Error("Item must exists in order to update quantity");
  }
  const updatedItem: ProductItemCartType = {
    ...itemExists,
    product: { ...itemExists.product, quantity },
  };
  const updatedCart = cart.map((item) =>
    item.product._id === _id ? updatedItem : item
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
      const priceCartItemAsString = cartItem.product.price.replace(
        /[^0-9.-]+/g,
        ""
      );
      const priceCartItemAsNumber = parseFloat(priceCartItemAsString);
      return previousValue + cartItem.product.quantity * priceCartItemAsNumber;
    }, 0)
  );

  const cart = state.cart.map((item) => ({
    ...item,
    dispatch,
    REDUCER_ACTIONS,
  }));

  const totalUniqueItems = cart.length;

  return {
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    cart,
    totalUniqueItems,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
  totalUniqueItems: 0,
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  const contextValue = useCartContext(initCartState);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
