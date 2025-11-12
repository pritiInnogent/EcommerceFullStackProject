import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

function ProfileMenu({ onClose }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button className="menu-item" onClick={() => handleNavigation('/profile')}>
          <span className="icon"><i className="bi bi-person-circle"></i> Profile</span>
      </button>
      <button className="menu-item" onClick={() => handleNavigation('/orders')}>
          <span className="icon"><i className="bi bi-bag-check"></i> My Orders</span>
      </button>
      <button className="menu-item" onClick={() => alert('Logout clicked')}>
          <span className="icon"><i className="bi-box-arrow-in-right"></i> Logout</span>
      </button>
    </div>
  );
}

export default ProfileMenu;
