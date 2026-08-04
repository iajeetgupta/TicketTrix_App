import type { Booking, BusRoute, Category, FlightDeal, Hotel, Package, Testimonial } from './types';

// NOTE: All data below is mock/sample data for UI development.
// Swap the functions at the bottom for real API calls once backend access is available.

const img = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = [
  { id: 'international', label: 'International', image: img('ttx-intl') },
  { id: 'honeymoon', label: 'Honeymoon', image: img('ttx-honeymoon') },
  { id: 'beach', label: 'Beach', image: img('ttx-beach') },
  { id: 'adventure', label: 'Adventure', image: img('ttx-adventure') },
  { id: 'hill-station', label: 'Hill Station', image: img('ttx-hill') },
  { id: 'luxury', label: 'Luxury', image: img('ttx-luxury') },
];

export const cities = [
  'New Delhi',
  'Mumbai',
  'Bengaluru',
  'Amritsar',
  'Kolkata',
  'Varanasi',
  'Jaipur',
  'Manali',
  'Goa',
  'Chennai',
  'Hyderabad',
  'Pune',
];

export const flightDeals: FlightDeal[] = [
  {
    id: 'fl-del-atq',
    airline: 'IndiGo',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Amritsar',
    toCode: 'ATQ',
    departTime: '06:20',
    arriveTime: '07:35',
    duration: '1h 15m',
    stops: 'Non-stop',
    price: 5200,
    bookedLabel: '1.2K+ people booked',
  },
  {
    id: 'fl-del-ccu',
    airline: 'Air India',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Kolkata',
    toCode: 'CCU',
    departTime: '09:10',
    arriveTime: '11:30',
    duration: '2h 20m',
    stops: 'Non-stop',
    price: 6100,
    bookedLabel: '980+ people booked',
  },
  {
    id: 'fl-del-vns',
    airline: 'Vistara',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Varanasi',
    toCode: 'VNS',
    departTime: '14:45',
    arriveTime: '16:10',
    duration: '1h 25m',
    stops: 'Non-stop',
    price: 5800,
    bookedLabel: '1.5K+ people booked',
  },
  {
    id: 'fl-del-jai',
    airline: 'SpiceJet',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Jaipur',
    toCode: 'JAI',
    departTime: '08:00',
    arriveTime: '09:00',
    duration: '1h 00m',
    stops: 'Non-stop',
    price: 5900,
    bookedLabel: '2.1K+ people booked',
  },
  {
    id: 'fl-del-kul',
    airline: 'Air India',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Manali',
    toCode: 'KUU',
    departTime: '11:30',
    arriveTime: '12:40',
    duration: '1h 10m',
    stops: 'Non-stop',
    price: 8900,
    bookedLabel: '640+ people booked',
  },
  {
    id: 'fl-del-goi',
    airline: 'IndiGo',
    from: 'New Delhi',
    fromCode: 'DEL',
    to: 'Goa',
    toCode: 'GOI',
    departTime: '17:05',
    arriveTime: '19:40',
    duration: '2h 35m',
    stops: 'Non-stop',
    price: 7400,
    bookedLabel: '3K+ people booked',
  },
];

