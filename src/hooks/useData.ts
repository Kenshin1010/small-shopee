import { useContext } from "react";
import { Data, DataContext } from "../context/DataProvider";

export const useData = (): Data => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
