import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';

export default function Favorites() {
  const { favorites } = useStore();
  const favProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-800 font-medium">Избранное</span>
        </div>

        <h1 className="text-2xl font-bold text-navy-600 mb-6">
          Избранное {favProducts.length > 0 && <span className="text-gray-400 font-normal text-lg">({favProducts.length} тов.)</span>}
        </h1>

        {favProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="bg-red-50 p-8 rounded-full w-fit mx-auto mb-4">
              <Icon name="Heart" size={48} className="text-red-200" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Список избранного пуст</h2>
            <p className="text-gray-400 mb-6">Добавляйте товары в избранное, нажимая на ♡</p>
            <Link to="/catalog" className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg inline-flex items-center gap-2">
              <Icon name="ShoppingBag" size={16} />
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favProducts.map((p, i) => (
              <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
