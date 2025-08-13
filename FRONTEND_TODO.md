# Frontend Implementation Checklist

## ✅ Completed
1. **UI/UX Pages**
   - [x] Login page (`/auth/login`)
   - [x] Signup page (`/auth/signup`)
   - [x] Consultation request page (`/consultation/request`)
   - [x] Consultation list page (`/consultation/list`)
   - [x] SiloFat procedure page with cart buttons
   - [x] Header with cart icon and login button

2. **Basic Context Setup**
   - [x] AuthContext for user management
   - [x] CartContext for cart management

## 🔧 Remaining Frontend Tasks

### 1. **Complete State Management Integration**
- [ ] Connect cart buttons to CartContext
- [ ] Update cart badge count dynamically
- [ ] Persist cart state in localStorage
- [ ] Handle user session (login/logout states)
- [ ] Protected routes (redirect to login if not authenticated)

### 2. **API Service Layer**
Create service files for API calls:
```typescript
// src/services/api.ts
- Base API configuration
- Request/Response interceptors
- Error handling

// src/services/auth.service.ts
- login(email, password)
- signup(userData)
- logout()
- getCurrentUser()

// src/services/consultation.service.ts
- createConsultation(data)
- getConsultations()
- getConsultationById(id)
- updateConsultationStatus(id, status) // admin only

// src/services/procedures.service.ts
- getAllProcedures()
- getProcedureById(id)
- getProceduresByCategory(category)
```

### 3. **Additional Pages Needed**
- [ ] **Admin Dashboard** (`/admin`)
  - View all consultations
  - Update consultation status
  - User management
  
- [ ] **My Page** (`/mypage`)
  - View my consultations
  - Edit profile
  - Change password

- [ ] **All Procedures Page** (`/procedures`)
  - List all available procedures
  - Filter by category
  - Add to cart functionality

### 4. **Component Improvements**
- [ ] **Header Component**
  - Show user name when logged in
  - Dropdown menu with logout option
  - Dynamic cart count

- [ ] **Loading States**
  - Add loading spinners
  - Skeleton screens for data fetching

- [ ] **Error Handling**
  - Toast notifications for success/error
  - Form validation feedback
  - 404 page

### 5. **Forms Enhancement**
- [ ] **Validation**
  - Email format validation
  - Password strength requirements
  - Phone number formatting
  - Required field indicators

- [ ] **User Experience**
  - Auto-focus on first field
  - Enter key submission
  - Clear error messages

### 6. **Responsive Design**
- [ ] Mobile menu implementation
- [ ] Touch-friendly cart buttons
- [ ] Responsive tables for consultation list
- [ ] Mobile-optimized forms

## 📡 API Endpoints Needed (for Spring Boot Backend)

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Users
- `GET /api/users/{id}`
- `PUT /api/users/{id}`
- `DELETE /api/users/{id}`

### Procedures
- `GET /api/procedures`
- `GET /api/procedures/{id}`
- `GET /api/procedures/category/{category}`

### Consultations
- `POST /api/consultations`
- `GET /api/consultations` (with filters)
- `GET /api/consultations/{id}`
- `PUT /api/consultations/{id}/status`
- `DELETE /api/consultations/{id}`

### Cart (if stored in backend)
- `GET /api/cart`
- `POST /api/cart/items`
- `DELETE /api/cart/items/{id}`
- `DELETE /api/cart`

## 🔐 Security Considerations
1. **JWT Token Management**
   - Store in httpOnly cookies or secure localStorage
   - Refresh token implementation
   - Auto logout on expiry

2. **Role-Based Access**
   - Admin routes protection
   - User-specific data access
   - API request authorization headers

3. **Data Validation**
   - Client-side validation
   - Sanitize user inputs
   - XSS prevention

## 📦 Environment Variables Needed
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎨 Optional Enhancements
- [ ] Dark mode toggle
- [ ] Multi-language support (Korean/English)
- [ ] Email notifications
- [ ] SMS notifications for appointments
- [ ] Image upload for consultation
- [ ] Real-time chat support
- [ ] Payment integration (if needed later)

## 📝 Testing Requirements
- [ ] Unit tests for utilities
- [ ] Integration tests for API calls
- [ ] E2E tests for critical user flows
- [ ] Accessibility testing

## 🚀 Deployment Preparation
- [ ] Environment-specific configurations
- [ ] Build optimization
- [ ] SEO meta tags
- [ ] Performance optimization
- [ ] Error tracking (Sentry, etc.)