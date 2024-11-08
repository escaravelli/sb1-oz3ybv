import React, { useState } from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { QuoteForm } from './components/QuoteForm';
import { products, categories } from './data/products';
import { Product, CartItem, QuoteRequest } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(items => {
      const existing = items.find(item => item.id === product.id);
      if (existing) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      quantity === 0
        ? items.filter(item => item.id !== id)
        : items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleQuoteSubmit = (quote: QuoteRequest) => {
    const items = quote.items.map(item => 
      `• ${item.quantity}x ${item.name}`
    ).join('\n');

    const message = encodeURIComponent(
      `*New Quote Request*\n\n` +
      `*Customer:* ${quote.customerName}\n` +
      `*Phone:* ${quote.phone}\n` +
      `*Location:* ${quote.location}\n` +
      `*Preferred Date/Time:* ${new Date(quote.preferredDateTime).toLocaleString()}\n\n` +
      `*Items:*\n${items}`
    );

    window.open(`https://wa.me/5511941565335?text=${message}`, '_blank');
    setCartItems([]);
    setIsQuoteFormOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Digital Catalog</h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <CartIcon size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
          
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClose={() => setIsCartOpen(false)}
        onRequestQuote={() => {
          setIsCartOpen(false);
          setIsQuoteFormOpen(true);
        }}
        isOpen={isCartOpen}
      />

      <QuoteForm
        items={cartItems}
        onClose={() => setIsQuoteFormOpen(false)}
        onSubmit={handleQuoteSubmit}
        isOpen={isQuoteFormOpen}
      />
    </div>
  );
}

export default App;