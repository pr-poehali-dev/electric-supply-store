import { useState } from 'react';
import { Product } from '@/data/products';
import { useStore } from '@/store/useStore';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
  onCompare?: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart, toggleFavorite, toggleCompare, favorites, compare, cart } = useStore();

  const isFav = favorites.includes(product.id);
  const isCmp = compare.includes(product.id);
  const inCart = cart.some(i => i.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-navy-200 transition-all duration-200 group flex flex-col">
      {/* Image */}
      <div className="relative p-4 bg-gray-50 rounded-t-xl">
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            НОВИНКА
          </span>
        )}
        {product.isHit && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            ХИТ
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            -{discount}%
          </span>
        )}

        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-1.5 rounded-lg shadow transition-colors ${isFav ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-400'}`}
          >
            <Icon name={isFav ? 'Heart' : 'Heart'} size={14} />
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={`p-1.5 rounded-lg shadow transition-colors ${isCmp ? 'bg-navy-50 text-navy-600' : 'bg-white text-gray-400 hover:text-navy-400'}`}
          >
            <Icon name="BarChart2" size={14} />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <div className="text-xs text-gray-400 mb-1">{product.brand}</div>
        <p className="text-sm font-medium text-gray-800 leading-tight mb-2 flex-1 line-clamp-2">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name="Star"
                size={11}
                className={star <= Math.round(product.rating) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-navy-600">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* Stock */}
        <div className={`flex items-center gap-1 text-xs mb-3 ${product.inStock ? 'text-green-600' : 'text-red-400'}`}>
          <Icon name={product.inStock ? 'CheckCircle2' : 'XCircle'} size={12} />
          {product.inStock ? 'В наличии' : 'Под заказ'}
        </div>

        {/* Add to cart */}
        <div className="flex gap-1">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${
              added
                ? 'bg-green-500 text-white'
                : product.inStock
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Icon name={added ? 'Check' : 'ShoppingCart'} size={15} />
            {added ? 'Добавлено' : 'В корзину'}
          </button>
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isFav ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
            }`}
          >
            <Icon name="Heart" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
