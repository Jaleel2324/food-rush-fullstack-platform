import React, { useMemo, useState } from "react";
import { ShoppingCart, Star, Truck, ShieldCheck, Plus, Minus, X } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    price: 11.99,
    image: "🍔",
    description: "Juicy burger with cheese, lettuce, tomato, and signature sauce.",
  },
  {
    id: 2,
    name: "Loaded Fries",
    category: "Sides",
    price: 6.99,
    image: "🍟",
    description: "Crispy fries topped with cheese, seasoning, and house sauce.",
  },
  {
    id: 3,
    name: "Chicken Wrap",
    category: "Wraps",
    price: 9.99,
    image: "🌯",
    description: "Grilled chicken wrap with fresh vegetables and creamy sauce.",
  },
  {
    id: 4,
    name: "Fresh Pizza",
    category: "Pizza",
    price: 14.99,
    image: "🍕",
    description: "Hot cheese pizza with rich tomato sauce and herbs.",
  },
  {
    id: 5,
    name: "Berry Smoothie",
    category: "Drinks",
    price: 5.99,
    image: "🥤",
    description: "Cold fruit smoothie blended fresh with berries.",
  },
  {
    id: 6,
    name: "Chicken Bowl",
    category: "Bowls",
    price: 12.99,
    image: "🥗",
    description: "Protein bowl with chicken, greens, rice, and vegetables.",
  },
];

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const delivery = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + delivery;

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function updateQuantity(productId, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  return (
    <main className="app">
      <nav className="nav">
        <div>
          <p className="eyebrow">Full-Stack Ordering Platform</p>
          <h1>Food Rush</h1>
        </div>

        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={20} />
          Cart
          {cart.length > 0 && <span>{cart.length}</span>}
        </button>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="badge">Fast Delivery • Fresh Food • Modern UI</p>
          <h2>Premium online ordering experience for modern restaurants.</h2>
          <p>
            A responsive food ordering platform with cart functionality,
            checkout flow, dynamic products, and admin-dashboard ready
            architecture.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="primary-btn">View Menu</a>
            <button className="secondary-btn" onClick={() => setCartOpen(true)}>
              Open Cart
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="food-emoji">🍔</div>
          <h3>Classic Burger</h3>
          <p>Most ordered item today</p>
          <strong>$11.99</strong>
        </div>
      </section>

      <section className="trust-grid">
        <div>
          <Truck />
          <h3>Fast Delivery</h3>
          <p>Designed for smooth restaurant ordering flows.</p>
        </div>

        <div>
          <ShieldCheck />
          <h3>Reliable Checkout</h3>
          <p>Cart and checkout logic built for real users.</p>
        </div>

        <div>
          <Star />
          <h3>Premium UI</h3>
          <p>Clean responsive design with modern interactions.</p>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <div className="section-header">
          <p className="eyebrow">Customer Menu</p>
          <h2>Popular Items</h2>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">{product.image}</div>
              <p className="category">{product.category}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="product-footer">
                <strong>${product.price.toFixed(2)}</strong>
                <button onClick={() => addToCart(product)}>Add</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="checkout-preview">
        <div>
          <p className="eyebrow">Admin Ready System</p>
          <h2>Built for full-stack workflows.</h2>
          <p>
            This project demonstrates frontend product rendering, cart state,
            checkout structure, backend API readiness, and MongoDB integration
            planning for order management.
          </p>
        </div>

        <div className="admin-card">
          <p>Orders Today</p>
          <h3>24</h3>
          <span>Dashboard concept</span>
        </div>
      </section>

      {cartOpen && (
        <aside className="cart-overlay">
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-emoji">{item.image}</div>

                      <div className="cart-info">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>

                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}>
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button onClick={() => updateQuantity(item.id, 1)}>
                            <Plus size={14} />
                          </button>

                          <button
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <p>
                    Subtotal <span>${subtotal.toFixed(2)}</span>
                  </p>
                  <p>
                    Delivery <span>${delivery.toFixed(2)}</span>
                  </p>
                  <h3>
                    Total <span>${total.toFixed(2)}</span>
                  </h3>

                  <button className="checkout-btn">
                    Continue to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      )}
    </main>
  );
}
