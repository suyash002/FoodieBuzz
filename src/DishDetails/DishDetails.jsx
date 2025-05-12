// src/DishDetails/DishDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DishDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DishDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user); 
  const cartItems = useSelector((state) => state.cart.cartItems);
  const existingItem = cartItems.find(item => item.id === parseInt(id));
  const quantity = existingItem ? existingItem.quantity : 0;

  const additionalPrice = 50; // You can adjust this value if needed

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await res.json();
        setDish(data);
      } catch (err) {
        setError("Failed to load dish details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      id: dish.id,
      name: dish.name,
      image: dish.image,
      price: dish.caloriesPerServing + additionalPrice, // Adding extra price if needed
    };
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(dish.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(dish.id));
  };

  if (loading) return <div className="loader">Loading dish...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!dish) return null;

  return (
    <div className="dish-detail-container">
      <div className="dish-banner">
        <img src={dish.image} alt={dish.name} className="dish-img" />
        <div className="dish-basic-info">
          <h1>{dish.name}</h1>
          <p className="cuisine">{dish.cuisine} • {dish.mealType.join(', ')}</p>
          <div className="ratings">
            ⭐ {dish.rating} / 5 ({dish.reviewCount} reviews)
          </div>
          <div className="tags">
            {dish.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
          
          {/* Displaying Price */}
          <div className="price">
            <h3>₹{dish.caloriesPerServing + additionalPrice}</h3>
          </div>

          <div className="dish-buttons">
            {quantity > 0 ? (
              <div className="quantity-controls">
                <button className="btn secondary" onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button className="btn secondary" onClick={handleIncrement}>+</button>
              </div>
            ) : (
              <button className="btn primary" onClick={handleAddToCart}>Add to Cart</button>
            )}
            <button className="btn secondary" onClick={() => navigate("/cart")}>Go to Cart</button>
          </div>
        </div>
      </div>

      <div className="dish-meta">
        <div><strong>Prep Time:</strong> {dish.prepTimeMinutes} mins</div>
        <div><strong>Cook Time:</strong> {dish.cookTimeMinutes} mins</div>
        <div><strong>Servings:</strong> {dish.servings}</div>
        <div><strong>Calories/Serving:</strong> {dish.caloriesPerServing} kcal</div>
        <div><strong>Difficulty:</strong> {dish.difficulty}</div>
      </div>

      <div className="dish-meta-section-row">
        <div className="dish-section">
          <h2>Ingredients</h2>
          <ul>
            {dish.ingredients.map((item, i) => (
              <li key={i}>🧂 {item}</li>
            ))}
          </ul>
        </div>

        <div className="dish-section">
          <h2>Instructions</h2>
          <ol>
            {dish.instructions.map((step, i) => (
              <li key={i}>👉 {step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
