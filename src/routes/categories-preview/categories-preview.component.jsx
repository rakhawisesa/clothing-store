// code lama
// import { useContext, Fragment } from "react";
// import {Link} from 'react-router-dom';

// code baru
import { useContext, Fragment } from "react";
import { ProductsContext } from "../../contexts/products.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

/*
    Untuk menampilkan preview dari beragam products,
    yang mana hanya menampilkan 4 buah item dari tiap
    products
*/

const CategoriesPreview = () => {
    const {products} = useContext(ProductsContext)

    return (
        <Fragment>
            {
                Object.keys(products).map((title) => {
                    const detailProducts = products[title];
                    return <CategoryPreview products={detailProducts} title={title} key={title}/>
                })
            }    
        </Fragment>

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

export default CategoriesPreview;