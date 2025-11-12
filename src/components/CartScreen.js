import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, applyPromoCode } from '../redux/cartSlice';
import { validatePromoCode } from '../services/api';
import './CartScreen.css';

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, discount } = useSelector((state) => state.cart);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      if (window.confirm('Remove this item from cart?')) {
        dispatch(removeFromCart(id));
      }
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleApplyPromo = async () => {
    try {
      setPromoError('');
      const promoData = await validatePromoCode(promoInput);
      if (promoData.valid) {
        dispatch(applyPromoCode({ code: promoData.code, discount: promoData.discount }));
        alert(`Promo code applied! ${promoData.discount}% discount`);
      }
      if(!promoData.valid){
          alert("Invalid Promo Code!")
      }
    } catch (error) {
      setPromoError('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="primary-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                      <span className="icon-minus"><i className="bi bi-dash-lg"></i></span>
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                      <span className="icon-minus"><i className="bi bi-plus-lg"></i></span>
                  </button>
                </div>
                
                <p className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                    <span className="icon"><i className="bi bi-trash"></i></span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="promo-section">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoInput}
              onChange={
                (e) => {
                    setPromoInput(e.target.value)
                }
            }
            />
            <button onClick={handleApplyPromo} className="primary-btn">
              Apply
            </button>
            {promoError && <p className="error-text">{promoError}</p>}
          </div>
          
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="summary-line discount">
              <span>Discount ({discount}%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="summary-line total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
