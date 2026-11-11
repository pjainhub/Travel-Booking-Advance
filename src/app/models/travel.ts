export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  role: UserRole;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  description: string;
  isVisible: boolean;
  hotels: Hotel[];
}

export interface Hotel {
  id: string;
  destinationId: string;
  name: string;
  rating: number;
  description: string;
  amenities: string[];
  isVisible: boolean;
  rooms: Room[];
}

export interface Room {
  id: string;
  hotelId: string;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  imageUrl: string;
  availability: boolean;
  amenities: string[];
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  hotelId: string;
  destinationId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: number;
  status: 'pending' | 'confirmed';
  confirmationNumber: string;
}
