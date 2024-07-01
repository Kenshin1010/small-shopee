import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ProductItemCartType } from "../components/ProductItemCart/ProductItemCart";
import { useData } from "../hooks/useData";

type CartStateType = { cart: ProductItemCartType[] };

const initCartState: CartStateType = { cart: [] };

export const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
  UPDATE: "UPDATE",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: {
    product?: ProductItemCartType["product"];
  };
};

const cartReducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      const { product } = action.payload || {};
      if (!product) {
        console.error("Action payload or product is missing", action);
        return state;
      }

      const existingItemIndex = state.cart.findIndex(
        (item) => item.product._id === product._id
      );
      if (existingItemIndex !== -1) {
        // Update existing item in cart
        const updatedItem = {
          ...state.cart[existingItemIndex],
          product: {
            ...state.cart[existingItemIndex].product,
            price: product.price, // Update price here
          },
        };
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = updatedItem;
        return { ...state, cart: updatedCart };
      } else {
        // Add new item to cart
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              product: {
                ...product,
                quantity: 1, // Assuming default quantity is 1 when adding new item
              },
              dispatch: () => {}, // Provide a placeholder dispatch function
              REDUCER_ACTIONS: REDUCER_ACTION_TYPE, // Provide the reducer actions enum
            },
          ],
        };
      }
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
    case REDUCER_ACTION_TYPE.UPDATE: {
      if (!action.payload || !action.payload.product) {
        console.error("Action payload or product is missing", action);
        return state;
      }

      const { product } = action.payload;
      const updatedCart = updateCart(
        state.cart,
        product._id ?? "",
        product.isbn13 ?? 0,
        product.title,
        product.price,
        product.image,
        0 // quantityDelta is 0 because we're updating existing product
      );

      return { ...state, cart: updatedCart };
    }

    default:
      console.error("Unidentified reducer action type");
      return { ...state };
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
    console.error("Some parameters are undefined");
    return cart;
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
    console.error("ID is undefined");
    return cart;
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
    console.error("ID or quantity is undefined");
    return cart;
  }
  if (quantity <= 0) {
    console.error("Quantity must be greater than 0");
    return cart;
  }
  const itemExists = cart.find((item) => item.product._id === _id);
  if (!itemExists) {
    console.error("Item must exist in order to update quantity");
    return cart;
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

const useCartContext = () => {
  const [state, dispatch] = useReducer(cartReducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => REDUCER_ACTION_TYPE, []);

  const totalItems = useMemo(
    () => state.cart.reduce((acc, item) => acc + item.product.quantity, 0),
    [state.cart]
  );

  const cart = useMemo(
    () =>
      state.cart.map((item) => ({
        ...item,
        dispatch,
        REDUCER_ACTIONS,
      })),
    [state.cart, REDUCER_ACTIONS]
  );

  const totalPrice = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(
      state.cart.reduce((total, item) => {
        const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
        return total + item.product.quantity * price;
      }, 0)
    );
  }, [state.cart]);

  const totalUniqueItems = useMemo(() => cart.length, [cart]);

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
  const [, dispatch] = useReducer(cartReducer, initCartState);
  const { dataResult } = useData();

  useEffect(() => {
    if (dataResult) {
      const updatedProductsCart = dataResult.map((productData) => {
        const product = {
          _id: productData._id,
          isbn13: productData.isbn13,
          title: productData.title,
          price: productData.price,
          image: productData.image,
          quantity: productData.quantity || 1,
        };

        return {
          product,
          dispatch: () => {},
          REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
        };
      });

      updatedProductsCart.forEach((updatedProduct) => {
        dispatch({
          type: REDUCER_ACTION_TYPE.UPDATE,
          payload: { product: updatedProduct.product },
        });
      });
    }
  }, [dataResult, dispatch, REDUCER_ACTION_TYPE]);

  const contextValue = useCartContext();
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
