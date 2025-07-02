import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const Context = createContext();
const Provider = ({ children }) => {
  const [wishlist, setwishlist] = useState([]);
  const [search, setsearch] = useState("");
  const [productss, setproductss] = useState([])
  return (
    <Context.Provider
      value={{
        wishlist,
        setwishlist,
        search,
        setsearch,
        productss,
        setproductss
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provider;
export const useStateValue = () => {
  return useContext(Context);
};