export const hotels: Hotel[] = [
  {
    id: 'ht-taj-colaba',
    name: 'The Grand Colaba Residency',
    city: 'Mumbai',
    area: 'Colaba',
    rating: 4.6,
    reviews: 812,
    pricePerNight: 8500,
    amenities: ['Free WiFi', 'Pool', 'Breakfast', 'Sea View'],
    image: img('ttx-hotel-1'),
  },
  {
    id: 'ht-bandra-suites',
    name: 'Bandra Suites & Spa',
    city: 'Mumbai',
    area: 'Bandra West',
    rating: 4.3,
    reviews: 540,
    pricePerNight: 6200,
    amenities: ['Free WiFi', 'Spa', 'Gym', 'Breakfast'],
    image: img('ttx-hotel-2'),
  },
  {
    id: 'ht-andheri-business',
    name: 'Andheri Business Hotel',
    city: 'Mumbai',
    area: 'Andheri East',
    rating: 4.0,
    reviews: 301,
    pricePerNight: 2288,
    amenities: ['Free WiFi', 'Airport Shuttle'],
    image: img('ttx-hotel-3'),
  },
  {
    id: 'ht-worli-sky',
    name: 'Worli Sky Towers',
    city: 'Mumbai',
    area: 'Worli',
    rating: 4.8,
    reviews: 967,
    pricePerNight: 18500,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Sea View', 'Bar'],
    image: img('ttx-hotel-4'),
  },
  {
    id: 'ht-juhu-beach',
    name: 'Juhu Beachside Inn',
    city: 'Mumbai',
    area: 'Juhu',
    rating: 4.2,
    reviews: 428,
    pricePerNight: 5400,
    amenities: ['Free WiFi', 'Beach Access', 'Breakfast'],
    image: img('ttx-hotel-5'),
  },
  {
    id: 'ht-powai-lake',
    name: 'Powai Lakeview Hotel',
    city: 'Mumbai',
    area: 'Powai',
    rating: 4.1,
    reviews: 265,
    pricePerNight: 3600,
    amenities: ['Free WiFi', 'Gym', 'Breakfast'],
    image: img('ttx-hotel-6'),
  },
];

export const busRoutes: BusRoute[] = [
  {
    id: 'bus-del-mnl',
    operator: 'Himalayan Volvo Travels',
    from: 'New Delhi',
    to: 'Manali',
    departTime: '20:30',
    arriveTime: '08:00',
    duration: '11h 30m',
    busType: 'AC Sleeper (2+1)',
    seatsLeft: 12,
    price: 1450,
    rating: 4.3,
  },
  {
    id: 'bus-del-jai',
    operator: 'Rajasthan Express',
    from: 'New Delhi',
    to: 'Jaipur',
    departTime: '07:00',
    arriveTime: '12:30',
    duration: '5h 30m',
    busType: 'AC Seater (2+2)',
    seatsLeft: 21,
    price: 650,
    rating: 4.1,
  },
  {
    id: 'bus-del-vns',
    operator: 'Ganga Travels',
    from: 'New Delhi',
    to: 'Varanasi',
    departTime: '18:00',
    arriveTime: '10:00',
    duration: '16h 00m',
    busType: 'AC Sleeper (2+1)',
    seatsLeft: 6,
    price: 1200,
    rating: 3.9,
  },
  {
    id: 'bus-mum-goa',
    operator: 'Konkan Coastal Lines',
    from: 'Mumbai',
    to: 'Goa',
    departTime: '21:15',
    arriveTime: '07:45',
    duration: '10h 30m',
    busType: 'AC Sleeper (2+1)',
    seatsLeft: 18,
    price: 1100,
    rating: 4.5,
  },
  {
    id: 'bus-blr-che',
    operator: 'Southern Star Travels',
    from: 'Bengaluru',
    to: 'Chennai',
    departTime: '23:00',
    arriveTime: '05:30',
    duration: '6h 30m',
    busType: 'AC Sleeper (2+1)',
    seatsLeft: 9,
    price: 850,
    rating: 4.2,
  },
];

export const packages: Package[] = [
  {
    id: 'pkg-goa',
    title: 'Goa Beach Getaway',
    destination: 'Goa',
    nights: 4,
    price: 12999,
    rating: 4.5,
    reviews: 312,
    image: img('ttx-pkg-goa'),
  },
  {
    id: 'pkg-rajasthan',
    title: 'Royal Rajasthan Tour',
    destination: 'Rajasthan',
    nights: 6,
    price: 21999,
    rating: 4.7,
    reviews: 208,
    image: img('ttx-pkg-raj'),
  },
  {
    id: 'pkg-kerala',
    title: 'Kerala Backwaters Escape',
    destination: 'Kerala',
    nights: 5,
    price: 18499,
    rating: 4.8,
    reviews: 431,
    image: img('ttx-pkg-kerala'),
  },
  {
    id: 'pkg-manali',
    title: 'Manali Snow Adventure',
    destination: 'Manali',
    nights: 4,
    price: 14999,
    rating: 4.4,
    reviews: 176,
    image: img('ttx-pkg-manali'),
  },
];

