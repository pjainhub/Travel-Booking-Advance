import { TestBed } from '@angular/core/testing';
import { TravelService } from './travel.service';

describe('TravelService', () => {
  let service: TravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return visible destinations only', () => {
    const destinations = service.getDestinations();
    expect(destinations.length).toBeGreaterThan(0);
    expect(destinations.every((destination) => destination.isVisible)).toBeTrue();
  });

  it('should return rooms by destination', () => {
    const rooms = service.getRoomsByDestination('d1');
    expect(rooms.length).toBeGreaterThan(0);
    expect(rooms.every((room) => room.availability)).toBeTrue();
  });

  it('should create a booking and persist the current booking', () => {
    const booking = {
      id: 'b-100',
      userId: 'u1',
      roomId: 'room-1',
      hotelId: 'hotel-1',
      destinationId: 'd1',
      checkInDate: '2026-12-01',
      checkOutDate: '2026-12-04',
      guestCount: 2,
      totalPrice: 450,
      status: 'confirmed' as const,
      confirmationNumber: 'TRV-100',
    };

    const created = service.createBooking(booking);

    expect(created).toEqual(booking);
    expect(service.getBooking()).toEqual(booking);
    expect(service.getBookings().some((item) => item.id === booking.id)).toBeTrue();
  });
});
