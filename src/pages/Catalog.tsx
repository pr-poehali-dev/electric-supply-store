import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { products, categories } from '@/data/products';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const query = searchParams.get('q') || '';

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) list = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (activeCategory !== 'all') list = list.filter(p => p.categorySlug === activeCategory);
    if (inStockOnly) list = list.filter(p => p.inStock);
    if (priceFrom) list = list.filter(p => p.price >= parseInt(priceFrom));
    if (priceTo) list = list.filter(p => p.price <= parseInt(priceTo));
    if (sortBy === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, activeCategory, sortBy, priceFrom, priceTo, inStockOnly]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="hover:text-orange-500 cursor-pointer">Главная</span>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-800 font-medium">Каталог</span>
          {query && <><Icon name="ChevronRight" size={14} /><span className="text-orange-500">Поиск: "{query}"</span></>}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="w-56 shrink-0 hidden md:block">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-36">
              <h3 className="font-bold text-navy-600 mb-3 text-sm uppercase tracking-wider">Категории</h3>
              <ul className="space-y-1 mb-5">
                <li>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === 'all' ? 'bg-navy-600 text-white font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    Все товары
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.slug ? 'bg-navy-600 text-white font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-bold text-navy-600 mb-3 text-sm uppercase tracking-wider">Цена, ₽</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="От"
                  value={priceFrom}
                  onChange={e => setPriceFrom(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-navy-400"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceTo}
                  onChange={e => setPriceTo(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-navy-400"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="accent-orange-500 w-4 h-4"
                />
                Только в наличии
              </label>

              {(priceFrom || priceTo || inStockOnly || activeCategory !== 'all') && (
                <button
                  onClick={() => { setPriceFrom(''); setPriceTo(''); setInStockOnly(false); setActiveCategory('all'); }}
                  className="mt-4 w-full text-orange-500 hover:text-orange-600 text-sm border border-orange-200 rounded-lg py-2 transition-colors"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-200 px-4 py-3">
              <span className="text-sm text-gray-500">
                Найдено: <strong className="text-gray-800">{filtered.length}</strong> товаров
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-navy-400 text-gray-700"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="rating">По рейтингу</option>
                </select>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-navy-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    <Icon name="LayoutGrid" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-navy-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                <Icon name="SearchX" size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Товары не найдены</p>
                <p className="text-sm text-gray-400 mt-1">Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {filtered.map((p, i) => (
                  <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
