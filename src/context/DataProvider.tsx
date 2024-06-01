import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ProductDataType } from "../components/ProductItem/ProductItem";

export interface Data {
  searchResult: ProductDataType[];
  dataResult: ProductDataType[];
  setSearchResult?: Dispatch<SetStateAction<ProductDataType[]>>;
  setDataResult?: Dispatch<SetStateAction<ProductDataType[]>>;
}

export const DataContext = createContext<Data | undefined>(undefined);

// type ChildrenType = { children?: ReactElement | ReactElement[] };
// export const DataProvider = ({ children }: ChildrenType): ReactElement => {

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<ProductDataType[]>([]);
  const [dataResult, setDataResult] = useState<ProductDataType[]>([]);

  const value: Data = {
    searchResult,
    dataResult,
    setSearchResult,
    setDataResult,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
