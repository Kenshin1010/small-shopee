import { createContext, ReactElement, useEffect, useState } from "react";
import { ProductDataType } from "../components/ProductItem/ProductItem";
import { Book, getNewBooks } from "../services";
import { useData } from "../hooks/useData";

let newBooks: Book[] = [];

(async () => {
  try {
    newBooks = await getNewBooks();
  } catch (error) {
    console.error("Error fetching new books:", error);
  }
})();

const initState = newBooks;

export type UseProductsContextType = { products: ProductDataType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products] = useState<ProductDataType[]>(initState);

  const { setDataResult } = useData();

  useEffect(() => {
    const fetchNewBooks = async () => {
      const newBook: ProductDataType[] = newBooks.map((data, index) => ({
        index: index,
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        isbn13: data.isbn13,
        price: data.price,
        image: data.image,
        url: data.url,
      }));

      setDataResult?.(newBook);
    };

    fetchNewBooks();
  }, [setDataResult]);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
