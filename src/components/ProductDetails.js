import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getProductById, getProductsByCategory} from '../services/api';
import { addToCart } from '../redux/cartSlice';
import './ProductDetails.css';
import ProductCard from "./ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);


    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
            setLoading(false);

            if (data.category) {
                const categoryProducts = await getProductsByCategory(data.category);

                // Filter out current product and limit to 4 recommendations
                const filtered = categoryProducts
                    .filter(p => p.id !== data.id)
                    .slice(0, 4);

                setRecommendedProducts(filtered);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };


  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert('Product added to cart!');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Products
      </button>
      
      <div className="product-details">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-details-info">
          <span className="product-details-category">{product.category}</span>
          <h1 className="product-details-title">{product.title}</h1>
          
          <div className="product-details-rating">
             {product.rating} ({product.rating.count} reviews)
          </div>
          
          <p className="product-details-price">${product.price}</p>
          
          <p className="product-details-description">{product.description}</p>
          
          <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
          {recommendedProducts.length > 0 && (
              <div className="recommended-section">
                  <h2>You Might Also Like</h2>
                  <p className="recommended-subtitle">
                      Similar products in {product.category}
                  </p>
                  <div className="recommended-products">
                      {recommendedProducts.map((recommendedProduct) => (
                          <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
                      ))}
                  </div>
              </div>
          )}
    </div>
  );
}

export default ProductDetails;
