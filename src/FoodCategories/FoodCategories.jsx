import React, { useState } from 'react';
import './FoodCategories.css';

const categories = [
  'Breakfast', 'Lunch', 'Brunch', 'Dinner', 'Thali',
  'Dosa', 'Pizza', 'Burger', 'Pasta', 'Momos',
  'Sandwiches', 'Fries & Sides',
  'Desserts', 'Shakes & Smoothies', 'Juices',
  'Cold Drinks & Soda', 'Tea & Coffee',
  'Snacks & Chaat', 'Fried Rice & Noodles',
  'Soups', 'Paneer Dishes', 'Biryani'
];

const FoodCategories = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="food-categories">
      <h2 className="section-title">Explore Categories</h2>
      <div className="categories-grid">
        {visibleCategories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">🍽️</div>
            <span>{category}</span>
          </div>
        ))}
      </div>
      <div>
      <div className="categories-grid">
      <button className="view-btn category-card" onClick={() => setShowAll(!showAll)}>
      {showAll ? 'View Less' : 'View All'}
      </button>
      </div>
      </div>
    </div>
  );
};

export default FoodCategories;
