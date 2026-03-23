export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  isNew?: boolean;
  isHit?: boolean;
  description: string;
  specs: Record<string, string>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
}

export const categories: Category[] = [
  { id: 1, name: 'Кабели и провода', slug: 'cables', icon: 'Cable', count: 248, color: '#1a2e6e' },
  { id: 2, name: 'Розетки и выключатели', slug: 'sockets', icon: 'PlugZap', count: 186, color: '#1a2e6e' },
  { id: 3, name: 'Щиты и боксы', slug: 'panels', icon: 'Box', count: 94, color: '#1a2e6e' },
  { id: 4, name: 'Автоматы и УЗО', slug: 'breakers', icon: 'Zap', count: 157, color: '#1a2e6e' },
  { id: 5, name: 'Светильники', slug: 'lights', icon: 'Lightbulb', count: 312, color: '#1a2e6e' },
  { id: 6, name: 'Инструменты', slug: 'tools', icon: 'Wrench', count: 203, color: '#1a2e6e' },
  { id: 7, name: 'Кабельные лотки', slug: 'trays', icon: 'LayoutList', count: 78, color: '#1a2e6e' },
  { id: 8, name: 'Клеммы и разъёмы', slug: 'connectors', icon: 'Link', count: 134, color: '#1a2e6e' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Кабель ВВГнг-LS 3×2.5 мм² (бухта 100м)',
    price: 4890,
    oldPrice: 5490,
    category: 'Кабели и провода',
    categorySlug: 'cables',
    brand: 'Кабель-Маш',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    image: '/placeholder.svg',
    isHit: true,
    description: 'Кабель силовой негорючий с пониженным дымо- и газовыделением',
    specs: { 'Сечение': '3×2.5 мм²', 'Длина': '100 м', 'Напряжение': '0.66/1 кВ', 'Тип': 'ВВГнг-LS' }
  },
  {
    id: 2,
    name: 'Розетка двойная Legrand Valena 16А с заземлением',
    price: 890,
    oldPrice: 1100,
    category: 'Розетки и выключатели',
    categorySlug: 'sockets',
    brand: 'Legrand',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    image: '/placeholder.svg',
    isHit: true,
    description: 'Двойная розетка с заземлением, степень защиты IP20',
    specs: { 'Ток': '16 А', 'Напряжение': '250 В', 'Цвет': 'Белый', 'Защита': 'IP20' }
  },
  {
    id: 3,
    name: 'Щит распределительный ABB GOLF 12 модулей навесной',
    price: 1250,
    category: 'Щиты и боксы',
    categorySlug: 'panels',
    brand: 'ABB',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    image: '/placeholder.svg',
    isNew: true,
    description: 'Щит распределительный навесной на 12 модулей',
    specs: { 'Модули': '12', 'Тип': 'Навесной', 'Материал': 'Пластик', 'Цвет': 'Белый' }
  },
  {
    id: 4,
    name: 'Автоматический выключатель IEK ВА47-29 1P 16А',
    price: 185,
    oldPrice: 220,
    category: 'Автоматы и УЗО',
    categorySlug: 'breakers',
    brand: 'IEK',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    image: '/placeholder.svg',
    isHit: true,
    description: 'Автоматический выключатель однополюсный 16А характеристика C',
    specs: { 'Полюса': '1', 'Ток': '16 А', 'Характеристика': 'C', 'Ток откл.': '4.5 кА' }
  },
  {
    id: 5,
    name: 'Отвёртка-индикатор напряжения Stayer 100–500В',
    price: 320,
    category: 'Инструменты',
    categorySlug: 'tools',
    brand: 'Stayer',
    rating: 4.5,
    reviews: 78,
    inStock: true,
    image: '/placeholder.svg',
    isNew: true,
    description: 'Индикаторная отвёртка для проверки наличия напряжения',
    specs: { 'Диапазон': '100-500 В', 'Длина': '190 мм', 'Тип': 'Индикаторная' }
  },
  {
    id: 6,
    name: 'Светодиодный светильник LED панель 36Вт 4000К',
    price: 1490,
    oldPrice: 1890,
    category: 'Светильники',
    categorySlug: 'lights',
    brand: 'Gauss',
    rating: 4.7,
    reviews: 145,
    inStock: true,
    image: '/placeholder.svg',
    description: 'Встраиваемый светодиодный светильник 600×600 мм',
    specs: { 'Мощность': '36 Вт', 'Световой поток': '3200 Лм', 'Цветовая температура': '4000 К', 'Размер': '600×600 мм' }
  },
  {
    id: 7,
    name: 'Выключатель одноклавишный Schneider Resi9',
    price: 450,
    category: 'Розетки и выключатели',
    categorySlug: 'sockets',
    brand: 'Schneider',
    rating: 4.8,
    reviews: 67,
    inStock: false,
    image: '/placeholder.svg',
    description: 'Одноклавишный выключатель для внутренней установки',
    specs: { 'Тип': 'Одноклавишный', 'Ток': '10 А', 'Цвет': 'Белый', 'Защита': 'IP20' }
  },
  {
    id: 8,
    name: 'УЗО IEK ВД1-63 2P 25А 30мА',
    price: 890,
    oldPrice: 1050,
    category: 'Автоматы и УЗО',
    categorySlug: 'breakers',
    brand: 'IEK',
    rating: 4.5,
    reviews: 92,
    inStock: true,
    image: '/placeholder.svg',
    description: 'Устройство защитного отключения двухполюсное',
    specs: { 'Полюса': '2', 'Ток': '25 А', 'Ток утечки': '30 мА', 'Тип': 'AC' }
  },
];
