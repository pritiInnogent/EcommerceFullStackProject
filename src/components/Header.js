
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import './Header.css';

function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
        <div className="header-container">
            <div className="logo">
                <Link to="/" className="logo">
                    <img src="/images/logo.png" alt="PrettyFinds Logo" className="logo-image" />
                    <h1>PrettyFinds</h1>
                </Link>
            </div>

            <nav className="header-nav">
                <Link to="/cart" className="icon-button">
                    <span className="icon-cart"><i className="bi bi-cart4"></i> </span>
                    {cartItemCount > 0 && (
                        <span className="badge">{cartItemCount}</span>
                    )}
                </Link>

                <button className='icon-button' onClick={() => console.log("")}>
                    <span className="icon"><i className="bi bi-bell"></i></span>
                </button>

                <div className="profile-wrapper">
                    <button
                        className="icon-button"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <span className="icon"><i className="bi bi-person-circle"></i></span>
                    </button>
                    {showProfileMenu && (
                        <ProfileMenu onClose={() => setShowProfileMenu(false)}/>
                    )}
                </div>
            </nav>
            </div>
    </header>
);
}

export default Header;
