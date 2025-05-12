import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './index.css';
import Footer from './Components/Footer/Footer';
import Slider from './Components/Slider/Slider';
import FoodCategories from './FoodCategories/FoodCategories';
import RestaurantSection from './FoodDeliveryRestaurants/FoodDeliveryCard';
import AuthPage from './Components/Auth/AuthPage.jsx';
import DishDetails from './DishDetails/DishDetails'; 
import CartPage from './CartPage/CartPage.jsx';
import OrdersPage from './orderPage/orderPage.jsx';
import { fetchDishes } from './redux/slices/dishSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const Home = () => (
  <>
    <Slider />
    <FoodCategories />
    <RestaurantSection />
    <Footer />
  </>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dish/:id" element={<DishDetails />} /> 
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
         <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </Router>
  );
};

export default App;
