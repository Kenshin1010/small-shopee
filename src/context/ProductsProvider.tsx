import { createContext, ReactElement, useEffect, useState } from "react";
import { ProductDataType } from "../components/ProductItem/ProductItem";
import { Book, getNewBooks } from "../services";
import { useData } from "../hooks/useData";

const storedBooks = localStorage.getItem("newBooks");

let newBooks: Book[] = [];
if (storedBooks) {
  newBooks = JSON.parse(storedBooks);
}
const initState = newBooks;

export type UseProductsContextType = { products: ProductDataType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products] = useState<ProductDataType[]>(initState);

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch("http://localhost:5174/products")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message);
  //       });
  //     return data;
  //   };
  //   fetchProducts().then((products) => setProducts(products));
  // }, []);

  const { dataResult, setDataResult } = useData();

  useEffect(() => {
    const fetchNewBooks = async () => {
      const newBooks: Book[] = await getNewBooks();

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
  }, [dataResult]);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
