import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { mockBookings, mockDestinations, mockUsers } from '../data/mock-data';
import { Booking, Destination, Room, User } from '../models/travel';

@Injectable({ providedIn: 'root' })
export class TravelService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  private readonly selectedRoomSubject = new BehaviorSubject<Room | null>(null);
  readonly selectedRoom$ = this.selectedRoomSubject.asObservable();

  private currentBooking: Booking | null = null;
  private firebaseReady = false;

  constructor() {
    this.initializeFirebaseIfPossible();
    this.hydratePersistedData();
  }

  private hydratePersistedData(): void {
    try {
      const persistedDestinations = localStorage.getItem('travel-destinations');
      if (persistedDestinations) {
        const parsed = JSON.parse(persistedDestinations) as Destination[];
        if (Array.isArray(parsed) && parsed.length) {
          mockDestinations.splice(0, mockDestinations.length, ...parsed);
        }
      }

      const persistedBookings = localStorage.getItem('travel-bookings');
      if (persistedBookings) {
        const parsed = JSON.parse(persistedBookings) as Booking[];
        if (Array.isArray(parsed)) {
          mockBookings.splice(0, mockBookings.length, ...parsed);
        }
      }

      const persistedUser = localStorage.getItem('travel-current-user');
      if (persistedUser) {
        const parsed = JSON.parse(persistedUser) as User | null;
        this.currentUserSubject.next(parsed);
      }
    } catch {
      // Ignore persisted state issues and use defaults.
    }
  }

  private persistDestinations(): void {
    localStorage.setItem('travel-destinations', JSON.stringify(mockDestinations));
  }

  private persistBookings(): void {
    localStorage.setItem('travel-bookings', JSON.stringify(mockBookings));
  }

  private persistUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem('travel-current-user');
      return;
    }
    localStorage.setItem('travel-current-user', JSON.stringify(user));
  }

  private initializeFirebaseIfPossible(): void {
    const firebaseConfig = (globalThis as any).firebaseConfig;
    if (!firebaseConfig || !firebaseConfig.apiKey || !firebaseConfig.projectId) {
      return;
    }

    try {
      initializeApp(firebaseConfig);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.currentUserSubject.next(null);
          return;
        }

        const mappedUser: User = {
          id: user.uid,
          name: user.displayName ?? user.email ?? 'Traveler',
          email: user.email ?? '',
          provider: user.providerData[0]?.providerId ?? 'Google',
          role: user.email === 'admin@travelnest.com' ? 'admin' : 'user',
        };

        this.currentUserSubject.next(mappedUser);
      });
      this.firebaseReady = true;
    } catch {
      this.firebaseReady = false;
    }
  }

  private async loginWithProvider(providerName: 'Google' | 'Facebook'): Promise<User | null> {
    if (!this.firebaseReady) {
      throw new Error('Firebase is not configured. Add your real Firebase project config in src/main.ts to enable Google/Facebook sign-in.');
    }

    try {
      const { getAuth } = await import('firebase/auth');
      const auth = getAuth();
      const provider = providerName === 'Google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const mappedUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName ?? firebaseUser.email ?? (providerName === 'Google' ? 'Google User' : 'Facebook User'),
        email: firebaseUser.email ?? '',
        provider: providerName,
        role: firebaseUser.email === 'admin@travelnest.com' ? 'admin' : 'user',
      };

      this.currentUserSubject.next(mappedUser);
      this.persistUser(mappedUser);
      return mappedUser;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      const detail = firebaseError?.message ? ` Details: ${firebaseError.message}` : '';
      const code = firebaseError?.code ? ` (${firebaseError.code})` : '';
      console.error(`Firebase ${providerName} sign-in error`, error);
      throw new Error(
        `Real ${providerName} sign-in failed${code}. Please check your Firebase project configuration, authDomain, and enabled ${providerName} provider in Firebase Console.${detail}`,
      );
    }
  }

  async loginWithGoogle(): Promise<User | null> {
    return this.loginWithProvider('Google');
  }

  async loginWithFacebook(): Promise<User | null> {
    return this.loginWithProvider('Facebook');
  }

  async logoutFromAuth(): Promise<void> {
    if (this.firebaseReady) {
      try {
        const { getAuth, signOut } = await import('firebase/auth');
        await signOut(getAuth());
      } catch {
        // Ignore logout issues if the provider signout fails.
      }
    }

    this.currentUserSubject.next(null);
    this.persistUser(null);
  }

  login(provider: string): void {
    throw new Error(`Mock login is disabled. Please configure Firebase for ${provider} sign-in.`);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.persistUser(null);
  }

  getDestinations(): Destination[] {
    return mockDestinations.filter((destination) => destination.isVisible);
  }

  getDestinationById(id: string): Destination | undefined {
    return mockDestinations.find((destination) => destination.id === id);
  }

  getRoomsByDestination(destinationId: string): Room[] {
    const destination = this.getDestinationById(destinationId);
    if (!destination) {
      return [];
    }

    return destination.hotels
      .filter((hotel) => hotel.isVisible)
      .flatMap((hotel) => hotel.rooms.filter((room) => room.availability));
  }

  getRoomById(roomId: string): Room | undefined {
    return mockDestinations
      .flatMap((destination) => destination.hotels)
      .flatMap((hotel) => hotel.rooms)
      .find((room) => room.id === roomId);
  }

  setSelectedRoom(room: Room): void {
    this.selectedRoomSubject.next(room);
  }

  clearSelectedRoom(): void {
    this.selectedRoomSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  getSelectedRoom(): Room | null {
    return this.selectedRoomSubject.getValue();
  }

  setBooking(booking: Booking): void {
    this.currentBooking = booking;
  }

  getBooking(): Booking | null {
    return this.currentBooking;
  }

  createBooking(booking: Booking): Booking {
    mockBookings.push(booking);
    this.currentBooking = booking;
    this.persistBookings();
    return booking;
  }

  getBookings(): Booking[] {
    return mockBookings;
  }
}
