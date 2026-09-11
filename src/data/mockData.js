// ── Mock data for KRISHAMITRA platform ──

export const currentFarmer = {
  id: 'f001',
  name: 'Ravi Kumar',
  village: 'Palamuru',
  district: 'Nalgonda',
  state: 'Telangana',
  phone: '9876543210',
  landSize: '5 acres',
  verified: true,
  trustScore: 87,
  avatar: null,
  crops: [
    { id: 'c1', name: 'Tomato', quantity: 500, unit: 'kg', harvestDate: '2026-09-15', quality: 'Grade A', status: 'Ready' },
    { id: 'c2', name: 'Onion', quantity: 300, unit: 'kg', harvestDate: '2026-09-20', quality: 'Grade B', status: 'Harvesting' },
    { id: 'c3', name: 'Chilli', quantity: 150, unit: 'kg', harvestDate: '2026-10-01', quality: 'Grade A', status: 'Growing' },
  ]
};

export const todayOpportunities = [
  {
    id: 'op1',
    type: 'demand',
    icon: '📈',
    label: 'High Demand',
    title: 'Tomato in High Demand',
    detail: 'Demand 30% higher than last week in Hyderabad',
    value: '+30%',
    color: 'green',
    action: 'View Market',
  },
  {
    id: 'op2',
    type: 'buyer',
    icon: '🛒',
    label: 'Nearby Buyers',
    title: '3 Verified Buyers Nearby',
    detail: 'Looking for Tomato within 40 km of your location',
    value: '3 buyers',
    color: 'blue',
    action: 'View Buyers',
  },
  {
    id: 'op3',
    type: 'price',
    icon: '💰',
    label: 'Best Return',
    title: 'Best Price: ₹27/kg',
    detail: 'Buyer in Suryapet offers ₹4 more than local mandi',
    value: '₹27/kg',
    color: 'gold',
    action: 'Connect Now',
  },
  {
    id: 'op4',
    type: 'weather',
    icon: '🌦️',
    label: 'Weather Alert',
    title: 'Light Rain Expected',
    detail: 'Tomorrow: 12mm rainfall. Harvest before 6 AM.',
    value: '12mm',
    color: 'blue',
    action: 'Advisory',
  },
  {
    id: 'op5',
    type: 'surplus',
    icon: '♻️',
    label: 'Surplus Opportunity',
    title: 'Convert Surplus to Value',
    detail: 'Processing unit nearby accepts Grade B Onion',
    value: '₹8/kg',
    color: 'pink',
    action: 'Explore',
  },
];

export const smartRecommendation = {
  crop: 'Tomato',
  quantity: '500 kg',
  buyer: 'Sri Lakshmi Traders',
  buyerVerified: true,
  distance: '38 km',
  sellingPrice: 2700,
  transport: 350,
  netReturn: 2350,
  trustScore: 92,
  reason: 'Best price + nearest verified buyer + low transport cost',
};

export const mapMarkers = [
  { id: 'm1', type: 'buyer',    lat: 17.38,  lng: 79.20, name: 'Sri Lakshmi Traders',     requirement: '500 kg Tomato', rate: '₹27/kg', distance: '38 km', rating: 4.8, verified: true, availability: 'Today' },
  { id: 'm2', type: 'market',   lat: 17.25,  lng: 79.35, name: 'Nalgonda APMC',           requirement: 'All Crops', rate: '₹22/kg', distance: '12 km', rating: 4.2, verified: true, availability: 'Daily' },
  { id: 'm3', type: 'storage',  lat: 17.42,  lng: 79.10, name: 'Cold Storage Miryalaguda', requirement: 'Capacity: 10 tons', rate: '₹2/kg/day', distance: '18 km', rating: 4.5, verified: true, availability: 'Available' },
  { id: 'm4', type: 'transport',lat: 17.30,  lng: 79.28, name: 'Raju Transport Services', requirement: '1–5 ton loads', rate: '₹12/km', distance: '8 km', rating: 4.6, verified: false, availability: 'Available' },
  { id: 'm5', type: 'processing',lat: 17.48, lng: 79.15, name: 'AgroProcess Unit Kodad',  requirement: 'Grade B Tomato', rate: '₹10/kg', distance: '45 km', rating: 4.3, verified: true, availability: 'Mon–Sat' },
  { id: 'm6', type: 'restaurant',lat: 17.36, lng: 79.40, name: 'Hotel Green Palace',      requirement: '50 kg Tomato/week', rate: '₹25/kg', distance: '20 km', rating: 4.0, verified: true, availability: 'Weekly' },
  { id: 'm7', type: 'input',    lat: 17.28,  lng: 79.22, name: 'Kisan Agro Inputs',       requirement: 'Seeds & Fertilizers', rate: 'Market price', distance: '5 km', rating: 4.7, verified: true, availability: 'Open' },
  { id: 'm8', type: 'buyer',    lat: 17.32,  lng: 79.32, name: 'FreshVeg Exports',        requirement: '2 ton Tomato', rate: '₹29/kg', distance: '55 km', rating: 4.9, verified: true, availability: 'Tomorrow' },
];

