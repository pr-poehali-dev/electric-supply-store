import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-navy-600 text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">ЭлектроМаркет</div>
                <div className="text-orange-300 text-[10px] tracking-wide">ВСЁ ДЛЯ ЭЛЕКТРИКА</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Профессиональные товары для электромонтажа. Более 5 000 наименований в наличии.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-navy-500 hover:bg-orange-500 transition-colors p-2 rounded-lg">
                <Icon name="MessageCircle" size={16} />
              </a>
              <a href="#" className="bg-navy-500 hover:bg-orange-500 transition-colors p-2 rounded-lg">
                <Icon name="Send" size={16} />
              </a>
              <a href="#" className="bg-navy-500 hover:bg-orange-500 transition-colors p-2 rounded-lg">
                <Icon name="Phone" size={16} />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Кабели и провода', 'Розетки и выключатели', 'Щиты и боксы', 'Автоматы и УЗО', 'Светильники', 'Инструменты'].map(item => (
                <li key={item}>
                  <Link to="/catalog" className="hover:text-orange-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Доставка и оплата', 'Возврат товара', 'Гарантия', 'Оптовые заказы', 'О компании', 'Контакты'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-300 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Icon name="Phone" size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <span>8 (800) 555-35-35<br /><span className="text-xs opacity-60">Бесплатно по России</span></span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Mail" size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <span>info@electromarket.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Clock" size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Пн–Пт: 9:00–18:00<br />Сб: 10:00–16:00</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Москва, ул. Электрозаводская, 27</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-500 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© 2024 ЭлектроМаркет. Все права защищены.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
