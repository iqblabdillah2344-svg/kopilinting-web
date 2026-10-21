import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coffee, Flame, ShoppingBag, Utensils, QrCode, CreditCard, Wallet, Banknote, 
  Search, Plus, Minus, Trash2, CheckCircle2, Clock, Check, X, ShieldAlert,
  LayoutDashboard, ShoppingCart, BarChart3, Receipt, Users, ChevronRight,
  Sparkles, MapPin, Phone, Instagram, Moon, Sun, ArrowRight, Printer, AlertCircle, RefreshCw
} from 'lucide-react';

// --- INITIAL DATA & SEED DATA ---
const MENU_CATEGORIES = [
  { id: 'all', name: 'Semua Menu', icon: Coffee },
  { id: 'kopi', name: 'Kopi Signature', icon: Coffee },
  { id: 'cigar', name: 'Cerutu & Cigar', icon: Flame },
  { id: 'non-kopi', name: 'Non-Kopi & Mocktail', icon: Sparkles },
  { id: 'snack', name: 'Snack & Makanan', icon: Utensils },
];

const INITIAL_MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Kopi Linting Signature',
    category: 'kopi',
    price: 22000,
    rating: 4.9,
    description: 'Racikan espresso khas Kopilinting disajikan dengan gula aren bakar aroma rokok sintren klasik.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasCustomOptions: true,
  },
  {
    id: 'm2',
    name: 'Espresso Single Shot',
    category: 'kopi',
    price: 15000,
    rating: 4.7,
    description: '100% Bijian Arabika lokal Jawa Tengah roasted medium dark.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    popular: false,
    hasCustomOptions: false,
  },
  {
    id: 'm3',
    name: 'Spanish Latte Cold',
    category: 'kopi',
    price: 25000,
    rating: 4.8,
    description: 'Susu segar, krimer kental manis gurih, dan double shot espresso Arabika Tembalang.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasCustomOptions: true,
  },
  {
    id: 'm4',
    name: 'Robust Robusto Robusto Cigar (Single)',
    category: 'cigar',
    price: 45000,
    rating: 4.9,
    description: 'Cerutu Robusto lokal fermentasi sempurna dengan nutty & woody finish note.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasCustomOptions: false,
  },
  {
    id: 'm5',
    name: 'Corona Premium Cigar Pack (3 Pcs)',
    category: 'cigar',
    price: 125000,
    rating: 5.0,
    description: 'Paket cerutu Corona premium Jawa Tengah dengan kemasan kayu elegan khas Kopilinting.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    popular: false,
    hasCustomOptions: false,
  },
  {
    id: 'm6',
    name: 'Artisan Smoked Berry Mocktail',
    category: 'non-kopi',
    price: 24000,
    rating: 4.8,
    description: 'Perpaduan jus berry segar, soda, mint, dan infusi asap kayu manis yang wangi.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasCustomOptions: false,
  },
  {
    id: 'm7',
    name: 'Matcha Latte Ice',
    category: 'non-kopi',
    price: 23000,
    rating: 4.6,
    description: 'Matcha Kyoto asli dipadukan dengan fresh milk gurih lembut.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    popular: false,
    hasCustomOptions: true,
  },
  {
    id: 'm8',
    name: 'Cireng Bumbu Rujak Pedas',
    category: 'snack',
    price: 18000,
    rating: 4.7,
    description: 'Cireng renyah di luar kenyal di dalam disajikan dengan sambal rujak gula merah.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasCustomOptions: false,
  },
  {
    id: 'm9',
    name: 'Kentang Goreng Truffle Butter',
    category: 'snack',
    price: 22000,
    rating: 4.8,
    description: 'Shoestring french fries dengan minyak truffle wangi dan taburan peterseli.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    popular: false,
    hasCustomOptions: false,
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-9821',
    customerName: 'Bima Tembalang',
    orderType: 'dine-in',
    tableNo: 'Meja 04',
    items: [
      { id: 'm1', name: 'Kopi Linting Signature', price: 22000, qty: 2, customNotes: 'Sugar 50%, Less Ice' },
      { id: 'm4', name: 'Robust Robusto Robusto Cigar', price: 45000, qty: 1, customNotes: '' }
    ],
    subtotal: 89000,
    tax: 8900,
    total: 97900,
    paymentMethod: 'QRIS',
    paymentStatus: 'PAID',
    status: 'PROCESSING', // PENDING, PROCESSING, READY, COMPLETED, CANCELLED
    time: '18:42',
    date: '2026-10-21'
  },
  {
    id: 'ORD-9820',
    customerName: 'Siti Rahmawati',
    orderType: 'takeaway',
    tableNo: '-',
    items: [
      { id: 'm3', name: 'Spanish Latte Cold', price: 25000, qty: 1, customNotes: 'Normal Ice' },
      { id: 'm8', name: 'Cireng Bumbu Rujak Pedas', price: 18000, qty: 1, customNotes: '' }
    ],
    subtotal: 43000,
    tax: 4300,
    total: 47300,
    paymentMethod: 'GoPay',
    paymentStatus: 'PAID',
    status: 'READY',
    time: '18:35',
    date: '2026-10-21'
  },
  {
    id: 'ORD-9819',
    customerName: 'Mas Hendra',
    orderType: 'dine-in',
    tableNo: 'Meja 08',
    items: [
      { id: 'm5', name: 'Corona Premium Cigar Pack', price: 125000, qty: 1, customNotes: '' }
    ],
    subtotal: 125000,
    tax: 12500,
    total: 137500,
    paymentMethod: 'Cash',
    paymentStatus: 'PAID',
    status: 'COMPLETED',
    time: '18:15',
    date: '2026-10-21'
  }
];

