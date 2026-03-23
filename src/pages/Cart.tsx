import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useStore } from '@/store/useStore';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 text-center p-10">
          <div className="bg-navy-50 p-8 rounded-full">
            <Icon name="ShoppingCart" size={56} className="text-navy-300" />
          </div>
          <h2 className="text-2xl font-bold text-navy-600">Корзина пуста</h2>
          <p className="text-gray-500">Добавьте товары из каталога, чтобы сделать заказ</p>
          <Link to="/catalog" className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-7 py-3 rounded-lg flex items-center gap-2">
            <Icon name="ShoppingBag" size={18} />
            Перейти в каталог
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const delivery = cartTotal() >= 5000 ? 0 : 590;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-gray-800 font-medium">Корзина</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy-600">Корзина ({cart.length} тов.)</h1>
          <button onClick={clearCart} className="text-red-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors">
            <Icon name="Trash2" size={14} />
            Очистить корзину
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items */}
          <div className="flex-1 space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-center animate-fade-in">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain bg-gray-50 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight">{item.product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.product.brand} • {item.product.category}</p>
                  <div className={`flex items-center gap-1 text-xs mt-1 ${item.product.inStock ? 'text-green-600' : 'text-red-400'}`}>
                    <Icon name={item.product.inStock ? 'CheckCircle2' : 'XCircle'} size={11} />
                    {item.product.inStock ? 'В наличии' : 'Под заказ'}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shrink-0">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium w-10 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <div className="font-bold text-navy-600 text-base">
                    {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-xs text-gray-400">
                      {item.product.price.toLocaleString('ru-RU')} ₽/шт
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors ml-1 shrink-0"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-36">
              <h3 className="font-bold text-navy-600 text-base mb-4">Итого</h3>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                  <span>{cartTotal().toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                    {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-xs text-green-600 bg-green-50 rounded-lg p-2">
                    Бесплатная доставка при заказе от 5 000 ₽
                  </p>
                )}
                {delivery > 0 && (
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                    До бесплатной доставки: {(5000 - cartTotal()).toLocaleString('ru-RU')} ₽
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between font-bold text-navy-600 text-lg">
                  <span>Итого</span>
                  <span>{(cartTotal() + delivery).toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                <Icon name="CreditCard" size={18} />
                Оформить заказ
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline">условиями</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