export const testimonials: Testimonial[] = [
  { id: 'ts-1', name: 'Rohit Sharma', agency: 'Sharma Travels, Delhi', rating: 5, quote: 'Best rates I have found for domestic flights. My commission gets credited within 2 days, every time.' },
  { id: 'ts-2', name: 'Priya Menon', agency: 'Menon Holidays, Kochi', rating: 5, quote: 'Booking a hotel takes under a minute now. My clients love the instant confirmation.' },
  { id: 'ts-3', name: 'Aslam Khan', agency: 'Khan Tour & Travels, Lucknow', rating: 4, quote: 'Support team resolves issues fast, even at midnight. That reliability keeps me coming back.' },
  { id: 'ts-4', name: 'Deepika Rao', agency: 'Rao Travel Point, Bengaluru', rating: 5, quote: 'The wallet and commission tracking is transparent. No more chasing payments.' },
  { id: 'ts-5', name: 'Vikram Singh', agency: 'Singh Travel Hub, Chandigarh', rating: 5, quote: 'Package deals for Rajasthan and Kerala are priced better than anywhere else I have checked.' },
  { id: 'ts-6', name: 'Anita Joseph', agency: 'Joseph Travels, Kottayam', rating: 4, quote: 'Bus bookings for group tours are smooth and the seat selection is straightforward.' },
  { id: 'ts-7', name: 'Farhan Ali', agency: 'Ali Travel Services, Hyderabad', rating: 5, quote: 'Switched all my bookings here for the commission alone, stayed for the support.' },
];

export const mockBookings: Booking[] = [
  { id: 'bk-1', type: 'Flight', title: 'New Delhi → Goa', subtitle: 'IndiGo · 6E-204', date: '2026-08-18', status: 'Upcoming', price: 7400, reference: 'TTX-FL-88213' },
  { id: 'bk-2', type: 'Hotel', title: 'Worli Sky Towers', subtitle: 'Mumbai · 2 nights', date: '2026-08-20', status: 'Upcoming', price: 37000, reference: 'TTX-HT-44120' },
  { id: 'bk-3', type: 'Bus', title: 'New Delhi → Jaipur', subtitle: 'Rajasthan Express', date: '2026-06-02', status: 'Completed', price: 650, reference: 'TTX-BS-30981' },
  { id: 'bk-4', type: 'Flight', title: 'New Delhi → Varanasi', subtitle: 'Vistara · UK-841', date: '2026-05-14', status: 'Completed', price: 5800, reference: 'TTX-FL-21005' },
  { id: 'bk-5', type: 'Hotel', title: 'Andheri Business Hotel', subtitle: 'Mumbai · 1 night', date: '2026-04-30', status: 'Cancelled', price: 2288, reference: 'TTX-HT-19887' },
];

// --- Mock "search" seams — replace internals with real API calls later ---

export function searchFlights(from: string, to: string) {
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  const matches = flightDeals.filter(
    (d) => (!f || d.from.toLowerCase().includes(f)) && (!t || d.to.toLowerCase().includes(t))
  );
  return matches.length > 0 ? matches : flightDeals;
}

export function searchHotels(city: string) {
  const c = city.trim().toLowerCase();
  const matches = hotels.filter((h) => !c || h.city.toLowerCase().includes(c));
  return matches.length > 0 ? matches : hotels;
}

export function searchBuses(from: string, to: string) {
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  const matches = busRoutes.filter(
    (b) => (!f || b.from.toLowerCase().includes(f)) && (!t || b.to.toLowerCase().includes(t))
  );
  return matches.length > 0 ? matches : busRoutes;
}

export function getFlightById(id: string) {
  return flightDeals.find((f) => f.id === id);
}

export function getHotelById(id: string) {
  return hotels.find((h) => h.id === id);
}

export function getBusById(id: string) {
  return busRoutes.find((b) => b.id === id);
}

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
