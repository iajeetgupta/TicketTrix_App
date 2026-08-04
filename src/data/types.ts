export type FlightDeal = {
  id: string;
  airline: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: 'Non-stop' | '1 Stop';
  price: number;
  bookedLabel: string;
};

export type Hotel = {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
};

export type BusRoute = {
  id: string;
  operator: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  busType: string;
  seatsLeft: number;
  price: number;
  rating: number;
};

export type Package = {
  id: string;
  title: string;
  destination: string;
  nights: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  agency: string;
  rating: number;
  quote: string;
};

export type Booking = {
  id: string;
  type: 'Flight' | 'Hotel' | 'Bus';
  title: string;
  subtitle: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: number;
  reference: string;
};

export type Category = {
  id: string;
  label: string;
  image: string;
};
