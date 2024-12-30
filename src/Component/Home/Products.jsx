import React from 'react';

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 bg-gray-100">
      {[...Array(8)].map((_, index) => (
        <div
          className="relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-br from-white to-gray-100 cursor-pointer group"
          key={index}
        >
          <div className="relative overflow-hidden border-b-4 border-teal-500">
            <img
              src={
                index === 0
                  ? "https://i.pinimg.com/564x/e4/a4/5c/e4a45cb6f4902f67710f69e57f38b847.jpg"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/640px-Aspect-ratio-16x9.svg.png"
              }
              alt="Product"
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-teal-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-white text-2xl font-bold text-center px-4 mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore More</p>
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold text-gray-800 capitalize transition-colors duration-300 group-hover:text-teal-600">Luxury Product {index + 1}</h3>
            <div className="flex justify-between text-gray-600 mt-3">
              <span className="font-bold text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-bold text-teal-600 group-hover:text-teal-800 transition-colors duration-300">$30.00</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;


