// code lama
// import { useContext, Fragment } from "react";
// import {Link} from 'react-router-dom';

// code baru
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import "./shop.styles.scss";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>

        // Code Lama
        // <div className="products-container">
        //     {
        //         products.map((product) => {
        //             return <ProductCard product={product} key={product.id}/>
        //         })
        //     }
        // </div>
    )
}

export default Shop;