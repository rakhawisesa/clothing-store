import "./category-preview.styles.scss";
import ProductCard from "../../components/product-card/product-card.component";
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">
            <div className="header">
                <h2>
                    {title.toUpperCase()}
                </h2>
                <Link to={title}>
                    <span className="show-all-button">Show All</span>
                </Link>
            </div>
            <div className="preview">
                {
                    products.filter((_, idx) => idx < 4).map((product) => {
                        return <ProductCard product={product} key={product.id}/>
                    })  
                }
            </div>
        </div>
    )
}

export default CategoryPreview;