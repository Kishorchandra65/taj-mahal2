import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

export default function OrderPage() {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/menu')
      .then(res => {
        const all = res.data.flatMap(cat => cat.dishes.map(d => ({ ...d, category: cat.category })));
        setMenu(all);
      })
      .catch(() => console.log("Error fetching menu"))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', ...new Set(menu.map(m => m.category))];
  const filtered = activeCategory === 'ALL' ? menu : menu.filter(m => m.category === activeCategory);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `http://127.0.0.1:8000${url}`;
  };

  if (loading) return <div className="card loading-text">Loading menu...</div>;

  return (
    <>
      <div className="main-wrapper">
        <div className="card">
          <span className="kicker">Online Ordering</span>
          <h2>Our <em>Menu</em></h2>
          
          <div className="category-pills" style={{ marginBottom: '2rem' }}>
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => setActiveCategory(c)} 
                className={activeCategory === c ? 'active' : ''}
                style={{ padding: '10px 20px', borderRadius: '50px', border: '1px solid #ccc', background: activeCategory === c ? 'var(--burgundy)' : 'transparent', color: activeCategory === c ? 'white' : 'var(--black)' }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="card-content-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {filtered.map(item => (
              <div key={item.id} className="list-item" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                {item.image_url && <img src={getImageUrl(item.image_url)} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'gray', marginBottom: '8px' }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="price-tag">€{item.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(item)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="allergens" style={{ marginTop: '3rem', fontSize: '0.8rem', color: 'gray', textAlign: 'center' }}>
            <strong>Allergens:</strong> 1: Gluten – 2: Crustaceans – 3: Eggs – 4: Fish – 5: Peanuts – 7: Milk – 8: Nuts – 14: Molluscs
          </p>
        </div>
      </div>
    </>
  );
}