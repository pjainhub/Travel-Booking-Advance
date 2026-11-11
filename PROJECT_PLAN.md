# Travel Booking Application - Project Plan

## 1. Project Overview
This project is an Angular-based travel booking web application that allows users to browse destinations, search for available rooms, view room details, complete checkout, and simulate payment for reservations. The application will support two roles:

- Admin: manages destinations, hotels, and room visibility
- Normal User: searches destinations, views rooms, books reservations, and completes payment

The solution should be modern, responsive, and structured with Angular best practices. It should also include social authentication, unit tests, SCSS styling, a web worker, and deployment to a free public hosting platform.

## 2. Business Objective
The application will provide a simple and user-friendly hotel booking experience where travelers can browse destinations and reserve rooms quickly. For administrators, it will provide a straightforward way to manage destinations and hotel inventory without needing a complex backend during the assignment phase.

## 3. Scope
### In Scope
- Social login using Auth0 or Firebase
- Destination listing on the home page
- Search and filter rooms by destination, date, and guest count
- Room details page with amenities, photos, and pricing
- Reservation checkout flow
- Dummy payment simulation with confirmation page
- Role-based access for admin and user
- Admin management for destinations and hotel details
- Unit tests for at least one main component and one service
- Web worker implementation for background processing
- SCSS-based styling
- Deployment to a free frontend hosting service
- README with repository link, deployment link, and credentials

### Out of Scope
- Real payment gateway integration such as Stripe or Razorpay
- Real-time backend synchronization or multi-user live data updates
- Full production-grade hotel management system
- Advanced reporting or analytics dashboard
- Multi-language support

## 4. User Roles and Responsibilities

### 4.1 Admin User
Admin users can:
- Add, update, and delete destinations
- Add, update, and delete hotel details for each destination
- Manage room visibility and hotel visibility on the home page
- Maintain destination and accommodation-related data

### 4.2 Normal User
Normal users can:
- View available destinations
- Search rooms by destination and travel preferences
- View room details and amenities
- Proceed to booking checkout
- Complete a dummy payment process
- View booking confirmation details

## 5. Functional Requirements

### 5.1 Authentication
- Users can sign in using Google/Facebook or a supported free provider such as Auth0 or Firebase
- Authentication status should persist across app navigation within the session
- Auth guard should restrict admin-only routes
- User role should drive the UI and route access

### 5.2 Home Page
- Display a list of destinations in cards or grid layout
- Show destination image, title, and summary
- Allow users to click a destination to browse associated rooms
- Show only visible destinations for normal users

### 5.3 Search and Room Listing
- Provide a search form for destination, check-in date, check-out date, and number of guests
- Filter rooms based on selected destination and booking criteria
- Show room results as cards with price, room type, images, rating, and availability
- Allow sorting or filtering of available rooms

### 5.4 Room Details
- Display selected room information including:
  - room name and description
  - amenities
  - photo gallery
  - price per night
  - room capacity
  - availability
- Provide action to proceed to booking checkout

### 5.5 Reservation Checkout
- Show a checkout summary with selected destination, hotel, room, booking dates, and guest count
- Display total price before payment
- Support a dummy payment form or mock payment action
- Validate mandatory booking data before proceeding

### 5.6 Payment Success Page
- Display a confirmation page after payment simulation
- Show booking details and confirmation number
- Allow navigation back to home or booking history

### 5.7 Admin Functionalities
- Add, edit, and delete destinations
- Add, edit, and delete hotel details under destinations
- Manage visibility flags for destination and hotel listing
- Maintain consistent room/hotel data for public display

### 5.8 Bonus Feature: Save Search
- Allow users to save search criteria
- Provide saved searches in a list or panel
- Allow one-click rerun of prior searches

## 6. User Journey
### User Flow
1. User lands on the home page
2. User signs in using social authentication
3. User selects a destination
4. User searches rooms using filters
5. User selects a room and opens room details
6. User proceeds to checkout
7. User completes dummy payment
8. User sees booking confirmation page

### Admin Flow
1. Admin logs in
2. Admin accesses admin dashboard or management screens
3. Admin creates or edits destination records
4. Admin adds hotel/room details and updates visibility
5. Admin saves changes and confirms they appear to users

