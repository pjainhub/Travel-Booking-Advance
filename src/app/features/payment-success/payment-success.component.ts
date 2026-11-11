import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="success-shell">
      <div class="success-card">
        <div class="icon">✓</div>
        <p class="eyebrow">Payment successful</p>
        <h1>Booking confirmed</h1>

        <div class="details">
          <div class="row"><span>Confirmation number</span><strong>{{ confirmationNumber }}</strong></div>
          <div class="row"><span>Status</span><strong>Confirmed</strong></div>
          <div class="row"><span>Guest</span><strong>{{ currentUserName }}</strong></div>
        </div>

        <a routerLink="/" class="primary-link">Back to home</a>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 40px 24px 80px;
      }

      .success-shell {
        max-width: 620px;
        margin: 0 auto;
      }

      .success-card {
        background: white;
        border-radius: 24px;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        padding: 36px 28px;
        text-align: center;
      }

      .icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #34d399, #10b981);
        color: white;
        font-size: 2rem;
        font-weight: 700;
      }

      .eyebrow {
        text-transform: uppercase;
        color: #10b981;
        letter-spacing: 0.14rem;
        font-weight: 700;
        font-size: 0.7rem;
      }

      h1 {
        margin: 12px 0 22px;
        font-size: clamp(2rem, 2.5vw, 2.7rem);
      }

      .details {
        margin: 18px 0 30px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #edf2f7;
        color: #475569;
      }

      .primary-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0ea5e9, #2563eb);
        color: white;
        text-decoration: none;
        border-radius: 999px;
        padding: 0.95rem 1.5rem;
        font-weight: 700;
      }
    `,
  ],
})
export class PaymentSuccessComponent {
  confirmationNumber = 'TRV-0000';
  currentUserName = 'Traveler';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly travelService: TravelService,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.confirmationNumber = params.get('confirmation') ?? this.confirmationNumber;
    });

    const user = this.travelService.getCurrentUser();
    this.currentUserName = user?.name ?? 'Traveler';
  }
}
