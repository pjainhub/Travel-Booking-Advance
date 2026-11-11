import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../../models/travel';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="detail-shell" *ngIf="room; else notFound">
      <div class="hero-image">
        <img [src]="room.imageUrl" [alt]="room.roomType" />
      </div>

      <div class="content">
        <p class="eyebrow">Room details</p>
        <h1>{{ room.roomType }}</h1>
        <div class="badge-row">
          <span>{{ room.capacity }} guests</span>
          <span>{{ room.availability ? 'Available now' : 'Booked' }}</span>
        </div>
        <p class="description">{{ room.description }}</p>

        <div class="pricing">
          <span class="label">From</span>
          <strong>$ {{ room.pricePerNight }}</strong>
          <span class="label">/ night</span>
        </div>

        <ul class="amenities">
          <li *ngFor="let amenity of room.amenities">{{ amenity }}</li>
        </ul>

        <div class="actions">
          <button type="button" (click)="proceedToCheckout()">Book now</button>
          <a routerLink="/" class="secondary-link">Back to home</a>
        </div>
      </div>
    </section>

    <ng-template #notFound>
      <section class="empty-state">
        <h2>Room not found</h2>
        <a routerLink="/">Return to home</a>
      </section>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 36px 24px 80px;
      }

      .detail-shell {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 32px;
        align-items: center;
      }

      .hero-image img {
        width: 100%;
        height: 540px;
        object-fit: cover;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
      }

      .content {
        background: white;
        border-radius: 24px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 28px;
      }

      .eyebrow {
        color: #ff7f50;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.12rem;
        font-weight: 700;
      }

      h1 {
        margin: 10px 0 12px;
        font-size: clamp(2rem, 2.6vw, 3rem);
      }

      .badge-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .badge-row span {
        background: #eef6ff;
        color: #0b5ed7;
        border-radius: 999px;
        padding: 6px 12px;
        font-size: 0.78rem;
        font-weight: 700;
      }

      .description {
        margin: 18px 0 22px;
        color: #475569;
        line-height: 1.7;
      }

      .pricing {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 18px;
      }

      .pricing strong {
        font-size: 2rem;
      }

      .label {
        color: #64748b;
      }

      .amenities {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0 28px;
      }

      .amenities li {
        background: #f8fafc;
        border-radius: 999px;
        padding: 8px 12px;
        color: #334155;
        font-size: 0.8rem;
      }

      .actions {
        display: flex;
        gap: 14px;
        align-items: center;
        flex-wrap: wrap;
      }

      button {
        border: none;
        background: linear-gradient(135deg, #ff9f1c, #ff6b6b);
        color: white;
        border-radius: 999px;
        padding: 0.95rem 1.5rem;
        font-weight: 700;
        cursor: pointer;
      }

      .secondary-link {
        text-decoration: none;
        color: #0f172a;
        font-weight: 600;
      }

      .empty-state {
        max-width: 500px;
        margin: 50px auto;
        background: white;
        border-radius: 20px;
        padding: 40px 24px;
        text-align: center;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
      }
    `,
  ],
})
export class RoomDetailComponent implements OnInit {
  room: Room | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly travelService: TravelService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId') ?? '';
    this.room = this.travelService.getRoomById(roomId) ?? null;
  }

  proceedToCheckout(): void {
    if (!this.room) {
      return;
    }

    this.travelService.setSelectedRoom(this.room);
    this.router.navigate(['/checkout']);
  }
}
