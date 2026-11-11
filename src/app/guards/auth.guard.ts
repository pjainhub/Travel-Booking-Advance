import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TravelService } from '../services/travel.service';

export const authGuard: CanActivateFn = () => {
  const travelService = inject(TravelService);
  const router = inject(Router);

  if (travelService.getCurrentUser()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
