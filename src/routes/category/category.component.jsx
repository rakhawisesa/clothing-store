import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

/*
    Untuk menampilkan detail dari sebuah product,
    contoh menampilkan hanya product hats
*/
const Category = () => {
    /* 
        Untuk menangkap route parameter yang berada di 
        component 'shop'
    */
    const {category} = useParams();

    const {products} = useContext(ProductsContext);

    /*
        Pada component ini menggunakan 'useState' dan 'useEffect'
        untuk mendapatkan detail product karena agar melakukan
        pemanggilan detail product hanya ketika route param
        'category' / isi dari 'products' berubah, bukan saat
        dilakukan render ulang.
    */
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        setDetailProduct(products[category]);
    }, [category, products]);

    return (
        <div className="category-detail">
            <h2 className="header">{category.toUpperCase()}</h2>
            <div className="category-detail-container">
                {
                    /*
                        adanya 'detailProduct' disini dikarenakan safeguard, yang artinya
                        component tidak akan ditampilkan sebelum asynchronous fetching data
                        dari API berhasil dilakukan
                    */
                    detailProduct &&
                    detailProduct.map((item) => {
                        return (
                            <ProductCard product={item} key={item.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Category;