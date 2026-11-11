import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TravelWorkerService {
  private worker?: Worker;

  filterRoomsInBackground(data: { rooms: unknown[]; keyword: string }): Observable<{ filtered: unknown[] }> {
    return new Observable((observer) => {
      this.worker = new Worker(new URL('../workers/travel-worker.worker', import.meta.url), {
        type: 'module',
      });

      this.worker.onmessage = ({ data }) => {
        observer.next(data);
        observer.complete();
      };

      this.worker.onerror = (error) => observer.error(error);
      this.worker.postMessage(data);
    });
  }
}
