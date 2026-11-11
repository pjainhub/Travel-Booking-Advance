import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Destination, Hotel } from '../../models/travel';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell">
      <div class="header">
        <div>
          <p class="eyebrow">Admin panel</p>
          <h1>Manage destinations and hotels</h1>
        </div>
      </div>

      <div class="admin-grid">
        <div class="panel">
          <h2>{{ editingDestinationId ? 'Update destination' : 'Add destination' }}</h2>
          <div class="field">
            <label>Name</label>
            <input type="text" [(ngModel)]="newDestination.name" />
          </div>
          <div class="field">
            <label>Country</label>
            <input type="text" [(ngModel)]="newDestination.country" />
          </div>
          <div class="field">
            <label>Description</label>
            <textarea rows="4" [(ngModel)]="newDestination.description"></textarea>
          </div>
          <div class="button-row">
            <button type="button" (click)="saveDestination()">
              {{ editingDestinationId ? 'Update destination' : 'Save destination' }}
            </button>
            <button type="button" class="secondary" *ngIf="editingDestinationId" (click)="cancelDestinationEdit()">
              Cancel
            </button>
          </div>
        </div>

        <div class="panel">
          <h2>Destination list</h2>
          <div class="destination-item" *ngFor="let destination of destinations">
            <div>
              <strong>{{ destination.name }}</strong>
              <p>{{ destination.country }}</p>
            </div>
            <div class="mini-actions">
              <button type="button" class="soft" (click)="toggleVisibility(destination.id)">
                {{ destination.isVisible ? 'Hide' : 'Show' }}
              </button>
              <button type="button" class="soft" (click)="startDestinationEdit(destination)">Edit</button>
              <button type="button" class="danger" (click)="deleteDestination(destination.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="panel hotel-panel">
        <h2>{{ editingHotelId ? 'Update hotel' : 'Add hotel' }}</h2>
        <div class="hotel-form">
          <div class="field">
            <label>Destination</label>
            <select [(ngModel)]="newHotel.destinationId">
              <option value="">Select destination</option>
              <option *ngFor="let destination of destinations" [value]="destination.id">{{ destination.name }}</option>
            </select>
          </div>
          <div class="field">
            <label>Hotel name</label>
            <input type="text" [(ngModel)]="newHotel.name" />
          </div>
          <div class="field">
            <label>Rating</label>
            <input type="number" min="1" max="5" step="0.1" [(ngModel)]="newHotel.rating" />
          </div>
          <div class="field">
            <label>Description</label>
            <textarea rows="3" [(ngModel)]="newHotel.description"></textarea>
          </div>
          <div class="button-row">
            <button type="button" (click)="saveHotel()">{{ editingHotelId ? 'Update hotel' : 'Save hotel' }}</button>
            <button type="button" class="secondary" *ngIf="editingHotelId" (click)="cancelHotelEdit()">Cancel</button>
          </div>
        </div>

        <div class="hotel-list" *ngFor="let destination of destinations">
          <h3>{{ destination.name }}</h3>
          <div class="hotel-item" *ngFor="let hotel of destination.hotels">
            <div>
              <strong>{{ hotel.name }}</strong>
              <p>{{ hotel.rating }} / 5</p>
            </div>
            <div class="mini-actions">
              <button type="button" class="soft" (click)="toggleHotelVisibility(destination.id, hotel.id)">
                {{ hotel.isVisible ? 'Hide' : 'Show' }}
              </button>
              <button type="button" class="soft" (click)="startHotelEdit(destination.id, hotel)">Edit</button>
              <button type="button" class="danger" (click)="deleteHotel(destination.id, hotel.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 36px 24px 80px;
      }

      .admin-shell {
        max-width: 1100px;
        margin: 0 auto;
      }

      .header {
        margin-bottom: 26px;
      }

      .eyebrow {
        color: #ff7f50;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12rem;
      }

      h1 {
        margin: 10px 0 0;
      }

      .admin-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      .panel {
        background: white;
        border-radius: 22px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 24px;
        margin-bottom: 24px;
      }

      .field {
        margin-bottom: 18px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        color: #475569;
        font-weight: 600;
      }

      input,
      textarea,
      select {
        width: 100%;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 0.9rem 1rem;
        font: inherit;
      }

      .button-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      button {
        border: none;
        padding: 0.9rem 1.2rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #0ea5e9, #2563eb);
        color: white;
        font-weight: 700;
        cursor: pointer;
      }

      .secondary {
        background: #e2e8f0;
        color: #0f172a;
      }

      .soft {
        background: #f0f9ff;
        color: #0f172a;
      }

      .danger {
        background: #fee2e2;
        color: #991b1b;
      }

      .destination-item,
      .hotel-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        padding: 14px 0;
        border-bottom: 1px solid #edf2f7;
      }

      .mini-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .hotel-panel {
        margin-top: 12px;
      }

      .hotel-form {
        margin-bottom: 20px;
      }

      .hotel-list {
        margin-top: 18px;
      }

      h3 {
        margin: 8px 0 12px;
      }

      p {
        color: #475569;
        margin: 6px 0 0;
      }
    `,
  ],
})
export class AdminComponent implements OnInit {
  destinations: Destination[] = [];
  newDestination = {
    name: '',
    country: '',
    description: '',
  };
  newHotel = {
    destinationId: '',
    name: '',
    rating: 4.5,
    description: '',
  };
  editingDestinationId: string | null = null;
  editingHotelId: string | null = null;
  editingHotelDestinationId: string | null = null;

  constructor(private readonly travelService: TravelService) {}

  ngOnInit(): void {
    this.destinations = this.travelService.getDestinations();
  }

  saveDestination(): void {
    if (!this.newDestination.name.trim() || !this.newDestination.country.trim()) {
      return;
    }

    if (this.editingDestinationId) {
      this.destinations = this.destinations.map((destination) =>
        destination.id === this.editingDestinationId
          ? {
              ...destination,
              name: this.newDestination.name,
              country: this.newDestination.country,
              description: this.newDestination.description || destination.description,
            }
          : destination,
      );
      this.cancelDestinationEdit();
      localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
      return;
    }

    const newItem: Destination = {
      id: `d-${Date.now()}`,
      name: this.newDestination.name,
      country: this.newDestination.country,
      description: this.newDestination.description || 'New destination added.',
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      isVisible: true,
      hotels: [],
    };

    this.destinations = [newItem, ...this.destinations];
    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
    this.newDestination = { name: '', country: '', description: '' };
  }

  startDestinationEdit(destination: Destination): void {
    this.editingDestinationId = destination.id;
    this.newDestination = {
      name: destination.name,
      country: destination.country,
      description: destination.description,
    };
  }

  cancelDestinationEdit(): void {
    this.editingDestinationId = null;
    this.newDestination = { name: '', country: '', description: '' };
  }

  deleteDestination(destinationId: string): void {
    this.destinations = this.destinations.filter((destination) => destination.id !== destinationId);
    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
  }

  toggleVisibility(destinationId: string): void {
    this.destinations = this.destinations.map((destination) => {
      if (destination.id === destinationId) {
        return { ...destination, isVisible: !destination.isVisible };
      }
      return destination;
    });
    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
  }

  saveHotel(): void {
    if (!this.newHotel.destinationId || !this.newHotel.name.trim()) {
      return;
    }

    if (this.editingHotelId && this.editingHotelDestinationId) {
      this.destinations = this.destinations.map((destination) => {
        if (destination.id !== this.editingHotelDestinationId) {
          return destination;
        }

        return {
          ...destination,
          hotels: destination.hotels.map((hotel) =>
            hotel.id === this.editingHotelId
              ? {
                  ...hotel,
                  name: this.newHotel.name,
                  rating: Number(this.newHotel.rating) || hotel.rating,
                  description: this.newHotel.description || hotel.description,
                }
              : hotel,
          ),
        };
      });
      this.cancelHotelEdit();
      localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
      return;
    }

    const newHotelItem: Hotel = {
      id: `h-${Date.now()}`,
      destinationId: this.newHotel.destinationId,
      name: this.newHotel.name,
      rating: Number(this.newHotel.rating) || 4.5,
      description: this.newHotel.description || 'New hotel added.',
      amenities: ['Wi-Fi', 'Breakfast', 'Fitness Center'],
      isVisible: true,
      rooms: [],
    };

    this.destinations = this.destinations.map((destination) => {
      if (destination.id === this.newHotel.destinationId) {
        return { ...destination, hotels: [...destination.hotels, newHotelItem] };
      }
      return destination;
    });

    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
    this.newHotel = { destinationId: '', name: '', rating: 4.5, description: '' };
  }

  startHotelEdit(destinationId: string, hotel: Hotel): void {
    this.editingHotelId = hotel.id;
    this.editingHotelDestinationId = destinationId;
    this.newHotel = {
      destinationId,
      name: hotel.name,
      rating: hotel.rating,
      description: hotel.description,
    };
  }

  cancelHotelEdit(): void {
    this.editingHotelId = null;
    this.editingHotelDestinationId = null;
    this.newHotel = { destinationId: '', name: '', rating: 4.5, description: '' };
  }

  deleteHotel(destinationId: string, hotelId: string): void {
    this.destinations = this.destinations.map((destination) => {
      if (destination.id !== destinationId) {
        return destination;
      }
      return {
        ...destination,
        hotels: destination.hotels.filter((hotel) => hotel.id !== hotelId),
      };
    });
    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
  }

  toggleHotelVisibility(destinationId: string, hotelId: string): void {
    this.destinations = this.destinations.map((destination) => {
      if (destination.id !== destinationId) {
        return destination;
      }

      return {
        ...destination,
        hotels: destination.hotels.map((hotel) =>
          hotel.id === hotelId ? { ...hotel, isVisible: !hotel.isVisible } : hotel,
        ),
      };
    });
    localStorage.setItem('travel-destinations', JSON.stringify(this.destinations));
  }
}
