import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';

// FALLBACK DATA (Matches the Home Page)
const FALLBACK_MENU = [
  { id: '1', name: 'Vegetable Pakora', desc: 'Various vegetables with Indian spices', price: 6.50, category: 'APPETIZERS', isVeg: true },
  { id: '2', name: 'Pakora fish', desc: 'Redfish marinated with Indian herbs', price: 7.50, category: 'APPETIZERS', isVeg: false },
  { id: '3', name: 'Onion Bhaji', desc: 'Balls made from onion strips with bell peppers and ginger', price: 6.50, category: 'APPETIZERS', isVeg: true },
  { id: '4', name: 'Mumtaj Mix Pakora', desc: 'Vegetarian surprise appetizer plate', price: 10.50, category: 'APPETIZERS', isVeg: true },
  { id: '5', name: 'Paneer Pakora', desc: 'Homemade Indian cheese with spices', price: 7.00, category: 'APPETIZERS', isVeg: true },
  { id: '6', name: 'King Prawn Pakora', desc: 'Scampi marinated in exotic spices', price: 11.50, category: 'APPETIZERS', isVeg: false },
  { id: '7', name: 'Chicken Pakora', desc: 'Spicy chicken fillet strips', price: 7.50, category: 'APPETIZERS', isVeg: false },
  { id: '8', name: 'Paneer tikka', desc: 'Homemade Indian cheese, marinated and grilled', price: 11.00, category: 'APPETIZERS', isVeg: true },
  { id: '9', name: 'Scampi Tikka', desc: 'Scampi marinated in spices and grilled', price: 12.90, category: 'APPETIZERS', isVeg: false },
  { id: '10', name: 'Sabzi Soup', desc: 'Vegetable soup with Indian spices', price: 4.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '11', name: 'Mixed salad', desc: 'Fresh mixed salad', price: 4.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '12', name: 'Daal Soup', desc: 'Lentil soup', price: 5.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '13', name: 'Indian salad', desc: 'Spicy Indian salad', price: 5.90, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '14', name: 'Tomato Soup', desc: 'Tomato soup with exotic spices', price: 5.50, category: 'SOUPS AND SALADS', isVeg: true },
  { id: '15', name: 'Matar-Paneer', desc: 'Indischer Frischkäse und grüne Erbsen in würziger Tomaten-Curry-Sauce', price: 14.90, category: 'MAIN COURSES', isVeg: true },
  { id: '16', name: 'Chicken Makhni', desc: 'Hähnchen in cremiger Butter-Tomaten-Sauce', price: 17.90, category: 'MAIN COURSES', isVeg: false },
  { id: '17', name: 'Taj Mahal Kabab', desc: 'Mariniertes Hähnchenfleisch, über Holzkohle gegrillt', price: 18.90, category: 'MAIN COURSES', isVeg: false },
];

export default function OrderPage() {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('APPETIZERS');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/menu')
      .then(res => {
        const all = res.data.flatMap(cat => cat.dishes.map(d => ({ ...d, category: cat.category.toUpperCase() })));
        setMenu(all.length > 0 ? all : FALLBACK_MENU);
      })
      .catch(() => {
        console.log("Error fetching menu, using fallback");
        setMenu(FALLBACK_MENU);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['APPETIZERS', 'SOUPS AND SALADS', 'MAIN COURSES', 'ALL'];
  const filtered = activeCategory === 'ALL' ? menu : menu.filter(m => m.category === activeCategory);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `http://127.0.0.1:8000${url}`;
  };

  if (loading) return <div className="card loading-text" style={{ margin: '4rem auto', textAlign: 'center', maxWidth: '600px' }}>Loading menu...</div>;

  return (
    <div className="main-wrapper" style={{ paddingTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="kicker">Online Ordering</span>
        <h2 dangerouslySetInnerHTML={{ __html: t('menu.title') || 'Our <em>Menu</em>' }} style={{ fontSize: '3.5rem', marginBottom: '1rem', marginTop: '0.5rem' }} />
      </div>

      {/* Main Menu Card */}
      <div className="card menu-card" style={{ minHeight: 'auto', padding: '3rem 4rem' }}>
        
        {/* Category Tabs */}
        <div className="menu-tabs" style={{ marginBottom: '2rem' }}>
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => setActiveCategory(c)} 
              className={`menu-tab-btn ${activeCategory === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Category Header */}
        <div className="menu-category-header">
          <div className="menu-icon-wrapper">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2b2438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <div>
              <h3 className="menu-category-title">{activeCategory === 'ALL' ? 'All Dishes' : activeCategory.charAt(0) + activeCategory.slice(1).toLowerCase()}</h3>
              <p className="menu-dish-count">{filtered.length} DISHES</p>
          </div>
        </div>

        {/* 2-Column Menu Grid */}
        <div className="menu-grid">
          {filtered.map(item => (
            <div key={item.id} className="menu-grid-item">
              
              {/* Optional: If backend provides an image, show it inline or as a thumbnail next to the text */}
              
              <div className="menu-item-header">
                <h4 className="menu-item-name">{item.name}</h4>
                {item.isVeg && <span className="veg-badge">V</span>}
                <span className="menu-dotted-leader"></span>
                <span className="menu-item-price">€{item.price.toFixed(2)}</span>
                
                {/* Add to Cart Button */}
                <button 
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="menu-add-btn"
                  aria-label={`Add ${item.name} to cart`}
                  title="Add to cart"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              <p className="menu-item-desc">{item.desc || item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Disclaimers */}
        <div className="menu-disclaimer" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p><strong>Allergens:</strong> 1: Gluten – 2: Crustaceans – 3: Eggs – 4: Fish – 5: Peanuts – 7: Milk – 8: Nuts – 14: Molluscs</p>
          <p style={{ marginTop: '0.5rem' }}>V = vegetarian · Status: tajmahal-oldenburg.de · The menu in the restaurant applies.</p>
        </div>

      </div>
    </div>
  );
}