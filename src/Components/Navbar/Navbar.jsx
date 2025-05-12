// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { auth } from '../../Config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../../redux/slices/authSlice";
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dishes = useSelector((state) => state.dishes.allDishes);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  const handleLogin = () => {
    dispatch(setLoginState(true));
    navigate("/auth");
  };

  const handleSignup = () => {
    dispatch(setLoginState(!isLogin));
    navigate("/auth");
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredDishes([]);
    } else {
      const filtered = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDishes(filtered);
    }
  };

  const handleDishSelect = (dishId) => {
    setSearchTerm('');
    setFilteredDishes([]);
    navigate(`/dish/${dishId}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
          🍔 FoodieBuzz
        </div>

        <div className="search-bar">
          <div className="location">
            📍&nbsp;<input type="text" placeholder="Indore" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or dish"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {filteredDishes.length > 0 && (
              <ul className="search-dropdown">
                {filteredDishes.map((dish) => (
                  <li
                    key={dish.id}
                    onClick={() => handleDishSelect(dish.id)}
                    className="search-dropdown-item"
                  >
                    {dish.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="nav-links">
          <button className='orderbtn' onClick={() => navigate('/orders')}>
            Orders
          </button>
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            <FaShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
          {isLoggedIn ? (
            <div className="user" onClick={toggleDropdown} ref={dropdownRef}>
              <img src="https://i.pravatar.cc/30" alt="User" />
              <span>{userEmail.split('@')[0]} ⌄</span>
              {dropdownOpen && (
                <div className="dropdown">
                  <a href="#">My Profile</a>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignup}>Signup</button>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div><div></div><div></div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#">Orders</a>
          <a href="#">Bookmarks</a>
          {isLoggedIn ? (
            <>
              <a href="#">My Profile</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignup}>Signup</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
