import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destination } from '../../models/travel';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-shell">
      <div class="page-header">
        <p class="eyebrow">Browse all</p>
        <h1>Destinations</h1>
      </div>

      <div class="grid">
        <article class="destination-card" *ngFor="let destination of destinations" (click)="selectDestination(destination.id)">
          <img [src]="destination.imageUrl" [alt]="destination.name" />
          <div class="card-body">
            <span>{{ destination.country }}</span>
            <h2>{{ destination.name }}</h2>
            <p>{{ destination.description }}</p>
            <button type="button">Explore stays</button>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 40px 24px 80px;
      }

      .page-shell {
        max-width: 1200px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 28px;
      }

      .eyebrow {
        color: #ff7f50;
        text-transform: uppercase;
        letter-spacing: 0.14rem;
        font-weight: 700;
        font-size: 0.72rem;
      }

      h1 {
        margin: 8px 0 0;
        font-size: clamp(2rem, 3vw, 3rem);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: 24px;
      }

      .destination-card {
        border-radius: 22px;
        background: white;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 240px;
        object-fit: cover;
      }

      .card-body {
        padding: 20px;
      }

      span {
        display: inline-block;
        background: #eef6ff;
        color: #0f4c81;
        font-size: 0.72rem;
        padding: 6px 10px;
        border-radius: 999px;
        font-weight: 700;
      }

      h2 {
        margin: 16px 0 10px;
      }

      p {
        color: #475569;
        line-height: 1.65;
        margin-bottom: 20px;
      }

      button {
        background: linear-gradient(135deg, #0ea5e9, #2563eb);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 0.9rem 1.4rem;
        font-weight: 700;
        cursor: pointer;
      }
    `,
  ],
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];

  constructor(
    private readonly travelService: TravelService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.destinations = this.travelService.getDestinations();
  }

  selectDestination(destinationId: string): void {
    this.router.navigate(['/rooms', destinationId]);
  }
}
