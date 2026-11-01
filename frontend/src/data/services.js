// Mock catalogue used until the Laravel API exists. Shape mirrors what the API should return.
// `availability` lists the day-buckets a service can be booked in: 'today' | 'tomorrow' | 'week'.

export const CATEGORIES = [
  { slug: 'plumbing', name: 'Plumbing', theme: 'blue', worker: 'plumber' },
  { slug: 'electrician', name: 'Electrician', theme: 'orange', worker: 'electrician' },
  { slug: 'carpenter', name: 'Carpenter', theme: 'green', worker: 'carpenter' },
  { slug: 'cleaning', name: 'Cleaning', theme: 'purple', worker: 'cleaner' },
];

export const PRICE_RANGES = [
  { id: '0-500', label: '৳0 - ৳500', min: 0, max: 500 },
  { id: '500-1000', label: '৳500 - ৳1000', min: 500, max: 1000 },
  { id: '1000-2000', label: '৳1000 - ৳2000', min: 1000, max: 2000 },
  { id: '2000+', label: '৳2000+', min: 2000, max: Infinity },
];

export const RATING_OPTIONS = [4, 3, 2];

export const AVAILABILITY = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'week', label: 'This Week' },
];

export const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Name (A-Z)' },
];

export const AREAS = ['Agrabad', 'GEC Circle', 'Nasirabad', 'Khulshi', 'Halishahar', 'Pahartali', 'Chawkbazar', 'Patenga', 'Kotwali', 'Oxygen'];

export const TIME_SLOTS = ['08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM'];

const ALL = ['today', 'tomorrow', 'week'];
const TOM = ['tomorrow', 'week'];

const faq = (q, a) => ({ q, a });
const COMMON_FAQS = [
  faq('How soon can a professional arrive?', 'Most bookings are confirmed within minutes and a professional arrives in your chosen time slot. Same day slots depend on availability in your area.'),
  faq('Do I pay extra for spare parts?', 'The starting price covers labour only. Any spare parts are shown to you and priced before work begins, so there are no surprises.'),
  faq('What if I am not satisfied?', 'Every job comes with a service warranty. If something is not right, contact us and we will send someone to fix it at no extra cost.'),
];

