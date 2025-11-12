import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
function ProductCard( {product} ) {

  const dispatch = useDispatch();
  const HandleAddToCart= (e) => {
          e.preventDefault();
         dispatch(addToCart(product));
         alert('Product added to cart!');
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.image}
            alt={product.title} 
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-rating">
            <span className="rating-star"> <i className="bi bi-star-fill"></i></span>
            <span>{product.rating} / 5</span>
          </div>
          <div className="product-footer">
            <p className="product-price">₹{product.price}</p>
          </div>
          <div>
            <button className='add-cart-btn' onClick={HandleAddToCart}>
             Add to cart
            </button>
         </div>
        </div>
      </div>
    </Link>
   
  );
}

export default ProductCard;