export default function App() {
  // App Modes: 'landing' | 'ordering' | 'pos' | 'dashboard'
  const [activeView, setActiveView] = useState('landing');
  
  // Shared States
  const [menuItems] = useState(INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'takeaway'
  const [tableNo, setTableNo] = useState('01');
  const [customerName, setCustomerName] = useState('');
  
  // Customization Modal State
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [itemSugar, setItemSugar] = useState('Normal (100%)');
  const [itemIce, setItemIce] = useState('Normal Ice');
  const [itemNotes, setItemNotes] = useState('');
  const [itemQty, setItemQty] = useState(1);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // POS State
  const [posSearch, setPosSearch] = useState('');
  const [posCategory, setPosCategory] = useState('all');
  const [posDiscount, setPosDiscount] = useState(0);

  // Format IDR Helper
  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Tax calculation (10%)
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.qty), 0), [cart]);
  const taxAmount = useMemo(() => Math.round(subtotal * 0.1), [subtotal]);
  const discountAmount = useMemo(() => Math.round((subtotal * posDiscount) / 100), [subtotal, posDiscount]);
  const grandTotal = useMemo(() => subtotal + taxAmount - discountAmount, [subtotal, taxAmount, discountAmount]);

  // Add Item to Cart
  const handleAddToCart = () => {
    if (!selectedMenuItem) return;
    
    const cartItem = {
      cartId: Date.now().toString(),
      id: selectedMenuItem.id,
      name: selectedMenuItem.name,
      price: selectedMenuItem.price,
      qty: itemQty,
      customNotes: selectedMenuItem.hasCustomOptions 
        ? `Gula: ${itemSugar}, Es: ${itemIce}${itemNotes ? `, Catatan: ${itemNotes}` : ''}`
        : itemNotes
    };

    setCart(prev => [...prev, cartItem]);
    setSelectedMenuItem(null);
    // Reset defaults
    setItemSugar('Normal (100%)');
    setItemIce('Normal Ice');
    setItemNotes('');
    setItemQty(1);
  };

  const updateCartQty = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Checkout process simulation
  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!customerName.trim()) {
      setCustomerName(activeView === 'pos' ? 'Pelanggan Walk-In' : 'Tamu Kopilinting');
    }
    setIsPaymentModalOpen(true);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName.trim() || (activeView === 'pos' ? 'Walk-In Customer' : 'Pelanggan Web'),
        orderType: orderType,
        tableNo: orderType === 'dine-in' ? `Meja ${tableNo}` : '-',
        items: [...cart],
        subtotal: subtotal,
        tax: taxAmount,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod: paymentMethod,
        paymentStatus: 'PAID',
        status: 'PENDING',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      };

      setOrders(prev => [newOrder, ...prev]);
      setLastCompletedOrder(newOrder);
      setCart([]);
      setPosDiscount(0);
      setPaymentProcessing(false);
      setIsPaymentModalOpen(false);
      setIsCartOpen(false);
      setShowReceiptModal(true);
    }, 1800);
  };

  // Order status progression
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-600 selection:text-white pb-10">
      
      {/* --- TOP NAVBAR & MODE SWITCHER --- */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('landing')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <Flame className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-wider text-amber-100 uppercase block leading-tight">
                  Kopilinting <span className="text-amber-500 text-xs font-normal font-mono">& Cigar</span>
                </span>
                <span className="text-[10px] text-neutral-400 block -mt-1">Tembalang, Semarang</span>
              </div>
            </div>

            {/* Navigation Switcher (Customer vs POS/Admin) */}
            <nav className="hidden md:flex items-center bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
              <button
                onClick={() => setActiveView('landing')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'landing' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Profile / Home
              </button>
              <button
                onClick={() => setActiveView('ordering')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  activeView === 'ordering' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Pesan Menu (Self-Order)</span>
              </button>
              <button
                onClick={() => setActiveView('pos')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  activeView === 'pos' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Sistem Kasir (POS)</span>
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  activeView === 'dashboard' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dapur & Dashboard</span>
              </button>
            </nav>

            {/* Right Action: Cart Trigger */}
            <div className="flex items-center space-x-3">
              {(activeView === 'ordering' || activeView === 'pos') && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-xl transition border border-neutral-700"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                      {cart.reduce((a, b) => a + b.qty, 0)}
                    </span>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mobile View Navigation Toggle */}
        <div className="md:hidden flex items-center justify-around bg-neutral-950 border-t border-neutral-800 px-2 py-2">
          <button
            onClick={() => setActiveView('landing')}
            className={`text-[11px] font-medium px-2 py-1 rounded ${activeView === 'landing' ? 'bg-amber-600 text-white' : 'text-neutral-400'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveView('ordering')}
            className={`text-[11px] font-medium px-2 py-1 rounded ${activeView === 'ordering' ? 'bg-amber-600 text-white' : 'text-neutral-400'}`}
          >
            Pesan Menu
          </button>
          <button
            onClick={() => setActiveView('pos')}
            className={`text-[11px] font-medium px-2 py-1 rounded ${activeView === 'pos' ? 'bg-amber-600 text-white' : 'text-neutral-400'}`}
          >
            Kasir (POS)
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`text-[11px] font-medium px-2 py-1 rounded ${activeView === 'dashboard' ? 'bg-amber-600 text-white' : 'text-neutral-400'}`}
          >
            Dapur & Analytics
          </button>
        </div>
      </header>


      {/* ========================================================================= */}
      {/* 1. LANDING PAGE / WEB PROFIL KEDAI */}
      {/* ========================================================================= */}
      {activeView === 'landing' && (
        <div className="space-y-16 animate-fadeIn">
          
          {/* Hero Section */}
          <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-neutral-800">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80" 
                alt="Coffee & Cigar Lounge Ambience" 
                className="w-full h-full object-cover object-center opacity-25 filter brightness-75 blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest font-semibold mb-4">
                <Flame className="w-3.5 h-3.5" />
                <span>The Premier Coffee & Cigar Hub</span>
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Kopilinting <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700">& Cigar</span>
              </h1>
              <p className="mt-4 text-base sm:text-xl text-neutral-300 font-light max-w-2xl mx-auto">
                Tempat nongkrong eksklusif di Tembalang, Semarang. Nikmati racikan espresso otentik, aroma cerutu lokal pilihan, dan suasana cozy hangat.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => setActiveView('ordering')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-bold rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Pesan Sekarang (Digital Menu)</span>
                </button>
                <button
                  onClick={() => setActiveView('pos')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-700 text-neutral-200 font-medium rounded-xl hover:bg-neutral-800 transition flex items-center justify-center space-x-2"
                >
                  <LayoutDashboard className="w-5 h-5 text-amber-400" />
                  <span>Akses Dashboard Kasir</span>
                </button>
              </div>

              {/* Quick Info Badge */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-neutral-800/80 text-left">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-400">Jam Operasional</p>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">18.00 - 01.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-400">Lokasi</p>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">Tembalang, Semarang</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-400">Suasana</p>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">Warm & Cozy Lounge</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Highlight Signature Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Signature Menu</h2>
                <p className="text-sm text-neutral-400 mt-1">Menu unggulan favorit para pengunjung Kopilinting & Cigar Tembalang</p>
              </div>
              <button 
                onClick={() => setActiveView('ordering')}
                className="mt-4 md:mt-0 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>Lihat Semua Menu</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(i => i.popular).slice(0, 3).map(item => (
                <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-600/50 transition group flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Favorite
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition">{item.name}</h3>
                        <span className="font-bold text-amber-500 text-sm shrink-0 ml-2">{formatIDR(item.price)}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => {
                        setSelectedMenuItem(item);
                        setActiveView('ordering');
                      }}
                      className="w-full py-2.5 bg-neutral-800 hover:bg-amber-600 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pesan Sekarang</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About & Location Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Tentang Kedai Kami</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Kenyamanan Sederhana dengan Cita Rasa Berkelas</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Kopilinting & Cigar hadir sebagai wadah bersantai untuk penikmat kopi, pecinta cerutu, maupun komunitaspemuda di Semarang. Berlokasi di kawasan Tembalang, kami menyajikan kopi racikan berkualitas tinggi, jajaran cerutu premium, dan atmosfir tempat yang tenang.
                  </p>
                  
                  <div className="pt-4 space-y-3 text-xs text-neutral-300">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Alamat Lengkap:</p>
                        <p>Jl. Alam Asri No.42, Sendangmulyo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                      <p><span className="font-semibold text-white">Jam Buka:</span> Setiap Hari, 18.00 – 01.00 WIB</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                      <p><span className="font-semibold text-white">Reservasi / Kontak:</span> +62 812-3456-7890</p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between h-64 sm:h-80 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80" alt="Kedai Map" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 bg-neutral-900/90 backdrop-blur-sm p-3 rounded-xl border border-neutral-800">
                    <p className="text-xs font-bold text-white flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>Kopilinting & Cigar Tembalang</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Sendangmulyo, Kota Semarang</p>
                  </div>
                  <div className="relative z-10">
                    <a 
                      href="https://maps.google.com/?q=Jl.+Alam+Asri+No.42+Sendangmulyo+Tembalang+Semarang" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg"
                    >
                      <span>Buka Google Maps</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}


      {/* ========================================================================= */}
      {/* 2. SISTEM PEMESANAN PELANGGAN (CUSTOMER ORDERING SYSTEM) */}
      {/* ========================================================================= */}
      {activeView === 'ordering' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 animate-fadeIn">
          
          {/* Order Header & Table Selector */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Menu Digital Pelanggan</h1>
              <p className="text-xs text-neutral-400 mt-1">Pilih menu favorit Anda dan selesaikan pesanan secara mandiri.</p>
            </div>

            {/* Order Type & Table Selection */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-neutral-950 p-1 rounded-xl border border-neutral-800 flex">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    orderType === 'dine-in' ? 'bg-amber-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Dine-In (Makan di Tempat)
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    orderType === 'takeaway' ? 'bg-amber-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Takeaway (Bawa Pulang)
                </button>
              </div>

              {orderType === 'dine-in' && (
                <div className="flex items-center space-x-2 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
                  <span className="text-xs text-neutral-400 font-medium">No. Meja:</span>
                  <select 
                    value={tableNo} 
                    onChange={(e) => setTableNo(e.target.value)}
                    className="bg-transparent text-amber-400 text-xs font-bold outline-none cursor-pointer"
                  >
                    {['01','02','03','04','05','06','07','08','09','10'].map(num => (
                      <option key={num} value={num} className="bg-neutral-900 text-white">Meja {num}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-6">
            {MENU_CATEGORIES.map(cat => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setPosCategory(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    posCategory === cat.id
                      ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-900/20'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => posCategory === 'all' || item.category === posCategory)
              .map(item => (
                <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      {item.popular && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white text-base">{item.name}</h3>
                        <span className="font-bold text-amber-500 text-sm shrink-0 ml-2">{formatIDR(item.price)}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => setSelectedMenuItem(item)}
                      className="w-full py-2 bg-amber-600/10 border border-amber-600/30 hover:bg-amber-600 text-amber-400 hover:text-white text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{item.hasCustomOptions ? 'Pilih & Kustom' : 'Tambah ke Keranjang'}</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}


      {/* ========================================================================= */}
      {/* 3. SISTEM KASIR / POS (POINT OF SALE) MODE */}
      {/* ========================================================================= */}
      {activeView === 'pos' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Menu Catalog for Cashier */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Search & Header Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cari menu / minuman..."
                    value={posSearch}
                    onChange={(e) => setPosSearch(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Quick Customer Name Input */}
                <input
                  type="text"
                  placeholder="Nama Pelanggan (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full sm:w-56 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {MENU_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setPosCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      posCategory === cat.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* POS Menu Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {menuItems
                  .filter(item => posCategory === 'all' || item.category === posCategory)
                  .filter(item => item.name.toLowerCase().includes(posSearch.toLowerCase()))
                  .map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMenuItem(item)}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 cursor-pointer hover:border-amber-500/60 transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-24 rounded-lg overflow-hidden mb-2">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        </div>
                        <h4 className="font-semibold text-xs text-white line-clamp-1">{item.name}</h4>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-amber-500 font-bold text-xs">{formatIDR(item.price)}</span>
                        <div className="w-6 h-6 rounded-md bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>

            {/* Right Col: Active POS Cart Sidebar */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-fit space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center space-x-2">
                    <Receipt className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-white text-sm">Kasir - Order Aktif</h3>
                  </div>
                  <span className="text-[11px] bg-neutral-800 text-amber-400 px-2 py-0.5 rounded font-mono">
                    {orderType.toUpperCase()}
                  </span>
                </div>

                {/* Dine-In / Takeaway selection for POS */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`py-1.5 text-xs font-medium rounded-lg border ${
                      orderType === 'dine-in' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Dine-In ({tableNo})
                  </button>
                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`py-1.5 text-xs font-medium rounded-lg border ${
                      orderType === 'takeaway' ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Takeaway
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs">
                      <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Belum ada item dipilih
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.cartId} className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 text-xs flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          {item.customNotes && <p className="text-[10px] text-neutral-400">{item.customNotes}</p>}
                          <p className="text-amber-500 font-bold mt-0.5">{formatIDR(item.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateCartQty(item.cartId, -1)} className="p-1 bg-neutral-800 rounded hover:bg-neutral-700">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-white text-xs">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.cartId, 1)} className="p-1 bg-neutral-800 rounded hover:bg-neutral-700">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Discount & Calculations */}
              {cart.length > 0 && (
                <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
                  {/* Voucher / Discount Simulation */}
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Diskon Kasir:</span>
                    <select
                      value={posDiscount}
                      onChange={(e) => setPosDiscount(Number(e.target.value))}
                      className="bg-neutral-950 border border-neutral-800 text-amber-400 text-xs rounded px-2 py-1 outline-none"
                    >
                      <option value={0}>Tanpa Diskon</option>
                      <option value={10}>Diskon Member 10%</option>
                      <option value={15}>Promo Tembalang 15%</option>
                    </select>
                  </div>

                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span>{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Pajak (10%)</span>
                    <span>{formatIDR(taxAmount)}</span>
                  </div>
                  {posDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Diskon ({posDiscount}%)</span>
                      <span>-{formatIDR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Pembayaran</span>
                    <span className="text-amber-500">{formatIDR(grandTotal)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-3 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-extrabold rounded-xl hover:brightness-110 transition shadow-lg flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Bayar Sekarang ({formatIDR(grandTotal)})</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}


      {/* ========================================================================= */}
      {/* 4. DASHBOARD KITCHEN & MANAGEMENT ANALYTICS */}
      {/* ========================================================================= */}
      {activeView === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8 animate-fadeIn">
          
          {/* Top Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold">Total Omset Harian</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {formatIDR(orders.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.total, 0))}
                </h3>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center">
                  <span>+18.5% dari kemarin</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold">Total Transaksi</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">{orders.length} Order</h3>
                <p className="text-[11px] text-neutral-400 mt-1">Terproses Hari Ini</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Receipt className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold">Pesanan Aktif (Dapur)</p>
                <h3 className="text-2xl font-extrabold text-amber-400 mt-1">
                  {orders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length} Order
                </h3>
                <p className="text-[11px] text-amber-500/80 mt-1">Butuh Diproses</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-600/30">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase font-semibold">Menu Terlaris</p>
                <h3 className="text-base font-bold text-white mt-1 truncate max-w-[140px]">Kopi Linting Signature</h3>
                <p className="text-[11px] text-neutral-400 mt-1">28 Cup Terjual</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Flame className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Kitchen Display System (Barista / Dapur Screen) */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-white text-lg">Kitchen & Barista Display System (KDS)</h3>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
                Live Order Feed
              </span>
            </div>

            {/* Orders Feed Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* PENDING / BARU */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pesanan Baru ({orders.filter(o => o.status === 'PENDING').length})</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'PENDING').map(ord => (
                    <div key={ord.id} className="bg-neutral-900 p-3 rounded-lg border border-amber-600/40 text-xs space-y-2">
                      <div className="flex justify-between items-start font-bold text-white">
                        <span>{ord.id} ({ord.tableNo})</span>
                        <span className="text-[10px] text-neutral-400">{ord.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">{ord.customerName}</p>
                      <div className="space-y-1 py-1 border-t border-b border-neutral-800 text-[11px]">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-neutral-200">{it.qty}x {it.name}</span>
                            <span className="text-neutral-400 text-[10px]">{it.customNotes}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'PROCESSING')}
                        className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded text-xs transition"
                      >
                        Proses (Sedang Dibuat)
                      </button>
                    </div>
                  ))}
                  {orders.filter(o => o.status === 'PENDING').length === 0 && (
                    <p className="text-center text-neutral-600 text-xs py-6">Tidak ada pesanan baru</p>
                  )}
                </div>
              </div>

              {/* PROCESSING / SEDANG DIBUAT */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sedang Dibuat ({orders.filter(o => o.status === 'PROCESSING').length})</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'PROCESSING').map(ord => (
                    <div key={ord.id} className="bg-neutral-900 p-3 rounded-lg border border-blue-500/40 text-xs space-y-2">
                      <div className="flex justify-between items-start font-bold text-white">
                        <span>{ord.id} ({ord.tableNo})</span>
                        <span className="text-[10px] text-neutral-400">{ord.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">{ord.customerName}</p>
                      <div className="space-y-1 py-1 border-t border-b border-neutral-800 text-[11px]">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-neutral-200">{it.qty}x {it.name}</span>
                            <span className="text-neutral-400 text-[10px]">{it.customNotes}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'READY')}
                        className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs transition"
                      >
                        Tandai Siap Saji
                      </button>
                    </div>
                  ))}
                  {orders.filter(o => o.status === 'PROCESSING').length === 0 && (
                    <p className="text-center text-neutral-600 text-xs py-6">Tidak ada pesanan diproses</p>
                  )}
                </div>
              </div>

              {/* READY / SIAP SAJI */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Siap Diambil / Selesai ({orders.filter(o => o.status === 'READY').length})</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'READY').map(ord => (
                    <div key={ord.id} className="bg-neutral-900 p-3 rounded-lg border border-emerald-500/40 text-xs space-y-2">
                      <div className="flex justify-between items-start font-bold text-white">
                        <span>{ord.id} ({ord.tableNo})</span>
                        <span className="text-[10px] text-neutral-400">{ord.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">{ord.customerName}</p>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'COMPLETED')}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs transition"
                      >
                        Selesaikan Pesanan
                      </button>
                    </div>
                  ))}
                  {orders.filter(o => o.status === 'READY').length === 0 && (
                    <p className="text-center text-neutral-600 text-xs py-6">Tidak ada pesanan menunggu</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Sales Transaction History Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="font-bold text-white text-lg mb-4">Riwayat Transaksi Penjualan</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono border-b border-neutral-800">
                  <tr>
                    <th className="p-3">ID Order</th>
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Metode Bayar</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-neutral-800/50">
                      <td className="p-3 font-mono font-bold text-amber-400">{ord.id}</td>
                      <td className="p-3 font-medium text-white">{ord.customerName}</td>
                      <td className="p-3">{ord.orderType === 'dine-in' ? ord.tableNo : 'Takeaway'}</td>
                      <td className="p-3"><span className="bg-neutral-800 px-2 py-0.5 rounded">{ord.paymentMethod}</span></td>
                      <td className="p-3 font-bold text-white">{formatIDR(ord.total)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                          ord.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-400">{ord.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}


      {/* ========================================================================= */}
      {/* MODAL: CUSTOMIZATION OPTIONS (LEVEL GULA / ICE / NOTES) */}
      {/* ========================================================================= */}
      {selectedMenuItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 relative animate-scaleUp space-y-5">
            <button
              onClick={() => setSelectedMenuItem(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex space-x-4">
              <img src={selectedMenuItem.image} alt={selectedMenuItem.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div>
                <h3 className="font-bold text-white text-base">{selectedMenuItem.name}</h3>
                <p className="text-amber-500 font-bold text-sm mt-1">{formatIDR(selectedMenuItem.price)}</p>
                <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">{selectedMenuItem.description}</p>
              </div>
            </div>

            {selectedMenuItem.hasCustomOptions && (
              <div className="space-y-4 pt-3 border-t border-neutral-800 text-xs">
                {/* Sugar Level */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-2">Level Gula / Sweetness:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Normal (100%)', 'Less Sugar (50%)', 'No Sugar (0%)'].map(sugar => (
                      <button
                        key={sugar}
                        onClick={() => setItemSugar(sugar)}
                        className={`py-2 rounded-lg font-medium text-[11px] border transition ${
                          itemSugar === sugar ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {sugar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ice Level */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-2">Level Es / Ice:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Normal Ice', 'Less Ice', 'No Ice / Hot'].map(ice => (
                      <button
                        key={ice}
                        onClick={() => setItemIce(ice)}
                        className={`py-2 rounded-lg font-medium text-[11px] border transition ${
                          itemIce === ice ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {ice}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Custom Notes */}
            <div>
              <label className="block text-xs text-neutral-300 font-semibold mb-1">Catatan Tambahan (Optional):</label>
              <input
                type="text"
                placeholder="Contoh: Pisahkan es, tambahkan tissue..."
                value={itemNotes}
                onChange={(e) => setItemNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Qty & Add Button */}
            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-3 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
                <button onClick={() => setItemQty(Math.max(1, itemQty - 1))} className="text-neutral-400 hover:text-white">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-white text-sm">{itemQty}</span>
                <button onClick={() => setItemQty(itemQty + 1)} className="text-neutral-400 hover:text-white">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-bold rounded-xl hover:brightness-110 transition text-xs shadow-lg"
              >
                Tambah ({formatIDR(selectedMenuItem.price * itemQty)})
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* DRAWER / MODAL: KERANJANG BELANJA (CART DRAWER) */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-neutral-900 border-l border-neutral-800 w-full max-w-md h-full p-6 flex flex-col justify-between animate-slideLeft space-y-4">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-white text-base">Keranjang Pesanan</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Context Details */}
              <div className="my-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs flex justify-between items-center text-neutral-300">
                <span>Tipe: <strong className="text-amber-400 uppercase">{orderType}</strong></span>
                {orderType === 'dine-in' && <span>Nomor Meja: <strong className="text-amber-400">{tableNo}</strong></span>}
              </div>

              {/* Cart Item List */}
              <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500 text-xs">
                    Keranjang Anda masih kosong
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        {item.customNotes && <p className="text-[10px] text-neutral-400 mt-0.5">{item.customNotes}</p>}
                        <p className="text-amber-500 font-bold mt-1">{formatIDR(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateCartQty(item.cartId, -1)} className="p-1 bg-neutral-800 rounded">
                          <Minus className="w-3 h-3 text-neutral-300" />
                        </button>
                        <span className="font-bold text-white">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.cartId, 1)} className="p-1 bg-neutral-800 rounded">
                          <Plus className="w-3 h-3 text-neutral-300" />
                        </button>
                        <button onClick={() => removeFromCart(item.cartId)} className="p-1 text-red-400 hover:text-red-300 ml-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Pajak (10%)</span>
                  <span>{formatIDR(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Total</span>
                  <span className="text-amber-500">{formatIDR(grandTotal)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-extrabold rounded-xl hover:brightness-110 transition shadow-lg mt-2 text-sm flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Lanjut Pembayaran ({formatIDR(grandTotal)})</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* MODAL: PAYMENT GATEWAY SIMULATOR (QRIS / GOPAY / CARD / CASH) */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 relative animate-scaleUp space-y-5">
            
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Pembayaran Pesanan</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Pilih metode pembayaran favorit Anda di bawah ini.</p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { id: 'QRIS', label: 'QRIS / GoPay / OVO', icon: QrCode },
                { id: 'Transfer Bank', label: 'Transfer BCA / Mandiri', icon: CreditCard },
                { id: 'Kartu Kredit', label: 'Kartu Kredit / Debit', icon: Wallet },
                { id: 'Cash', label: 'Bayar Tunai di Kasir', icon: Banknote },
              ].map(pm => {
                const IconComp = pm.icon;
                return (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-xl border flex items-center space-x-2.5 transition text-left ${
                      paymentMethod === pm.id 
                        ? 'bg-amber-600/20 border-amber-500 text-amber-300 font-bold' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment Display Body */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 text-center space-y-3">
              {paymentMethod === 'QRIS' && (
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-xl inline-block shadow-inner">
                    {/* Simulated QR Code */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KOPILINTING-PAY-${grandTotal}`} 
                      alt="QRIS Code" 
                      className="w-36 h-36 mx-auto"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">Scan QRIS menggunakan GoPay, ShopeePay, OVO, atau Mobile Banking.</p>
                </div>
              )}

              {paymentMethod === 'Transfer Bank' && (
                <div className="text-left space-y-2 text-xs">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <p className="text-neutral-400">Bank BCA (Kopilinting Tembalang)</p>
                    <p className="font-mono text-amber-400 font-bold text-sm tracking-wider">8293-0192-3301</p>
                  </div>
                  <p className="text-[10px] text-neutral-400">Silakan transfer nominal pas ke rekening di atas.</p>
                </div>
              )}

              {paymentMethod === 'Cash' && (
                <div className="py-4 text-xs text-neutral-300">
                  <Banknote className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                  <p>Silakan lakukan pembayaran tunai kepada barista/kasir saat mengambil pesanan.</p>
                </div>
              )}

              <div className="pt-2 border-t border-neutral-800 text-xs flex justify-between items-center text-neutral-300 font-semibold">
                <span>Total Tagihan:</span>
                <span className="text-amber-500 text-base font-extrabold">{formatIDR(grandTotal)}</span>
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={processPayment}
              disabled={paymentProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-extrabold rounded-xl hover:brightness-110 transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {paymentProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memproses Transaksi...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Konfirmasi & Cetak Struk</span>
                </>
              )}
            </button>

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* MODAL: E-RECEIPT / NOTA BUKTI PEMBAYARAN */}
      {/* ========================================================================= */}
      {showReceiptModal && lastCompletedOrder && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl p-6 relative animate-scaleUp space-y-4">
            
            <button
              onClick={() => setShowReceiptModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Receipt Frame */}
            <div className="bg-white text-neutral-900 p-5 rounded-xl font-mono text-xs space-y-3 shadow-2xl">
              
              <div className="text-center border-b border-dashed border-neutral-400 pb-3 space-y-0.5">
                <h2 className="font-extrabold text-sm tracking-wider uppercase">KOPILINTING & CIGAR</h2>
                <p className="text-[10px] text-neutral-600">Jl. Alam Asri No.42, Sendangmulyo, Tembalang</p>
                <p className="text-[10px] text-neutral-600">Semarang - Telp: +62 812-3456-7890</p>
              </div>

              <div className="text-[10px] space-y-0.5 text-neutral-700">
                <div className="flex justify-between">
                  <span>No Order:</span>
                  <span className="font-bold">{lastCompletedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span>{lastCompletedOrder.date} {lastCompletedOrder.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pelanggan:</span>
                  <span>{lastCompletedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tipe / Meja:</span>
                  <span>{lastCompletedOrder.orderType.toUpperCase()} ({lastCompletedOrder.tableNo})</span>
                </div>
              </div>

              {/* Items List */}
              <div className="border-t border-b border-dashed border-neutral-400 py-2 space-y-1">
                {lastCompletedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <div>
                      <p className="font-bold">{it.qty}x {it.name}</p>
                      {it.customNotes && <p className="text-[9px] text-neutral-500">{it.customNotes}</p>}
                    </div>
                    <span className="font-semibold">{formatIDR(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1 text-[11px] pt-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span>{formatIDR(lastCompletedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Pajak (10%):</span>
                  <span>{formatIDR(lastCompletedOrder.tax)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-xs text-neutral-950 pt-1 border-t border-neutral-300">
                  <span>TOTAL:</span>
                  <span>{formatIDR(lastCompletedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-600">
                  <span>Metode Bayar:</span>
                  <span>{lastCompletedOrder.paymentMethod} (PAID)</span>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-dashed border-neutral-400 text-[10px] text-neutral-500">
                <p>Terima Kasih Atas Kunjungan Anda!</p>
                <p>Nikmati Kopi & Cerutu Khas Tembalang</p>
              </div>

            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Nota</span>
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition"
              >
                Selesai
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
