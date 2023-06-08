import { createContext, useState } from "react";
import SHOP_DATA from "../shopdata.json";

export const ProductsContext = createContext({
    products: [],
});

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = {products};

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
