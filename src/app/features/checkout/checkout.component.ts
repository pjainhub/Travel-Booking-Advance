import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '../../models/travel';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="checkout-shell" *ngIf="room; else notReady">
      <div class="summary-card">
        <p class="eyebrow">Booking summary</p>
        <h1>{{ room.roomType }}</h1>
        <img [src]="room.imageUrl" [alt]="room.roomType" />
        <div class="row"><span>Price</span><strong>$ {{ room.pricePerNight }}/night</strong></div>
        <div class="row"><span>Guests</span><strong>{{ guestCount }}</strong></div>
        <div class="row"><span>Total</span><strong>$ {{ totalPrice }}</strong></div>
      </div>

      <div class="form-card">
        <p class="eyebrow">Checkout</p>
        <h2>Complete your booking</h2>

        <div class="field">
          <label>Check-in</label>
          <input type="date" [(ngModel)]="checkInDate" />
        </div>

        <div class="field">
          <label>Check-out</label>
          <input type="date" [(ngModel)]="checkOutDate" />
        </div>

        <div class="field">
          <label>Guests</label>
          <input type="number" min="1" max="6" [(ngModel)]="guestCount" (input)="updateTotal()" />
        </div>

        <div class="field">
          <label>Cardholder name</label>
          <input type="text" [(ngModel)]="cardholderName" placeholder="Jane Doe" />
        </div>

        <button type="button" (click)="confirmPayment()">Pay now</button>
      </div>
    </section>

    <ng-template #notReady>
      <section class="empty-state">
        <h2>No room selected</h2>
        <p>Please choose a room before checkout.</p>
      </section>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 36px 24px 80px;
      }

      .checkout-shell {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 28px;
      }

      .summary-card,
      .form-card {
        background: white;
        border-radius: 22px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 26px;
      }

      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 16px;
        margin: 18px 0;
      }

      .eyebrow {
        color: #ff7f50;
        font-size: 0.72rem;
        letter-spacing: 0.12rem;
        text-transform: uppercase;
        font-weight: 700;
      }

      h1, h2 {
        margin: 8px 0 16px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #edf2f7;
        color: #475569;
      }

      .field {
        margin-bottom: 18px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #475569;
      }

      input {
        width: 100%;
        border: 1px solid #dfe7ef;
        border-radius: 12px;
        padding: 0.9rem 1rem;
        font-size: 1rem;
      }

      button {
        width: 100%;
        border: none;
        background: linear-gradient(135deg, #ff9f1c, #ff6b6b);
        border-radius: 999px;
        color: white;
        padding: 1rem 1.2rem;
        font-weight: 700;
        cursor: pointer;
      }

      .empty-state {
        max-width: 500px;
        margin: 60px auto;
        text-align: center;
        background: white;
        border-radius: 20px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 40px 24px;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  room: Room | null = null;
  guestCount = 2;
  totalPrice = 0;
  checkInDate = '2026-12-10';
  checkOutDate = '2026-12-14';
  cardholderName = 'Jane Doe';

  constructor(
    private readonly travelService: TravelService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.room = this.travelService.getRoomById(this.travelService.getSelectedRoom()?.id ?? '') ?? null;
    if (!this.room) {
      this.room = this.travelService.getSelectedRoom();
    }
    this.updateTotal();
  }

  getSelectedRoom(): Room | null {
    return this.travelService.getSelectedRoom();
  }

  updateTotal(): void {
    if (!this.room) {
      return;
    }
    const nights = Math.max(1, new Date(this.checkOutDate).getTime() - new Date(this.checkInDate).getTime());
    const totalNights = Math.ceil(nights / (1000 * 60 * 60 * 24)) || 1;
    this.totalPrice = this.room.pricePerNight * totalNights * Math.max(1, this.guestCount);
  }

  confirmPayment(): void {
    if (!this.room) {
      return;
    }

    const booking: import('../../models/travel').Booking = {
      id: `bk-${Date.now()}`,
      userId: this.travelService.getCurrentUser()?.id ?? 'guest-user',
      roomId: this.room.id,
      hotelId: this.room.hotelId,
      destinationId: this.travelService.getDestinations()[0]?.id ?? 'd1',
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount,
      totalPrice: this.totalPrice,
      status: 'confirmed',
      confirmationNumber: `TRV-${Math.floor(Math.random() * 9000 + 1000)}`,
    };

    this.travelService.createBooking(booking);
    this.router.navigate(['/payment-success'], { queryParams: { confirmation: booking.confirmationNumber } });
  }
}