export const priceData = [
  { month: 'Apr', local: 18, district: 20, buyer: 22 },
  { month: 'May', local: 20, district: 23, buyer: 25 },
  { month: 'Jun', local: 15, district: 18, buyer: 20 },
  { month: 'Jul', local: 12, district: 15, buyer: 17 },
  { month: 'Aug', local: 19, district: 22, buyer: 25 },
  { month: 'Sep', local: 22, district: 25, buyer: 27 },
];

export const demandData = [
  { crop: 'Tomato', demand: 85, supply: 60 },
  { crop: 'Onion',  demand: 70, supply: 80 },
  { crop: 'Potato', demand: 65, supply: 55 },
  { crop: 'Chilli', demand: 90, supply: 40 },
  { crop: 'Brinjal',demand: 50, supply: 45 },
];

export const profitData = [
  { month: 'Apr', revenue: 12000, expenses: 4000, profit: 8000 },
  { month: 'May', revenue: 18000, expenses: 5500, profit: 12500 },
  { month: 'Jun', revenue: 9000,  expenses: 3200, profit: 5800 },
  { month: 'Jul', revenue: 7500,  expenses: 2800, profit: 4700 },
  { month: 'Aug', revenue: 15000, expenses: 4500, profit: 10500 },
  { month: 'Sep', revenue: 22000, expenses: 6000, profit: 16000 },
];

export const cropWiseProfit = [
  { name: 'Tomato', value: 45, fill: '#F4A7C0' },
  { name: 'Onion',  value: 30, fill: '#D4A843' },
  { name: 'Chilli', value: 25, fill: '#C9748F' },
];

export const orders = [
  {
    id: 'ord001',
    crop: 'Tomato',
    quantity: '200 kg',
    buyer: 'Sri Lakshmi Traders',
    buyerVerified: true,
    sellingPrice: '₹27/kg',
    total: '₹5,400',
    transport: 'Raju Transport',
    status: 'In Transit',
    steps: ['Order Placed','Accepted','Confirmed','Pickup','In Transit','Delivered','Completed'],
    currentStep: 4,
    date: '10 Sep 2026',
  },
  {
    id: 'ord002',
    crop: 'Onion',
    quantity: '100 kg',
    buyer: 'Nalgonda APMC',
    buyerVerified: true,
    sellingPrice: '₹22/kg',
    total: '₹2,200',
    transport: 'Self',
    status: 'Completed',
    steps: ['Order Placed','Accepted','Confirmed','Pickup','In Transit','Delivered','Completed'],
    currentStep: 6,
    date: '05 Sep 2026',
  },
];

export const notifications = [
  { id: 'n1', type: 'price',   icon: '📈', unread: true,  title: 'Price Opportunity',     message: 'Tomato prices increased by ₹3/kg in Hyderabad market.', time: '2 min ago',   action: 'View Market' },
  { id: 'n2', type: 'weather', icon: '🌧️', unread: true,  title: 'Weather Alert',         message: 'Heavy rainfall expected tomorrow. Check crop protection.', time: '1 hr ago',  action: 'See Advisory' },
  { id: 'n3', type: 'buyer',   icon: '🤝', unread: true,  title: 'New Buyer Request',     message: 'A verified buyer wants 500 kg Tomato near you.', time: '3 hrs ago',         action: 'View Buyer' },
  { id: 'n4', type: 'surplus', icon: '♻️', unread: false, title: 'Surplus Opportunity',   message: 'High Onion supply detected. Processing options available.', time: '5 hrs ago', action: 'Explore' },
  { id: 'n5', type: 'system',  icon: '✅', unread: false, title: 'Order Delivered',       message: 'Your Onion order (100 kg) was delivered successfully.', time: 'Yesterday',   action: 'View Order' },
  { id: 'n6', type: 'price',   icon: '📊', unread: false, title: 'Market Intelligence',   message: 'Chilli prices expected to rise next week.', time: '2 days ago',              action: 'View Report' },
];

