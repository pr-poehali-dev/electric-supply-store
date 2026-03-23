import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useStore } from '@/store/useStore';

export default function Header() {
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, favorites, compare, cartCount } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/catalog?q=${encodeURIComponent(search)}`);
  };

  const navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'Категории', path: '/categories' },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-navy-600 text-white text-sm py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="flex items-center gap-1.5 opacity-80">
            <Icon name="Phone" size={13} />
            8 (800) 555-35-35 — бесплатно по России
          </span>
          <div className="flex items-center gap-4 text-xs opacity-70">
            <span>Пн–Пт: 9:00–18:00</span>
            <span>•</span>
            <span>Доставка по всей России</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-navy-600 py-3 border-b border-navy-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Icon name="Zap" size={22} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">ЭлектроМаркет</div>
                <div className="text-orange-300 text-[10px] font-medium leading-none tracking-wide">ВСЁ ДЛЯ ЭЛЕКТРИКА</div>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Найти кабель, розетку, автомат..."
                  className="w-full px-4 py-2.5 text-sm rounded-l-lg outline-none text-gray-800 placeholder:text-gray-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 transition-colors px-5 py-2.5 rounded-r-lg"
                >
                  <Icon name="Search" size={18} className="text-white" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <Link to="/favorites" className="flex flex-col items-center gap-0.5 text-white hover:text-orange-300 transition-colors px-2 py-1 relative">
                <Icon name="Heart" size={22} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
                <span className="text-[10px] hidden md:block">Избранное</span>
              </Link>

              <Link to="/compare" className="flex flex-col items-center gap-0.5 text-white hover:text-orange-300 transition-colors px-2 py-1 relative">
                <Icon name="BarChart2" size={22} />
                {compare.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {compare.length}
                  </span>
                )}
                <span className="text-[10px] hidden md:block">Сравнение</span>
              </Link>

              <Link to="/cart" className="flex flex-col items-center gap-0.5 text-white hover:text-orange-300 transition-colors px-2 py-1 relative">
                <Icon name="ShoppingCart" size={22} />
                {cartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount()}
                  </span>
                )}
                <span className="text-[10px] hidden md:block">Корзина</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-0">
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-5 py-3 text-sm"
            >
              <Icon name="LayoutGrid" size={16} />
              Все категории
            </button>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:text-orange-500 ${
                  location.pathname === link.path
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-4 text-sm text-gray-500 py-3">
              <span className="flex items-center gap-1">
                <Icon name="Truck" size={14} />
                Доставка от 1 дня
              </span>
              <span className="flex items-center gap-1">
                <Icon name="ShieldCheck" size={14} />
                Гарантия качества
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
