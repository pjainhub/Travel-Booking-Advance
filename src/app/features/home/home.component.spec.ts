import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { TravelService } from '../../services/travel.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let travelService: jasmine.SpyObj<TravelService>;

  beforeEach(async () => {
    travelService = jasmine.createSpyObj<TravelService>('TravelService', ['getDestinations', 'getCurrentUser', 'loginWithGoogle', 'loginWithFacebook', 'logoutFromAuth', 'logout'], {
      currentUser$: of(null),
    });

    travelService.getDestinations.and.returnValue([
      {
        id: 'd1',
        name: 'Paris',
        country: 'France',
        description: 'City of light',
        imageUrl: 'https://example.com/paris.jpg',
        isVisible: true,
        hotels: [],
      },
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: TravelService, useValue: travelService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load visible destinations on init', () => {
    expect(component.destinations.length).toBe(1);
    expect(component.destinations[0].name).toBe('Paris');
  });

  it('should open destination route when requested', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.openDestination('d1');
    expect(navigateSpy).toHaveBeenCalledWith(['/rooms', 'd1']);
  });
});
