import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';

export default function Compare() {
  const { compare, toggleCompare, addToCart } = useStore();
  const cmpProducts = products.filter(p => compare.includes(p.id));

  const allSpecKeys = Array.from(
    new Set(cmpProducts.flatMap(p => Object.keys(p.specs)))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-800 font-medium">Сравнение товаров</span>
        </div>

        <h1 className="text-2xl font-bold text-navy-600 mb-6">Сравнение товаров</h1>

        {cmpProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="bg-navy-50 p-8 rounded-full w-fit mx-auto mb-4">
              <Icon name="BarChart2" size={48} className="text-navy-200" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Нет товаров для сравнения</h2>
            <p className="text-gray-400 mb-6">Добавляйте товары к сравнению, нажимая на иконку <Icon name="BarChart2" size={14} className="inline" /></p>
            <Link to="/catalog" className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg inline-flex items-center gap-2">
              <Icon name="ShoppingBag" size={16} />
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header row — product cards */}
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="w-40 p-4 text-left text-sm font-semibold text-gray-500 bg-gray-50">Характеристика</th>
                    {cmpProducts.map(p => (
                      <th key={p.id} className="p-4 min-w-[200px]">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="self-end text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Icon name="X" size={14} />
                          </button>
                          <img src={p.image} alt={p.name} className="w-20 h-20 object-contain bg-gray-50 rounded-lg" />
                          <p className="text-sm font-medium text-gray-800 text-center leading-tight">{p.name}</p>
                          <div className="font-bold text-navy-600">{p.price.toLocaleString('ru-RU')} ₽</div>
                          <button
                            onClick={() => addToCart(p)}
                            disabled={!p.inStock}
                            className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              p.inStock ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {p.inStock ? 'В корзину' : 'Под заказ'}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Base rows */}
                  <tr className="border-b border-gray-50 bg-navy-600">
                    <td className="p-3 text-xs font-bold text-white uppercase tracking-wider">Основное</td>
                    {cmpProducts.map(p => <td key={p.id} className="p-3" />)}
                  </tr>
                  {[
                    { key: 'brand', label: 'Бренд', getter: (p: typeof cmpProducts[0]) => p.brand },
                    { key: 'category', label: 'Категория', getter: (p: typeof cmpProducts[0]) => p.category },
                    { key: 'rating', label: 'Рейтинг', getter: (p: typeof cmpProducts[0]) => `${p.rating} ★ (${p.reviews} отзывов)` },
                    { key: 'inStock', label: 'Наличие', getter: (p: typeof cmpProducts[0]) => p.inStock ? '✓ В наличии' : '✗ Под заказ' },
                  ].map(row => (
                    <tr key={row.key} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-500 font-medium bg-gray-50">{row.label}</td>
                      {cmpProducts.map(p => (
                        <td key={p.id} className={`p-3 text-sm text-center ${row.key === 'inStock' ? (p.inStock ? 'text-green-600 font-medium' : 'text-red-400') : 'text-gray-700'}`}>
                          {row.getter(p)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Specs rows */}
                  {allSpecKeys.length > 0 && (
                    <>
                      <tr className="border-b border-gray-50 bg-navy-600">
                        <td className="p-3 text-xs font-bold text-white uppercase tracking-wider">Характеристики</td>
                        {cmpProducts.map(p => <td key={p.id} className="p-3" />)}
                      </tr>
                      {allSpecKeys.map(key => (
                        <tr key={key} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="p-3 text-sm text-gray-500 font-medium bg-gray-50">{key}</td>
                          {cmpProducts.map(p => (
                            <td key={p.id} className="p-3 text-sm text-gray-700 text-center">
                              {p.specs[key] || <span className="text-gray-300">—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
