import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TravelService } from '../../services/travel.service';
import { Destination, User } from '../../models/travel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <p class="eyebrow">Plan your next escape</p>
        <h1>Find the perfect destination for your stay</h1>
        <p class="subtext">
          Explore handpicked stays across the world and reserve your next memorable trip with ease.
        </p>
        <div class="hero-actions">
          <a routerLink="/destinations" class="primary-btn">Explore destinations</a>
          <button type="button" class="secondary-btn" (click)="openAdminPanel()">Admin panel</button>
        </div>

        <div class="auth-box" *ngIf="!currentUser; else loggedInLayout">
          <p>Continue with</p>
          <div class="provider-buttons">
            <button type="button" class="google-btn" (click)="loginWith('Google')">Google</button>
            <button type="button" class="facebook-btn" (click)="loginWith('Facebook')">Facebook</button>
          </div>
        </div>

        <ng-template #loggedInLayout>
          <div class="auth-box authenticated">
            <p>Signed in as <strong>{{ currentUser?.name }}</strong></p>
            <div class="provider-buttons">
              <button type="button" class="secondary-btn light" (click)="logout()">Logout</button>
            </div>
          </div>
        </ng-template>
      </div>
    </section>

    <section class="destinations">
      <div class="section-heading">
        <div>
          <p class="label">Popular destinations</p>
          <h2>Trending places to stay</h2>
        </div>
      </div>

      <div class="card-grid">
        <article class="destination-card" *ngFor="let destination of destinations" (click)="openDestination(destination.id)">
          <img [src]="destination.imageUrl" [alt]="destination.name" />
          <div class="card-body">
            <div class="meta">
              <span>{{ destination.country }}</span>
            </div>
            <h3>{{ destination.name }}</h3>
            <p>{{ destination.description }}</p>
            <button type="button">View rooms</button>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        color: #14213d;
      }

      .hero {
        position: relative;
        min-height: 440px;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, rgba(8, 36, 68, 0.9), rgba(0, 123, 255, 0.6)),
          url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80') center/cover;
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.2);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        max-width: 700px;
        padding: 48px 24px;
        margin-left: 10%;
        color: white;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.22rem;
        font-size: 0.8rem;
        margin-bottom: 12px;
      }

      h1 {
        font-size: clamp(2.4rem, 4vw, 4rem);
        line-height: 1.1;
        margin: 0 0 14px;
      }

      .subtext {
        max-width: 560px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.05rem;
      }

      .hero-actions,
      .provider-buttons {
        display: flex;
        gap: 16px;
        margin-top: 32px;
        flex-wrap: wrap;
      }

      .primary-btn,
      .secondary-btn,
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.95rem 1.4rem;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .primary-btn,
      button {
        background: linear-gradient(135deg, #ff9f1c, #ff6b6b);
        color: white;
        box-shadow: 0 12px 30px rgba(255, 111, 97, 0.25);
      }

      .secondary-btn {
        background: rgba(255, 255, 255, 0.12);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.35);
      }

      .light {
        background: white;
        color: #0f172a;
        border: none;
      }

      .google-btn {
        background: #db4437;
      }

      .facebook-btn {
        background: #1877f2;
      }

      .primary-btn:hover,
      .secondary-btn:hover,
      button:hover {
        transform: translateY(-1px);
      }

      .auth-box {
        margin-top: 24px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 18px;
        padding: 18px 20px;
        max-width: 420px;
      }

      .auth-box p {
        color: white;
        margin: 0;
      }

      .authenticated {
        background: rgba(255, 255, 255, 0.08);
      }

      .destinations {
        max-width: 1200px;
        margin: 48px auto;
        padding: 0 24px 80px;
      }

      .section-heading {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 24px;
      }

      .label {
        text-transform: uppercase;
        letter-spacing: 0.12rem;
        font-size: 0.75rem;
        color: #ff7f50;
        font-weight: 700;
      }

      h2 {
        margin: 8px 0 0;
        font-size: clamp(1.8rem, 2vw, 2.5rem);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 24px;
      }

      .destination-card {
        background: #fff;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      }

      .destination-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 40px rgba(15, 23, 42, 0.1);
      }

      img {
        display: block;
        width: 100%;
        height: 230px;
        object-fit: cover;
      }

      .card-body {
        padding: 20px;
      }

      .meta {
        display: inline-flex;
        background: #e6f4ff;
        color: #0b5ed7;
        border-radius: 999px;
        padding: 6px 12px;
        font-size: 0.75rem;
        font-weight: 700;
      }

      h3 {
        margin: 14px 0 8px;
        font-size: 1.5rem;
      }

      p {
        margin: 0 0 16px;
        color: #4b5563;
        line-height: 1.6;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  destinations: Destination[] = [];
  currentUser: User | null = null;

  constructor(
    private readonly travelService: TravelService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.destinations = this.travelService.getDestinations();
    this.currentUser = this.travelService.getCurrentUser();

    this.travelService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  openDestination(destinationId: string): void {
    this.router.navigate(['/rooms', destinationId]);
  }

  openAdminPanel(): void {
    if (this.currentUser?.role === 'admin') {
      this.router.navigate(['/admin']);
      return;
    }

    this.router.navigate(['/']);
  }

  loginWith(provider: string): void {
    if (provider === 'Google') {
      void this.travelService.loginWithGoogle()
        .then((user) => {
          this.currentUser = user ?? this.travelService.getCurrentUser();
        })
        .catch((error: Error) => {
          window.alert(error.message);
        });
      return;
    }

    if (provider === 'Facebook') {
      void this.travelService.loginWithFacebook()
        .then((user) => {
          this.currentUser = user ?? this.travelService.getCurrentUser();
        })
        .catch((error: Error) => {
          window.alert(error.message);
        });
      return;
    }

    window.alert('Real social login is required. Please configure Firebase for this provider.');
  }

  logout(): void {
    void this.travelService.logoutFromAuth().then(() => {
      this.travelService.logout();
      this.currentUser = null;
    });
  }
}
