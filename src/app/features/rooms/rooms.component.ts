import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Room } from '../../models/travel';
import { TravelService } from '../../services/travel.service';
import { TravelWorkerService } from '../../services/travel-worker.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="page-shell">
      <div class="page-header">
        <div>
          <p class="eyebrow">Available rooms</p>
          <h1>{{ destinationName }}</h1>
        </div>
      </div>

      <div class="filter-panel">
        <div class="filter-header">
          <h2>Search rooms</h2>
          <button type="button" class="clear-btn" (click)="clearFilters()">Clear filters</button>
        </div>

        <div class="field">
          <label>Search</label>
          <input type="text" placeholder="Search rooms or amenities" [(ngModel)]="searchText" (input)="filterRooms()" />
        </div>

        <div class="field">
          <label>Check-in</label>
          <input type="date" [(ngModel)]="checkInDate" (input)="filterRooms()" />
        </div>

        <div class="field">
          <label>Check-out</label>
          <input type="date" [(ngModel)]="checkOutDate" (input)="filterRooms()" />
        </div>

        <div class="field">
          <label>Guests</label>
          <input type="number" min="1" max="8" [(ngModel)]="guestCount" (input)="filterRooms()" />
        </div>

        <div class="field">
          <label>Max price</label>
          <input type="number" min="50" step="10" [(ngModel)]="maxPrice" (input)="filterRooms()" />
        </div>

        <div class="field">
          <label>Sort</label>
          <select [(ngModel)]="sortBy" (change)="filterRooms()">
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="capacity">Capacity</option>
          </select>
        </div>
      </div>

      <div class="results-meta" *ngIf="rooms.length">
        <span>{{ rooms.length }} room(s) found</span>
      </div>

      <div class="save-row" *ngIf="searchText.trim() || checkInDate || checkOutDate || guestCount > 0">
        <button type="button" class="save-btn" (click)="saveSearch()">Save search</button>
      </div>

      <div class="saved-searches" *ngIf="savedSearches.length">
        <p class="saved-title">Saved searches</p>
        <div class="saved-items">
          <button type="button" *ngFor="let item of savedSearches" (click)="applySavedSearch(item)">{{ item }}</button>
        </div>
      </div>

      <div class="results" *ngIf="rooms.length; else emptyState">
        <article class="room-card" *ngFor="let room of rooms">
          <img [src]="room.imageUrl" [alt]="room.roomType" />
          <div class="card-body">
            <div class="top-row">
              <h2>{{ room.roomType }}</h2>
              <span class="price">$ {{ room.pricePerNight }}/night</span>
            </div>

            <p class="meta">Sleeps {{ room.capacity }} guests</p>
            <p>{{ room.description }}</p>

            <ul>
              <li *ngFor="let item of room.amenities">{{ item }}</li>
            </ul>

            <div class="actions">
              <button type="button" [routerLink]="['/room', room.id]">View details</button>
            </div>
          </div>
        </article>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">
          <h3>No rooms available</h3>
          <p>Try another destination, date range, or adjust your filters.</p>
        </div>
      </ng-template>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 36px 24px 80px;
      }

      .page-shell {
        max-width: 1200px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 18px;
      }

      .eyebrow {
        font-size: 0.72rem;
        color: #ff7f50;
        text-transform: uppercase;
        letter-spacing: 0.14rem;
        font-weight: 700;
      }

      h1 {
        margin: 8px 0 0;
        font-size: clamp(2rem, 2.8vw, 3rem);
      }

      .filter-panel {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 18px;
        margin-bottom: 20px;
      }

      .filter-header {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-bottom: 6px;
      }

      .filter-header h2 {
        margin: 0;
        font-size: 1.15rem;
      }

      .clear-btn {
        background: #e2e8f0;
        color: #0f172a;
        border: none;
        border-radius: 999px;
        padding: 0.65rem 1rem;
        font-weight: 700;
        cursor: pointer;
      }

      .results-meta {
        margin-bottom: 14px;
        color: #475569;
        font-weight: 600;
      }

      .field {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        min-width: 0;
      }

      label {
        display: block;
        color: #475569;
        font-weight: 600;
        line-height: 1.3;
      }

      input,
      select {
        width: 100%;
        box-sizing: border-box;
        border-radius: 12px;
        border: 1px solid #dbe2ea;
        padding: 0.8rem 0.9rem;
        font-size: 1rem;
        min-height: 48px;
      }

      .save-row {
        margin-bottom: 18px;
      }

      .save-btn {
        background: #0f172a;
        color: white;
        border: none;
        border-radius: 999px;
        padding: 0.75rem 1.2rem;
        font-weight: 700;
        cursor: pointer;
      }

      .saved-searches {
        margin: 0 0 22px;
      }

      .saved-title {
        color: #475569;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .saved-items {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .saved-items button {
        background: #eef6ff;
        color: #0b5ed7;
        border: none;
        border-radius: 999px;
        padding: 0.7rem 1rem;
        font-weight: 700;
        cursor: pointer;
      }

      .results {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
      }

      .room-card {
        background: white;
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
      }

      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
      }

      .card-body {
        padding: 20px;
      }

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      h2 {
        margin: 0;
      }

      .price {
        color: #0ea5e9;
        font-weight: 700;
      }

      .meta {
        color: #475569;
        margin: 8px 0;
      }

      p {
        color: #475569;
        line-height: 1.6;
      }

      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 18px 0;
      }

      li {
        background: #f8fafc;
        color: #334155;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 0.76rem;
      }

      button {
        background: linear-gradient(135deg, #ff9f1c, #ff6b6b);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 0.9rem 1.3rem;
        font-weight: 700;
        cursor: pointer;
      }

      .empty-state {
        background: white;
        border-radius: 22px;
        padding: 36px 24px;
        text-align: center;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
      }
    `,
  ],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  destinationName = 'Destination';
  searchText = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 2;
  maxPrice = 500;
  sortBy = 'recommended';
  savedSearches: string[] = [];
  private destinationId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly travelService: TravelService,
    private readonly workerService: TravelWorkerService,
  ) {}

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('destinationId') ?? '';
    const destination = this.travelService.getDestinationById(this.destinationId);
    this.destinationName = destination?.name ?? 'Destination';
    this.rooms = this.travelService.getRoomsByDestination(this.destinationId);
    this.savedSearches = this.loadSavedSearches();
    this.filterRooms();
  }

  filterRooms(): void {
    const baseRooms = this.travelService.getRoomsByDestination(this.destinationId);
    const keyword = this.searchText.trim().toLowerCase();
    const guestFilter = Math.max(1, Number(this.guestCount) || 1);
    const maxPriceFilter = Math.max(50, Number(this.maxPrice) || Number.MAX_SAFE_INTEGER);
    const validCheckIn = this.checkInDate && !Number.isNaN(new Date(this.checkInDate).getTime()) ? this.checkInDate : '';
    const validCheckOut = this.checkOutDate && !Number.isNaN(new Date(this.checkOutDate).getTime()) ? this.checkOutDate : '';

    const filtered = baseRooms.filter((room) => {
      const matchesKeyword = !keyword || `${room.roomType} ${room.description} ${room.amenities.join(' ')}`.toLowerCase().includes(keyword);
      const matchesCapacity = room.capacity >= guestFilter;
      const matchesPrice = room.pricePerNight <= maxPriceFilter;
      const matchesDates = !validCheckIn || !validCheckOut || validCheckOut >= validCheckIn;

      return matchesKeyword && matchesCapacity && matchesPrice && matchesDates;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return (a.pricePerNight + a.capacity * 10) - (b.pricePerNight + b.capacity * 10);
      }
    });

    this.workerService.filterRoomsInBackground({ rooms: sorted, keyword }).subscribe({
      next: ({ filtered: workerFiltered }) => {
        this.rooms = workerFiltered as Room[];
      },
      error: () => {
        this.rooms = sorted;
      },
    });
  }

  saveSearch(): void {
    const searchSummary = [
      this.searchText.trim(),
      this.checkInDate ? `Check-in ${this.checkInDate}` : '',
      this.checkOutDate ? `Check-out ${this.checkOutDate}` : '',
      this.guestCount > 0 ? `Guests ${this.guestCount}` : '',
    ]
      .filter(Boolean)
      .join(' • ');

    if (!searchSummary) {
      return;
    }

    const existing = this.loadSavedSearches();
    const next = [searchSummary, ...existing.filter((item) => item !== searchSummary)].slice(0, 5);
    localStorage.setItem('travel-saved-searches', JSON.stringify(next));
    this.savedSearches = next;
  }

  applySavedSearch(value: string): void {
    const parts = value.split(' • ');
    this.searchText = parts[0] ?? '';
    const checkInPart = parts.find((part) => part.startsWith('Check-in '));
    const checkOutPart = parts.find((part) => part.startsWith('Check-out '));
    const guestPart = parts.find((part) => part.startsWith('Guests '));
    this.checkInDate = checkInPart?.replace('Check-in ', '') ?? '';
    this.checkOutDate = checkOutPart?.replace('Check-out ', '') ?? '';
    this.guestCount = Number(guestPart?.replace('Guests ', '')) || 2;
    this.filterRooms();
  }

  clearFilters(): void {
    this.searchText = '';
    this.checkInDate = '';
    this.checkOutDate = '';
    this.guestCount = 2;
    this.maxPrice = 500;
    this.sortBy = 'recommended';
    this.filterRooms();
  }

  private loadSavedSearches(): string[] {
    try {
      const raw = localStorage.getItem('travel-saved-searches');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
