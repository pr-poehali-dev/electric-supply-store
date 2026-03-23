import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { categories, products } from '@/data/products';

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate('/')}>Главная</span>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-800 font-medium">Категории</span>
        </div>

        <h1 className="text-3xl font-bold text-navy-600 mb-8">Все категории товаров</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const catProducts = products.filter(p => p.categorySlug === cat.slug);
            const hits = catProducts.filter(p => p.isHit || p.isNew).slice(0, 3);

            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-navy-200 transition-all cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${i * 70}ms` }}
                onClick={() => navigate(`/catalog?cat=${cat.slug}`)}
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-navy-600 to-navy-700 p-5 flex items-center gap-3">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Icon name={cat.icon} size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">{cat.name}</h3>
                    <span className="text-navy-200 text-sm">{cat.count} товаров</span>
                  </div>
                </div>

                {/* Products preview */}
                <div className="p-4">
                  {hits.length > 0 ? (
                    <ul className="space-y-1.5">
                      {hits.map(p => (
                        <li key={p.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 truncate pr-2">{p.name.substring(0, 30)}...</span>
                          <span className="text-orange-500 font-semibold shrink-0">{p.price.toLocaleString('ru-RU')} ₽</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">Товары появятся скоро</p>
                  )}
                  <button className="mt-4 w-full text-navy-600 group-hover:bg-navy-600 group-hover:text-white border border-navy-200 group-hover:border-navy-600 rounded-lg py-2 text-sm font-medium transition-all flex items-center justify-center gap-1">
                    Смотреть все <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
