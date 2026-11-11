import { Booking, Destination, Hotel, Room, User } from '../models/travel';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@travelnest.com',
    provider: 'Google',
    role: 'admin',
  },
  {
    id: 'u2',
    name: 'John Traveler',
    email: 'john@travelnest.com',
    provider: 'Facebook',
    role: 'user',
  },
];

const roomsParis: Room[] = [
  {
    id: 'r1',
    hotelId: 'h1',
    roomType: 'Deluxe Room',
    pricePerNight: 180,
    capacity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Wi-Fi', 'Breakfast', 'City View', 'Air Conditioning'],
    description: 'Elegant deluxe room with a comfortable king bed and city view.',
  },
  {
    id: 'r2',
    hotelId: 'h1',
    roomType: 'Family Suite',
    pricePerNight: 260,
    capacity: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Wi-Fi', 'Kitchenette', 'Balcony', 'Breakfast'],
    description: 'Spacious family suite designed for comfort and longer stays.',
  },
  {
    id: 'r3',
    hotelId: 'h2',
    roomType: 'Sea View Room',
    pricePerNight: 210,
    capacity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
    availability: false,
    amenities: ['Ocean View', 'Pool Access', 'Wi-Fi', 'Private Bath'],
    description: 'A peaceful room with sea-facing windows and modern decor.',
  },
];

const roomsBali: Room[] = [
  {
    id: 'r4',
    hotelId: 'h3',
    roomType: 'Garden Villa',
    pricePerNight: 220,
    capacity: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Private Pool', 'Spa', 'Breakfast', 'Wi-Fi'],
    description: 'A private tropical villa surrounded by green gardens.',
  },
  {
    id: 'r5',
    hotelId: 'h3',
    roomType: 'Beach Cabin',
    pricePerNight: 170,
    capacity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1445019980597-93aa3fc56f28?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Beach Access', 'Air Conditioning', 'Breakfast'],
    description: 'A cozy cabin close to the beach and sunset views.',
  },
];

const roomsDubai: Room[] = [
  {
    id: 'r6',
    hotelId: 'h4',
    roomType: 'Executive Suite',
    pricePerNight: 310,
    capacity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Sky Lounge', 'Gym', 'Airport Transfer', 'Wi-Fi'],
    description: 'Premium suite with skyline views and executive amenities.',
  },
  {
    id: 'r7',
    hotelId: 'h4',
    roomType: 'Standard King',
    pricePerNight: 240,
    capacity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
    availability: true,
    amenities: ['Gym Access', 'Meeting Room', 'Breakfast'],
    description: 'Contemporary room ideal for business travelers and couples.',
  },
];

const hotels: Hotel[] = [
  {
    id: 'h1',
    destinationId: 'd1',
    name: 'Paris Grand Hotel',
    rating: 4.8,
    description: 'Luxury stay in the heart of Paris.',
    amenities: ['Spa', 'Restaurant', 'Airport Shuttle'],
    isVisible: true,
    rooms: roomsParis,
  },
  {
    id: 'h2',
    destinationId: 'd1',
    name: 'Eiffel Comfort',
    rating: 4.6,
    description: 'Boutique hotel featuring city charm and comfort.',
    amenities: ['Breakfast', 'Bar', 'Tour Desk'],
    isVisible: true,
    rooms: [roomsParis[2]],
  },
  {
    id: 'h3',
    destinationId: 'd2',
    name: 'Bali Retreat',
    rating: 4.9,
    description: 'Tropical resort for a peaceful island holiday.',
    amenities: ['Pool', 'Massage', 'Garden Walk'],
    isVisible: true,
    rooms: roomsBali,
  },
  {
    id: 'h4',
    destinationId: 'd3',
    name: 'Dubai Skyline Resort',
    rating: 4.7,
    description: 'Modern luxury resort near Dubai’s business district.',
    amenities: ['Pool', 'Gym', 'Sky Lounge'],
    isVisible: true,
    rooms: roomsDubai,
  },
];

export const mockDestinations: Destination[] = [
  {
    id: 'd1',
    name: 'Paris',
    country: 'France',
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'Romantic city breaks and iconic landmarks.',
    isVisible: true,
    hotels: [hotels[0], hotels[1]],
  },
  {
    id: 'd2',
    name: 'Bali',
    country: 'Indonesia',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Beach escapes, temples, and tropical wellness.',
    isVisible: true,
    hotels: [hotels[2]],
  },
  {
    id: 'd3',
    name: 'Dubai',
    country: 'UAE',
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury experiences and modern city adventures.',
    isVisible: true,
    hotels: [hotels[3]],
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    userId: 'u2',
    roomId: 'r1',
    hotelId: 'h1',
    destinationId: 'd1',
    checkInDate: '2026-12-10',
    checkOutDate: '2026-12-14',
    guestCount: 2,
    totalPrice: 720,
    status: 'confirmed',
    confirmationNumber: 'TRV-1001',
  },
];
