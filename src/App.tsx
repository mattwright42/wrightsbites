import React, { useState } from 'react';
import { ShoppingCart, Cookie, Star } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheckoutButton } from './components/CheckoutButton';
import { Success } from './pages/Success';
import { Cancel } from './pages/Cancel';
import { products } from './stripe-config';

interface CartItem {
  quantity: number;
  price: number;
}

function App() {
  const [cart, setCart] = useState<CartItem>({ quantity: 0, price: 3.00 });
  
  const addToCart = () => {
    setCart(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const removeFromCart = () => {
    setCart(prev => ({ ...prev, quantity: Math.max(0, prev.quantity - 1) }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/" element={
          <div className="min-h-screen bg-amber-50">
            {/* Header */}
            <header className="bg-amber-900 text-white py-4 px-6 shadow-lg">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Cookie className="h-8 w-8" />
                  <h1 className="text-2xl font-bold">Wright's Bites Cookies</h1>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="bg-amber-700 px-2 py-1 rounded-full">
                    {cart.quantity}
                  </span>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
                alt="Chocolate Chip Cookies"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Freshly Baked Perfection</h2>
                  <p className="text-xl">Handcrafted chocolate chip cookies made with love</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto py-12 px-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* The Big One */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                  <div className="flex flex-col gap-6">
                    <img 
                      src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35"
                      alt="The Big One Cookie"
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Chocolate Chip Cookie (The Big One)</h3>
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="ml-2 text-gray-600">(128 reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-6">
                        {products['Chocolate Chip Cookie (The Big One)'].description}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-amber-900">$3.00</span>
                        <span className="text-gray-500">per cookie</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={removeFromCart}
                          className="px-4 py-2 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-900 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold">{cart.quantity}</span>
                        <button 
                          onClick={addToCart}
                          className="px-4 py-2 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-900 hover:text-white transition-colors"
                        >
                          +
                        </button>
                        <CheckoutButton 
                          product={products['Chocolate Chip Cookie (The Big One)']}
                          quantity={cart.quantity}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delicious Dozen */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                  <div className="flex flex-col gap-6">
                    <img 
                      src="https://images.unsplash.com/photo-1545015451-f05567aa6bcc"
                      alt="Delicious Dozen Cookies"
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Delicious Dozen</h3>
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="ml-2 text-gray-600">(96 reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-6">
                        {products['Delicious Dozen'].description}
                      </p>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-amber-900">$10.00</span>
                        <span className="text-gray-500">per dozen</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckoutButton 
                          product={products['Delicious Dozen']}
                          quantity={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-amber-900 text-white py-8 px-6 mt-12">
              <div className="max-w-6xl mx-auto text-center">
                <p>&copy; 2025 Wright's Bites Cookies. All rights reserved.</p>
              </div>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;