export const SERVICES = [
  {
    slug: 'plumbing-service', name: 'Plumbing Service', category: 'plumbing', price: 299, rating: 4.9, reviews: 120, popularity: 980, availability: ALL, warranty: '3 Days Service Warranty',
    desc: 'We provide professional plumbing services for your home and office.',
    long: 'From leaking pipes to new bathroom fittings, our verified plumbers handle everyday plumbing jobs quickly and cleanly, with proper tools and genuine fittings.',
    keywords: ['pipe', 'leak', 'tap', 'basin', 'drain', 'water', 'plumber', 'bathroom'],
    included: ['Pipe leak repair', 'Tap & basin installation', 'Bathroom fittings', 'Drainage cleaning', 'Water pump repair'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'pipe-leak-repair', name: 'Pipe Leak Repair', category: 'plumbing', price: 349, rating: 4.8, reviews: 88, popularity: 760, availability: ALL, warranty: '7 Days Service Warranty',
    desc: 'Quick diagnosis and repair of leaking pipes, joints and connections.',
    long: 'A dripping pipe wastes water and damages walls. We locate the leak, repair or replace the section and test the line before leaving.',
    keywords: ['pipe', 'leak', 'water', 'joint', 'plumber'],
    included: ['Leak detection', 'Joint and fitting repair', 'Pipe section replacement', 'Pressure test'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'tap-basin-installation', name: 'Tap & Basin Installation', category: 'plumbing', price: 249, rating: 4.7, reviews: 64, popularity: 540, availability: TOM, warranty: '3 Days Service Warranty',
    desc: 'Installation or replacement of taps, mixers, basins and sinks.',
    long: 'Give your kitchen or bathroom a fresh look. We fit new taps, mixers and basins neatly and make sure everything is leak free.',
    keywords: ['tap', 'basin', 'sink', 'mixer', 'faucet', 'plumber'],
    included: ['Old tap removal', 'New tap or mixer fitting', 'Basin and sink mounting', 'Leak check'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'water-pump-repair', name: 'Water Pump Repair', category: 'plumbing', price: 499, rating: 4.6, reviews: 41, popularity: 330, availability: ALL, warranty: '7 Days Service Warranty',
    desc: 'Repair and servicing of household water pumps and motors.',
    long: 'Pump not starting or losing pressure? Our technicians diagnose motor, capacitor and valve problems on site.',
    keywords: ['pump', 'motor', 'water', 'tank', 'pressure', 'plumber'],
    included: ['Motor and capacitor check', 'Valve and pipe inspection', 'Pressure tuning', 'Minor part replacement (labour)'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'electrician-service', name: 'Electrician Service', category: 'electrician', price: 299, rating: 4.8, reviews: 98, popularity: 910, availability: ALL, warranty: '3 Days Service Warranty',
    desc: 'Safe and reliable electrical repair and installation at home.',
    long: 'Licensed electricians for lights, fans, switches, sockets and wiring faults. We follow safety standards on every job.',
    keywords: ['light', 'fan', 'wiring', 'switch', 'socket', 'electric', 'electrician', 'power'],
    included: ['Switch and socket repair', 'Light and fan fitting', 'Fault finding', 'MCB and fuse check', 'Safety inspection'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'fan-installation', name: 'Ceiling Fan Installation', category: 'electrician', price: 249, rating: 4.7, reviews: 72, popularity: 620, availability: ALL, warranty: '3 Days Service Warranty',
    desc: 'New ceiling fan fitting, regulator setup and old fan removal.',
    long: 'We mount ceiling and wall fans securely, wire the regulator and test speed and balance.',
    keywords: ['fan', 'ceiling', 'regulator', 'electric', 'electrician'],
    included: ['Old fan removal', 'Secure mounting', 'Regulator wiring', 'Speed and balance test'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'wiring-switch-repair', name: 'Wiring & Switch Repair', category: 'electrician', price: 399, rating: 4.6, reviews: 55, popularity: 480, availability: TOM, warranty: '7 Days Service Warranty',
    desc: 'Fix short circuits, loose wiring, faulty switches and boards.',
    long: 'Tripping breakers or sparking switches are warning signs. We trace the fault and repair it safely.',
    keywords: ['wiring', 'wire', 'switch', 'board', 'short circuit', 'electric', 'electrician'],
    included: ['Short circuit tracing', 'Wire and conduit repair', 'Switchboard replacement', 'Earthing check'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'light-fitting', name: 'Light Fitting & Decor', category: 'electrician', price: 199, rating: 4.5, reviews: 37, popularity: 290, availability: ALL, warranty: '3 Days Service Warranty',
    desc: 'Tube light, LED panel, chandelier and decorative light installation.',
    long: 'We install and replace all types of household lights, including decorative and hard to reach fixtures.',
    keywords: ['light', 'led', 'tube', 'chandelier', 'lamp', 'electric', 'electrician'],
    included: ['Fixture mounting', 'Wiring connection', 'Bulb and driver replacement', 'Testing'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'carpenter-service', name: 'Carpenter Service', category: 'carpenter', price: 399, rating: 4.7, reviews: 86, popularity: 700, availability: ALL, warranty: '5 Days Service Warranty',
    desc: 'Skilled carpentry for furniture, doors, shelves and wood work.',
    long: 'Experienced carpenters for repairs and custom wood work, using quality material and clean finishing.',
    keywords: ['furniture', 'door', 'shelf', 'wood', 'carpenter', 'repair', 'cabinet'],
    included: ['Furniture repair', 'Door and window fixing', 'Shelf installation', 'Wood polish touch-up'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'furniture-repair', name: 'Furniture Repair', category: 'carpenter', price: 449, rating: 4.6, reviews: 49, popularity: 410, availability: TOM, warranty: '5 Days Service Warranty',
    desc: 'Repair of beds, tables, chairs, sofa frames and drawers.',
    long: 'Wobbly chairs, broken drawers or loose bed frames are fixed and reinforced so they last.',
    keywords: ['furniture', 'bed', 'table', 'chair', 'drawer', 'wood', 'carpenter'],
    included: ['Joint reinforcement', 'Drawer and rail repair', 'Hinge replacement', 'Surface touch-up'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'door-lock-hinge', name: 'Door, Lock & Hinge Fixing', category: 'carpenter', price: 299, rating: 4.5, reviews: 33, popularity: 270, availability: ALL, warranty: '3 Days Service Warranty',
    desc: 'Door alignment, lock replacement, hinge and handle fitting.',
    long: 'Doors that stick, sag or will not lock are quickly adjusted or fitted with new hardware.',
    keywords: ['door', 'lock', 'hinge', 'handle', 'window', 'carpenter'],
    included: ['Door alignment', 'Lock and handle replacement', 'Hinge fitting', 'Window latch repair'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'wardrobe-shelf-installation', name: 'Wardrobe & Shelf Installation', category: 'carpenter', price: 599, rating: 4.8, reviews: 29, popularity: 240, availability: TOM, warranty: '7 Days Service Warranty',
    desc: 'Assembly and wall mounting of wardrobes, shelves and cabinets.',
    long: 'Flat pack or custom, we assemble and mount wardrobes, shelves and cabinets level and secure.',
    keywords: ['wardrobe', 'shelf', 'cabinet', 'assembly', 'wood', 'carpenter', 'furniture'],
    included: ['Assembly of flat-pack units', 'Wall mounting', 'Door alignment', 'Final clean-up'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'deep-cleaning', name: 'Deep Cleaning', category: 'cleaning', price: 599, rating: 4.8, reviews: 75, popularity: 850, availability: ALL, warranty: '2 Days Re-clean Guarantee',
    desc: 'Top-to-bottom deep cleaning for apartments and houses.',
    long: 'A trained team cleans every room, including floors, windows, kitchen and bathrooms, using safe products and proper equipment.',
    keywords: ['clean', 'cleaning', 'home', 'house', 'floor', 'window', 'maid', 'deep'],
    included: ['Floor scrubbing and mopping', 'Kitchen and bathroom cleaning', 'Window and glass cleaning', 'Dusting of all surfaces', 'Balcony cleaning'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'bathroom-cleaning', name: 'Bathroom Cleaning', category: 'cleaning', price: 499, rating: 4.7, reviews: 64, popularity: 640, availability: ALL, warranty: '2 Days Re-clean Guarantee',
    desc: 'Descaling, stain removal and sanitising of tiles, fittings and floors.',
    long: 'We remove limescale and stubborn stains and leave your bathroom hygienic and shining.',
    keywords: ['bathroom', 'toilet', 'tile', 'clean', 'cleaning', 'washroom'],
    included: ['Tile and grout scrubbing', 'Descaling of fittings', 'Toilet and basin sanitising', 'Floor and drain cleaning'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'kitchen-cleaning', name: 'Kitchen Cleaning', category: 'cleaning', price: 499, rating: 4.6, reviews: 52, popularity: 520, availability: TOM, warranty: '2 Days Re-clean Guarantee',
    desc: 'Degreasing of counters, chimney, hob, sink and cabinets.',
    long: 'Heavy grease and cooking stains are removed from every surface so your kitchen feels new again.',
    keywords: ['kitchen', 'chimney', 'grease', 'clean', 'cleaning', 'cabinet'],
    included: ['Chimney and hob degreasing', 'Cabinet exterior cleaning', 'Sink and counter polishing', 'Floor and tile cleaning'],
    faqs: COMMON_FAQS,
  },
  {
    slug: 'sofa-cleaning', name: 'Sofa & Carpet Cleaning', category: 'cleaning', price: 699, rating: 4.5, reviews: 38, popularity: 310, availability: TOM, warranty: '2 Days Re-clean Guarantee',
    desc: 'Dry and wet shampoo cleaning for sofas, mattresses and carpets.',
    long: 'Deep extraction cleaning lifts dust, stains and odours from upholstery and carpets.',
    keywords: ['sofa', 'carpet', 'mattress', 'upholstery', 'clean', 'cleaning'],
    included: ['Vacuum and dust removal', 'Shampoo and stain treatment', 'Extraction drying', 'Deodorising'],
    faqs: COMMON_FAQS,
  },
];

export const REVIEWS = [
  { name: 'Rashed Ahmed', rating: 5, date: '2 weeks ago', text: 'Very fast and professional. The technician was friendly and fixed the issue perfectly.' },
  { name: 'Sadia Islam', rating: 5, date: '1 month ago', text: 'Arrived exactly on time and cleaned up after the work. Fair price, will book again.' },
  { name: 'Fahim Uddin', rating: 4, date: '2 months ago', text: 'Good work overall. Took a little longer than expected but the result was great.' },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const relatedServices = (service, n = 4) => SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, n);
