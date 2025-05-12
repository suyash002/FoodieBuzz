🍽️ Food Delivery App
A modern food delivery platform built with React, Redux Toolkit, and Firebase Authentication. Users can browse recipes, view detailed dish information, manage their cart, and place orders seamlessly.

📸 Demo

🚀 Features
Recipe Explorer: Browse a variety of recipes fetched from DummyJSON.

Dish Details: View comprehensive details of each dish, including ingredients, preparation steps, and nutritional information.

User Authentication: Secure login and registration using Firebase Authentication.

Cart Management: Add, remove, and adjust quantities of items in the cart with real-time updates.

Responsive Design: Optimized for both desktop and mobile devices.

Notifications: Real-time feedback using react-toastify for actions like adding items to the cart or login status.

🛠️ Tech Stack
Frontend: React, React Router DOM

State Management: Redux Toolkit

Authentication: Firebase Authentication

Styling: CSS Modules

Notifications: React Toastify

API: DummyJSON Recipes API

🧪 Usage
Browse Recipes: Navigate to the homepage to view a list of available recipes.

View Dish Details: Click on a recipe to see detailed information.

Add to Cart: Click "Add to Cart" to include the dish in your cart. If not logged in, you'll be redirected to the login page.

Manage Cart: Adjust quantities or remove items directly from the cart page.

Authentication: Register or log in to manage your cart and place orders.

🔐 Authentication Flow
Protected Routes: Certain routes like /cart are protected and require authentication.

Redirects: Unauthenticated users attempting to access protected routes are redirected to the /auth page.

State Management: Authentication state is managed using Redux, ensuring consistent access across components.

🗂️ Project Structure
food-delivery-app/
├── public/
├── src/
│   ├── Components/
│   │   ├── DishDetails/
│   │   └── RestaurantSection/
│   ├── Config/
│   │   └── firebase.js
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── cartSlice.js
│   │   └── store.js
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgements
DummyJSON for providing the recipe API.

React Toastify for elegant notifications.

Firebase for authentication services.