## 7. Angular-Specific Technical Requirements
- Angular app built using the latest Angular CLI version
- Use Angular routing for navigation between home, room list, room details, checkout, payment success, and admin screens
- Use Angular components, directives, services, and pipes as appropriate
- Use RxJS for async operations and state handling
- Use SCSS for styling and component-level styling
- Prefer feature-based Angular modules or a modular structure for maintainability
- Use Angular forms for booking and admin CRUD forms
- Use Angular guards for authentication and role protection
- Use Angular HTTP client (or mock service layer) to retrieve data
- Use local storage or a service-based mock backend for persistence when backend is not implemented

## 8. Recommended Angular Architecture

### Feature Modules / Areas
- Auth Module
- Home Module
- Destination Module
- Rooms Module
- Checkout Module
- Payment Module
- Admin Module
- Shared Module

### Core Angular Components
- Header / Navbar
- Hero / Banner section
- Destination card list
- Search filters panel
- Room cards list
- Room detail view
- Checkout summary component
- Payment form component
- Confirmation component
- Admin destination form
- Admin hotel form

### Angular Services
- AuthService
- DestinationService
- HotelService
- RoomService
- BookingService
- SearchService
- PaymentService
- StorageService / LocalDataService

### Angular Guards / Interceptors
- AuthGuard
- AdminGuard
- AuthInterceptor (if using token-based auth in future)

### Suggested Data Model
- User
  - id: string
  - name: string
  - email: string
  - provider: string
  - role: 'admin' | 'user'

- Destination
  - id: string
  - name: string
  - country: string
  - description: string
  - imageUrl: string
  - isVisible: boolean

- Hotel
  - id: string
  - destinationId: string
  - name: string
  - rating: number
  - description: string
  - amenities: string[]
  - isVisible: boolean

- Room
  - id: string
  - hotelId: string
  - roomType: string
  - pricePerNight: number
  - capacity: number
  - images: string[]
  - availability: boolean

- Booking
  - id: string
  - userId: string
  - roomId: string
  - hotelId: string
  - destinationId: string
  - checkInDate: string
  - checkOutDate: string
  - guestCount: number
  - totalPrice: number
  - status: string
  - confirmationNumber: string

## 9. Suggested Angular Folder Structure
```text
src/
  app/
    core/
      auth/
      guards/
      services/
      interceptors/
    features/
      home/
      destinations/
      rooms/
      checkout/
      payment/
      admin/
    shared/
      components/
      models/
      pipes/
      directives/
      utils/
    app-routing.module.ts
    app.component.ts
    app.module.ts
  assets/
  environments/
  styles/
```

## 10. State Management Strategy
For this assignment, Angular state can be managed in one of the following ways:
- Simple local service pattern for small-scale app state
- NgRx store for more advanced state management and scalability

Recommended approach:
- Use services + BehaviorSubject for route-based or feature-level state
- Use NgRx only if state becomes complex enough to justify it

This keeps the project manageable while still demonstrating Angular architecture knowledge.

## 11. Non-Functional Requirements
- Performance: fast rendering and responsive search operations
- Usability: clean navigation and intuitive booking flow
- Responsiveness: support desktop, tablet, and mobile views
- Maintainability: modular Angular components and clean service boundaries
- Security: admin-only routes and validation for private operations
- Scalability: design for future addition of backend APIs and more features

## 12. Testing Strategy
The project must include unit tests for at least:
- one main component
- one service

Recommended test areas:
- Home page destination rendering
- Search filter logic in a service
- Booking total calculation logic
- Payment confirmation rendering
- Admin CRUD form validation

Angular testing tools:
- Jasmine
- Karma
- Angular TestBed for component and service testing

## 13. Web Worker Requirement
A web worker should be added for tasks such as:
- heavy filtering or transformation of room results
- background preparation of search results
- parsing or processing large local data before rendering

This demonstrates Angular performance optimization and helps keep the UI responsive.

