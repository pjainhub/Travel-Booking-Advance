import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './models/travel';
import { TravelService } from './services/travel.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  currentUser: User | null = null;

  constructor(
    private readonly travelService: TravelService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.travelService.getCurrentUser();
    this.travelService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  openAdmin(): void {
    if (this.currentUser?.role === 'admin') {
      this.router.navigate(['/admin']);
      return;
    }

    this.router.navigate(['/']);
  }
}
