import React from 'react'

const FoodCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{food.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-red-600 font-bold">₹{food.price}</span>
        <button className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700 transition">
          Add
        </button>
      </div>
    </div>
  </div>
  )
}

export default FoodCard