## 14. CSS and UI Strategy
- Use SCSS for all styling
- Use reusable variables, mixins, and layout patterns
- Create a visually polished travel booking experience with cards, gradients, pricing badges, and responsive grids
- Add modern UX details such as hover states, filters, and polished booking summaries

## 15. Deployment and Delivery Requirements
### Deliverables
- Functional Angular web application
- GitHub repository link without node_modules
- Deployed frontend application URL
- README file containing:
  - app deployment URL
  - repository URL
  - login credentials
  - note about bonus feature if implemented

### Recommended Hosting Platforms
- Firebase Hosting
- Netlify
- Vercel
- GitHub Pages (if deployment is compatible)

## 16. Implementation Roadmap

### Phase 1: Angular Project Setup
- Create Angular project with latest CLI
- Configure routing, SCSS, and bootstrap/basic structure
- Set up folder structure and shared models

### Phase 2: Authentication and Navigation
- Integrate Auth0 or Firebase social login
- Implement auth service and route guards
- Build main layout and navigation

### Phase 3: Destination and Search Features
- Create destination list screen
- Implement room search filters and result cards
- Add room listing logic and sorting

### Phase 4: Booking and Payment Flow
- Build room detail component
- Create checkout page and summary UI
- Simulate payment flow and confirmation page

### Phase 5: Admin Features
- Build admin dashboard for destinations
- Add hotel management and visibility controls
- Maintain CRUD operations for hotel-related modules

### Phase 6: Performance and Testing
- Add web worker for background processing
- Write unit tests for key component/service
- Optimize UI responsiveness and error states

### Phase 7: Deployment and Documentation
- Create production build
- Deploy app to free hosting provider
- Prepare README and provide credentials
- Final verification of all flows

## 17. Risks and Mitigation
### Risk: Social auth configuration complexity
Mitigation: Use Firebase or Auth0 with clear documentation and a simple mock role mapping setup.

### Risk: Admin CRUD complexity
Mitigation: Implement a minimal but complete CRUD flow before polishing the UI.

### Risk: Search logic drift
Mitigation: Centralize search filters in a dedicated service to keep logic predictable and testable.

### Risk: Deployment time issues
Mitigation: Begin deployment setup early and test build before final submission.

## 18. Acceptance Criteria
The application is complete when:
- Users can log in with social authentication
- Destination listing is displayed and selectable
- Room results match the search filters
- Room detail page shows relevant information
- Booking checkout works with valid user input
- Dummy payment flow completes successfully
- Confirmation page displays correct booking information
- Admin can create and update destinations and hotel details
- Unit tests exist for at least one component and one service
- Web worker is implemented
- App is deployed and documented in README

## 19. Angular-Specific Best Practices
- Keep components small and focused
- Prefer standalone or modular design depending on Angular version
- Use typed models for data integrity
- Avoid business logic inside components when a service is more appropriate
- Use Observables and async pipes where applicable
- Include basic error handling/loading states throughout the app
- Ensure all forms are validated before submission

## 20. Final Recommendation
This assignment should be implemented as an Angular application with clear feature separation, reusable services, and a smooth booking workflow. Prioritize the core user journey first: authentication, destination browsing, room search, room details, checkout, payment success, and admin management. Once the core flow works, add the web worker, testing, deployment, and UI refinements needed for a polished final submission.

## Current Implementation Status
The project has been implemented as a working Angular travel booking app covering the core assignment flow.

Completed:
- Angular app scaffold and routing
- Home page with destination cards
- Destination browsing and room listing
- Search, filters, saved searches, and sorting
- Room detail page with booking action
- Checkout and payment confirmation flow
- Admin dashboard for destination and hotel management
- Auth guards for protected routes
- Firebase-ready social auth with fallback demo login
- Web worker-based filtering
- SCSS styling
- Unit test coverage for core service logic
- README setup and submission notes

Still external / configuration-based:
- Real Firebase project credentials and provider setup for live Google/Facebook login
- Live deployment URL and public GitHub link
- Final host deployment to Netlify/Firebase/Vercel

## Assignment Coverage Summary
This app satisfies the main assignment requirements for a travel booking system, especially the Angular-specific features, user journey, role-based access, admin management, booking flow, and UI polish required for a classroom submission.
