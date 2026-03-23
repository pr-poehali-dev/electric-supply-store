import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products as initialProducts, categories } from '@/data/products';
import type { Product } from '@/data/products';

const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'orders'>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-navy-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-scale-in">
          <div className="text-center mb-6">
            <div className="bg-navy-600 p-4 rounded-xl inline-flex mb-3">
              <Icon name="Zap" size={28} className="text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-navy-600">Панель администратора</h1>
            <p className="text-gray-400 text-sm mt-1">ЭлектроМаркет</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className={`w-full border rounded-lg px-4 py-2.5 outline-none text-gray-800 transition-colors ${authError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-navy-400'}`}
                />
                <Icon name="Lock" size={16} className="absolute right-3 top-3 text-gray-400" />
              </div>
              {authError && <p className="text-red-500 text-xs mt-1">Неверный пароль</p>}
            </div>
            <button type="submit" className="w-full bg-navy-600 hover:bg-navy-700 transition-colors text-white font-semibold py-3 rounded-xl">
              Войти
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            Демо-пароль: <code className="bg-gray-100 px-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Товаров', value: products.length, icon: 'Package', color: 'bg-blue-50 text-blue-600' },
    { label: 'Категорий', value: categories.length, icon: 'LayoutGrid', color: 'bg-green-50 text-green-600' },
    { label: 'В наличии', value: products.filter(p => p.inStock).length, icon: 'CheckCircle', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Под заказ', value: products.filter(p => !p.inStock).length, icon: 'Clock', color: 'bg-orange-50 text-orange-500' },
  ];

  const tabs = [
    { key: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { key: 'products', label: 'Товары', icon: 'Package' },
    { key: 'categories', label: 'Категории', icon: 'LayoutGrid' },
    { key: 'orders', label: 'Заказы', icon: 'ShoppingBag' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-navy-600 flex flex-col shrink-0">
        <div className="p-4 border-b border-navy-500">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">ЭлектроМаркет</div>
              <div className="text-navy-300 text-[10px]">Панель управления</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white/10 text-white'
                  : 'text-navy-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-500">
          <button
            onClick={() => setAuth(false)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-navy-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
          <a href="/" target="_blank" className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-navy-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <Icon name="ExternalLink" size={16} />
            Открыть сайт
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="font-bold text-gray-800 text-lg">
            {tabs.find(t => t.key === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Администратор
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{s.label}</span>
                      <div className={`p-2 rounded-lg ${s.color}`}>
                        <Icon name={s.icon} size={16} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-navy-600">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Recent products */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Последние товары</h3>
                  <button onClick={() => setActiveTab('products')} className="text-orange-500 text-sm hover:underline">Все товары</button>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Название</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Категория</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Цена</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Наличие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map(p => (
                      <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-sm text-gray-800 font-medium">{p.name.substring(0, 40)}...</td>
                        <td className="p-3 text-sm text-gray-500">{p.category}</td>
                        <td className="p-3 text-sm font-semibold text-navy-600">{p.price.toLocaleString('ru-RU')} ₽</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                            {p.inStock ? 'В наличии' : 'Под заказ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500 text-sm">Всего товаров: <strong>{products.length}</strong></p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Icon name="Plus" size={16} />
                  Добавить товар
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Название</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Категория</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Бренд</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Цена</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Статус</th>
                      <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-xs text-gray-400">#{p.id}</td>
                        <td className="p-3 text-sm text-gray-800 font-medium max-w-[200px] truncate">{p.name}</td>
                        <td className="p-3 text-sm text-gray-500">{p.category}</td>
                        <td className="p-3 text-sm text-gray-500">{p.brand}</td>
                        <td className="p-3 text-sm font-semibold text-navy-600">{p.price.toLocaleString('ru-RU')} ₽</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                            {p.inStock ? 'В наличии' : 'Под заказ'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 text-gray-400 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
                            >
                              <Icon name="Pencil" size={14} />
                            </button>
                            <button
                              onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Icon name="Trash2" size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Categories */}
          {activeTab === 'categories' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-navy-50 p-2.5 rounded-lg">
                        <Icon name={cat.icon} size={20} className="text-navy-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{cat.name}</div>
                        <div className="text-xs text-gray-400">{cat.count} товаров</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 text-xs py-1.5 border border-navy-200 text-navy-600 rounded-lg hover:bg-navy-50 transition-colors">
                        Редактировать
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-300 transition-colors group">
                  <div className="bg-gray-100 group-hover:bg-orange-50 p-3 rounded-lg transition-colors">
                    <Icon name="Plus" size={20} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-orange-400 transition-colors">Добавить категорию</span>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                <div className="bg-orange-50 p-8 rounded-full w-fit mx-auto mb-4">
                  <Icon name="ShoppingBag" size={48} className="text-orange-200" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Заказы появятся здесь</h2>
                <p className="text-gray-400 text-sm">Раздел будет активен после подключения формы оформления заказа</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingProduct(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy-600">Редактировать товар</h3>
              <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Название</label>
                <input
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Цена, ₽</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Бренд</label>
                <input
                  value={editingProduct.brand}
                  onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy-400"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="accent-orange-500 w-4 h-4"
                />
                В наличии
              </label>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditingProduct(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">
                Отмена
              </button>
              <button
                onClick={() => {
                  setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
                  setEditingProduct(null);
                }}
                className="flex-1 bg-navy-600 hover:bg-navy-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modal placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy-600">Добавить товар</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {['Название', 'Бренд', 'Цена, ₽', 'Описание'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy-400" placeholder={label} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm">
                Отмена
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
