import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Leaf, Coffee, Utensils, Flame, ShoppingCart, Plus, Minus, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuData = [
  {
    category: "Idli & Vada",
    icon: <Leaf className="w-5 h-5" />,
    items: [
      { name: "Steamed Idli (2 pcs)", description: "Soft, fluffy steamed rice cakes served with sambar and coconut chutney.", price: "₹60", tag: "Healthy" },
      { name: "Medu Vada (2 pcs)", description: "Crispy deep-fried lentil doughnuts, soft on the inside.", price: "₹70" },
      { name: "Idli Vada Mix", description: "One piece of soft idli and one piece of crispy vada.", price: "₹75", tag: "Popular" },
      { name: "Ghee Podi Idli", description: "Mini idlis tossed in clarified butter and spicy Malgapodi (gun powder).", price: "₹95", tag: "Spicy" },
    ]
  },
  {
    category: "Crispy Dosas",
    icon: <Utensils className="w-5 h-5" />,
    items: [
      { name: "Sada Dosa", description: "Thin, crispy crepe made from fermented rice and lentil batter.", price: "₹80" },
      { name: "Masala Dosa", description: "Classic dosa stuffed with a spiced potato and onion filling.", price: "₹110", tag: "Bestseller" },
      { name: "Mysore Masala Dosa", description: "Spicy red chutney spread inside, stuffed with potato masala.", price: "₹130", tag: "Spicy" },
      { name: "Rava Onion Masala", description: "Crispy semolina dosa with onions, green chilies, and potato filling.", price: "₹140" },
      { name: "Cheese Burst Dosa", description: "Fusion dosa loaded with grated cheese and special spices.", price: "₹160" },
    ]
  },
  {
    category: "Uthappams",
    icon: <Flame className="w-5 h-5" />,
    items: [
      { name: "Plain Uthappam", description: "Thick, soft savory pancake served with sambar and chutneys.", price: "₹90" },
      { name: "Onion Tomato Uthappam", description: "Topped with finely chopped onions, tomatoes, and coriander.", price: "₹120", tag: "Popular" },
      { name: "Mix Veg Uthappam", description: "Loaded with carrots, peas, onions, and tomatoes.", price: "₹130" },
    ]
  },
  {
    category: "Meals & Rice",
    icon: <Star className="w-5 h-5" />,
    items: [
      { name: "South Indian Thali", description: "Rice, Sambar, Rasam, Poriyal, Kootu, Appalam, Pickle, and Payasam.", price: "₹200", tag: "Must Try" },
      { name: "Bisi Bele Bath", description: "Traditional spicy rice and lentil dish with vegetables and ghee.", price: "₹140" },
      { name: "Curd Rice", description: "Soothing yogurt rice tempered with mustard seeds, curry leaves, and pomegranate.", price: "₹110" },
    ]
  },
  {
    category: "Beverages",
    icon: <Coffee className="w-5 h-5" />,
    items: [
      { name: "Authentic Filter Coffee", description: "Strong, frothy South Indian coffee brewed with chicory.", price: "₹40", tag: "Signature" },
      { name: "Neer Mor (Spiced Buttermilk)", description: "Refreshing buttermilk with ginger, green chilies, and coriander.", price: "₹30" },
      { name: "Nannari Sarbath", description: "Cooling traditional drink made from Indian sarsaparilla root syrup.", price: "₹50" },
      { name: "Rose Milk", description: "Chilled milk flavored with aromatic rose syrup.", price: "₹60" },
      { name: "Badam Milk", description: "Warm or chilled almond milk infused with saffron and cardamom.", price: "₹70" },
      { name: "Fresh Lime Soda", description: "Sweet or salted refreshing lime drink.", price: "₹40" },
      { name: "Sweet Lassi", description: "Thick, churned yogurt drink served chilled.", price: "₹60" },
    ]
  },
  {
    category: "Desserts",
    icon: <Star className="w-5 h-5" />,
    items: [
      { name: "Kesari Bath", description: "Sweet semolina dessert cooked with ghee, saffron, and cashews.", price: "₹70" },
      { name: "Payasam", description: "Traditional South Indian milk pudding with vermicelli or rice.", price: "₹80" },
      { name: "Gulab Jamun (2 pcs)", description: "Deep-fried milk dough balls soaked in sugar syrup.", price: "₹60" },
    ]
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.name === name) {
        const newQuantity = i.quantity + delta;
        return newQuantity > 0 ? { ...i, quantity: newQuantity } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''), 10);
      return total + (price * item.quantity);
    }, 0);
  };

  const handlePayment = () => {
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false);
      setIsCartOpen(false);
      setCart([]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans selection:bg-orange-200 pb-24">
      {/* Header Section */}
      <header className="relative bg-stone-900 text-stone-50 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/spices/1920/1080?blur=2')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-orange-50 mb-4">
              Parvati Hotel
            </h1>
            <p className="text-orange-200/80 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-8">
              Authentic South Indian Cuisine • Nerul
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Sector 21, Nerul, Navi Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>7:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Category Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-6 mb-8 border-b border-stone-200 sticky top-0 bg-[#fdfbf7]/90 backdrop-blur-md z-20 pt-4">
          {menuData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium ${
                activeCategory === cat.category
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {cat.icon}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-12">
          {menuData.map((category) => (
            <div 
              key={category.category}
              className={activeCategory === category.category ? 'block' : 'hidden'}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-3xl font-semibold text-stone-800">
                  {category.category}
                </h2>
                <div className="h-px bg-stone-200 flex-1 mt-2"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {category.items.map((item, idx) => {
                  const cartItem = cart.find(i => i.name === item.name);
                  return (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-stone-900 group-hover:text-orange-700 transition-colors flex items-center gap-3">
                            {item.name}
                            {item.tag && (
                              <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-orange-100 text-orange-700 rounded-sm">
                                {item.tag}
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="font-serif text-lg font-bold text-orange-600">
                            {item.price}
                          </div>
                          {cartItem ? (
                            <div className="flex items-center gap-2 bg-orange-100 rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(item.name, -1)} className="text-orange-700 hover:bg-orange-200 rounded-full p-0.5">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium text-orange-800 w-4 text-center">{cartItem.quantity}</span>
                              <button onClick={() => updateQuantity(item.name, 1)} className="text-orange-700 hover:bg-orange-200 rounded-full p-0.5">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)} 
                              className="bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600 p-1.5 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 py-12 mt-12 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Leaf className="w-8 h-8 text-orange-300 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-semibold text-stone-800 mb-2">Parvati Hotel</h2>
          <p className="text-stone-500 text-sm mb-6">Serving authentic South Indian flavors since 1998.</p>
          <p className="text-stone-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Parvati Hotel Nerul. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-md"
          >
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="w-full bg-orange-600 text-white rounded-full px-6 py-4 shadow-xl shadow-orange-600/30 flex items-center justify-between font-medium hover:bg-orange-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
              </div>
              <span>View Cart • ₹{getTotalPrice()}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
                <h2 className="font-serif text-2xl font-bold text-stone-800">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-stone-50/50">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800">{item.name}</h4>
                          <p className="text-orange-600 font-medium text-sm">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1.5 border border-stone-200">
                          <button onClick={() => updateQuantity(item.name, -1)} className="text-stone-500 hover:text-orange-600 p-1">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-stone-800 w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.name, 1)} className="text-stone-500 hover:text-orange-600 p-1">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-stone-100">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-stone-500">Total Amount</span>
                    <span className="font-serif text-2xl font-bold text-stone-800">₹{getTotalPrice()}</span>
                  </div>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-orange-600 text-white rounded-xl px-6 py-4 font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Pay ₹{getTotalPrice()}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Success Modal */}
      <AnimatePresence>
        {isPaymentSuccess && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">Payment Successful!</h3>
              <p className="text-stone-500 mb-6">Your order has been placed and is being prepared.</p>
              <div className="animate-pulse flex justify-center gap-1">
                <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
