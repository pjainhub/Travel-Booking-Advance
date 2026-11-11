import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TravelService } from '../services/travel.service';

export const adminGuard: CanActivateFn = () => {
  const travelService = inject(TravelService);
  const router = inject(Router);

  const user = travelService.getCurrentUser();

  if (user && user.role === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
