import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';
import { products, categories } from '@/data/products';

export default function Home() {
  const navigate = useNavigate();
  const hits = products.filter(p => p.isHit);
  const newProducts = products.filter(p => p.isNew);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-navy-600 to-navy-800 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-400 blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-3 py-1 text-orange-300 text-sm mb-4">
              <Icon name="Zap" size={14} />
              Более 5 000 товаров в наличии
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Всё для<br />
              <span className="text-orange-400">электромонтажа</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Кабели, розетки, автоматы, щиты и инструменты.<br />
              Доставка по всей России от 1 дня.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/catalog')}
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-7 py-3 rounded-lg flex items-center gap-2"
              >
                <Icon name="ShoppingBag" size={18} />
                Перейти в каталог
              </button>
              <button
                onClick={() => navigate('/categories')}
                className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white font-semibold px-7 py-3 rounded-lg"
              >
                Все категории
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'Package', label: '5 000+ товаров', sub: 'В постоянном наличии' },
              { icon: 'Truck', label: 'Доставка от 1 дня', sub: 'По всей России' },
              { icon: 'ShieldCheck', label: 'Официальная гарантия', sub: 'На все товары' },
              { icon: 'Headphones', label: 'Поддержка 24/7', sub: 'Помогаем с выбором' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="bg-navy-50 p-2.5 rounded-lg shrink-0">
                  <Icon name={item.icon} size={20} className="text-navy-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy-600">Категории товаров</h2>
          <Link to="/categories" className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1">
            Все категории <Icon name="ChevronRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalog?cat=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-navy-300 hover:shadow-md transition-all text-center group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="bg-navy-50 group-hover:bg-navy-600 transition-colors p-3 rounded-lg">
                <Icon name={cat.icon} size={22} className="text-navy-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium text-gray-700 leading-tight">{cat.name}</span>
              <span className="text-[10px] text-gray-400">{cat.count} тов.</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hits */}
      <section className="container mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-7 bg-orange-500 rounded-full" />
            <h2 className="text-2xl font-bold text-navy-600">Хиты продаж</h2>
          </div>
          <Link to="/catalog" className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1">
            Смотреть все <Icon name="ChevronRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hits.map((p, i) => (
            <div key={p.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 pb-10">
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-2">Оптовые поставки</h3>
            <p className="text-gray-300">Специальные цены для строительных компаний и профессиональных электриков</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors shrink-0 font-semibold px-7 py-3 rounded-lg whitespace-nowrap">
            Получить прайс-лист
          </button>
        </div>
      </section>

      {/* New products */}
      <section className="container mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-7 bg-green-500 rounded-full" />
            <h2 className="text-2xl font-bold text-navy-600">Новинки</h2>
          </div>
          <Link to="/catalog" className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1">
            Смотреть все <Icon name="ChevronRight" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newProducts.map((p, i) => (
            <div key={p.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-4 pb-10">
        <h2 className="text-xl font-bold text-navy-600 mb-5 text-center">Официальные дистрибьюторы</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {['Legrand', 'Schneider', 'ABB', 'IEK', 'Gauss', 'Stayer', 'Кабель-Маш'].map(brand => (
            <span key={brand} className="text-2xl font-bold text-gray-300 hover:text-navy-400 transition-colors cursor-pointer">
              {brand}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}