export const inputDiscovery = {
  Tomato: [
    { name: 'Mahyco Tomato Seeds F1', type: 'Seeds', price: '₹280/pkt', shop: 'Kisan Agro Inputs', distance: '5 km', rating: 4.7, available: true },
    { name: 'DAP Fertilizer 50kg', type: 'Fertilizer', price: '₹1,350/bag', shop: 'Surabhi Agro', distance: '8 km', rating: 4.5, available: true },
    { name: 'Carbendazim Fungicide', type: 'Pesticide', price: '₹340/L', shop: 'Kisan Agro Inputs', distance: '5 km', rating: 4.3, available: true },
    { name: 'Tomato Crates (20 pcs)', type: 'Packaging', price: '₹600/set', shop: 'Agri Packing Hub', distance: '12 km', rating: 4.6, available: false },
  ],
  Onion: [
    { name: 'Nasik Red Onion Seeds', type: 'Seeds', price: '₹220/pkt', shop: 'Kisan Agro Inputs', distance: '5 km', rating: 4.4, available: true },
    { name: 'Urea 45kg Bag', type: 'Fertilizer', price: '₹290/bag', shop: 'Surabhi Agro', distance: '8 km', rating: 4.5, available: true },
    { name: 'Onion Mesh Bags (50 pcs)', type: 'Packaging', price: '₹150/pack', shop: 'Agri Packing Hub', distance: '12 km', rating: 4.2, available: true },
  ],
};

export const surplusOpportunities = [
  {
    crop: 'Tomato',
    freshDemand: 'Low',
    supply: 'High',
    channels: [
      { name: 'Processing Unit',  icon: '🏭', price: '₹10/kg', desc: 'AgroProcess Kodad — Grade B Tomato accepted' },
      { name: 'Ketchup/Sauce',    icon: '🍅', price: '₹12/kg', desc: 'SHG unit processing tomato sauce nearby' },
      { name: 'Tomato Puree',     icon: '🫙', price: '₹11/kg', desc: 'Bulk puree contract available' },
      { name: 'Dehydration',      icon: '☀️', price: '₹15/kg', desc: 'Solar dehydration unit in Nalgonda' },
    ]
  },
  {
    crop: 'Onion',
    freshDemand: 'Medium',
    supply: 'High',
    channels: [
      { name: 'Cold Storage',     icon: '❄️', price: '₹2/kg/day', desc: 'Hold stock for 4–6 weeks for better price' },
      { name: 'Dehydrated Onion', icon: '🧅', price: '₹18/kg', desc: 'Export-grade dehydration unit' },
      { name: 'Onion Powder',     icon: '🌫️', price: '₹22/kg', desc: 'Value-added processing nearby' },
    ]
  }
];

export const marketPriceComparison = {
  crop: 'Tomato',
  options: [
    { label: 'Local Mandi', price: 22, icon: '🏪', detail: 'Palamuru Local Market', highlight: false },
    { label: 'District Market', price: 25, icon: '🏬', detail: 'Nalgonda APMC', highlight: false },
    { label: 'Verified Buyer', price: 27, icon: '🤝', detail: 'Sri Lakshmi Traders', highlight: true },
    { label: 'Net After Transport', price: 23.5, icon: '🚚', detail: 'After ₹350 transport cost', highlight: false },
  ]
};

export const weatherData = {
  today: { condition: 'Partly Cloudy', temp: 31, humidity: 68, wind: 12, rain: 0 },
  tomorrow: { condition: 'Light Rain', temp: 28, humidity: 82, wind: 18, rain: 12 },
  advisory: 'Harvest Tomato before 6 AM tomorrow. Cover Chilli crop with polythene sheets.',
};

export const stateDistrictData = [
  { district: 'Nalgonda', supply: 80, demand: 75, topCrop: 'Tomato' },
  { district: 'Khammam', supply: 60, demand: 85, topCrop: 'Chilli' },
  { district: 'Warangal', supply: 70, demand: 65, topCrop: 'Onion' },
  { district: 'Medak', supply: 90, demand: 55, topCrop: 'Maize' },
  { district: 'Karimnagar', supply: 45, demand: 80, topCrop: 'Cotton' },
];
