import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FoodDelivery.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestaurantSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const additionalPrice = 50;
  const handleAddToCart = (recipe) => {
    const cartItem = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      price: recipe.caloriesPerServing + additionalPrice,
    };
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart!");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleGoTodish = (id) => {
    navigate(`/dish/${id}`);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p className="loading">Loading recipes...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="restaurant-section">
      <h2 className="section-title">Recipe Explorer</h2>
      <div className="restaurant-grid">
        {recipes.map((recipe) => {
          const existingItem = cartItems.find(item => item.id === recipe.id);
          const quantity = existingItem ? existingItem.quantity : 0;

          return (
            <div className="restaurant-card" key={recipe.id}>
            <div onClick={() => handleGoTodish(recipe.id)}>
                <img src={recipe.image} alt={recipe.name} className="restaurant-image" />
              </div>
              <div className="restaurant-info">
                <h3>{recipe.name}</h3>
                <p>{recipe.cuisine}</p>
                <div className="restaurant-meta">
                <h4>₹{recipe.caloriesPerServing + 50}</h4>
                  <span>⭐ {recipe.rating}</span>
                  <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                </div>
                
                <p>Calories: {recipe.caloriesPerServing}</p>
                <div className="button-container">
                  {quantity > 0 ? (
                    <div className="quantity-controls">
                      <button className="btn secondary" onClick={() => handleDecrement(recipe.id)}>-</button>
                      <span>{quantity}</span>
                      <button className="btn secondary" onClick={() => handleIncrement(recipe.id)}>+</button>
                    </div>
                  ) : (
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(recipe)}>Add to Cart</button>
                  )}
                  <button className="go-to-cart-btn" onClick={handleGoToCart}>Go to Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantSection;
