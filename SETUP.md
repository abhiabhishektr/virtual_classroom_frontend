# Virtual Classroom - Frontend

A comprehensive virtual classroom platform built with React, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **TanStack Query (React Query)** - Server state management
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** + **DaisyUI** + **shadcn/ui** - Styling
- **Jitsi Meet** - Video conferencing
- **Razorpay** - Payment integration
- **Axios** - HTTP client with interceptors
- **Formik + Yup** - Form handling and validation
- **Framer Motion** - Animations

## 📋 Prerequisites

- Node.js >= 16.x
- Yarn or npm
- Backend API running (default: `http://localhost:5000`)

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
yarn install
# or
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
# Google OAuth - Get from https://console.cloud.google.com/
VITE_GOOGLE_CLIENT_ID="your-google-client-id"

# Razorpay - Get from https://dashboard.razorpay.com/
VITE_RAZORPAY_KEY="your-razorpay-key"
```

### 3. Backend Configuration

Ensure your backend API is running. Update the API URL in `src/utils/constants.ts` if needed:

```typescript
export const API_BASE_URL = 'http://localhost:5000'; // Development
// export const API_BASE_URL = "https://your-production-api.com"; // Production
```

### 4. Start Development Server

```bash
yarn dev
# or
npm run dev
```

The application will start at `http://localhost:5173` (default Vite port)

## 🏗️ Project Structure

```
src/
├── api/                    # API service layers
│   ├── admin/             # Admin-specific APIs
│   ├── chat/              # Chat and messaging APIs
│   ├── payment/           # Payment integration
│   ├── teacher/           # Teacher-specific APIs
│   ├── user/              # User-specific APIs
│   ├── axiosInstance.ts   # Axios config with interceptors
│   ├── authApi.ts         # Authentication APIs
│   └── socket.ts          # Socket.io configuration
├── components/            # React components
│   ├── Admin/            # Admin panel components
│   ├── Auth/             # Authentication components
│   ├── Chat/             # Chat interface
│   ├── Payment/          # Payment components
│   ├── Profile/          # User profile components
│   ├── Shared/           # Shared/common components
│   ├── ui/               # shadcn/ui components
│   └── user/             # User-specific components
├── context/              # React Context providers
│   ├── SocketContext.tsx # Socket.io context
│   └── ThemeContext.tsx  # Theme management
├── hooks/                # Custom React hooks
├── pages/                # Page components
│   ├── Admin/           # Admin pages
│   ├── Teacher/         # Teacher dashboard pages
│   └── Users/           # Student pages
├── redux/                # Redux store
│   ├── slices/          # Redux slices
│   └── store.ts         # Store configuration
├── routes/               # Route configurations
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── App.tsx              # Root component
```

## 🎯 Key Features

### User Roles

- **Students**: Browse courses, enroll, attend live classes, chat
- **Teachers**: Create courses, manage content, conduct live classes
- **Admin**: User management, course oversight, analytics

### Core Features

1. **Authentication**

   - Email/Password login
   - Google OAuth integration
   - OTP verification
   - JWT-based authentication with refresh tokens

2. **Course Management**

   - Course creation and editing
   - Content upload (videos, documents, quizzes)
   - Course enrollment
   - Progress tracking

3. **Live Classes**

   - Jitsi Meet integration
   - Real-time video conferencing
   - Screen sharing
   - Recording capabilities

4. **Real-time Features**

   - Socket.io integration
   - Live chat and messaging
   - Real-time notifications
   - Presence indicators

5. **Payment Integration**

   - Razorpay payment gateway
   - Course purchases
   - Payment verification
   - Transaction history

6. **User Management**
   - Profile customization
   - Image upload with cropping
   - Password management
   - Role-based access control

## 🔐 Authentication Flow

1. User logs in → JWT tokens stored in localStorage
2. Axios interceptors attach token to requests
3. On 401 error → Auto refresh token attempt
4. On token refresh failure → Redirect to login
5. Socket.io authenticated with JWT token

## 🛠️ Available Scripts

```bash
# Development
yarn dev              # Start dev server

# Build
yarn build           # Build for production

# Linting
yarn lint            # Run ESLint

# Preview
yarn preview         # Preview production build
```

## 🐛 Known Issues & Solutions

### Issue: Redux Serialization Warning

**Solution**: Socket.io instance is ignored in Redux middleware (configured in store.ts)

### Issue: Token Refresh Loop

**Solution**: Implemented retry flag and proper token validation

### Issue: CORS Errors

**Solution**: Ensure backend has correct CORS configuration and `withCredentials: true` in axios

## 📝 Environment Variables

| Variable                | Description            | Required           |
| ----------------------- | ---------------------- | ------------------ |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes (for OAuth)    |
| `VITE_RAZORPAY_KEY`     | Razorpay API Key       | Yes (for payments) |

## 🔄 State Management

### Redux Slices

- **authSlice**: Authentication state (tokens)
- **profileSlice**: User profile data
- **socketSlice**: Socket.io instance

### React Query

- Course data fetching
- User progress tracking
- Chat message history
- Optimistic updates

## 🌐 API Integration

### Base URL Configuration

Located in `src/utils/constants.ts`:

- Development: `http://localhost:5000`
- Production: Update before deployment

### Axios Interceptors

- **Request**: Auto-attach JWT token
- **Response**: Handle token refresh, error handling
- **Retry Logic**: Automatic retry on 5xx errors

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS
- **DaisyUI**: Component library
- **shadcn/ui**: Accessible components
- **Framer Motion**: Animations

## 🚨 Critical Configuration

### Required Before Starting

1. ✅ Install dependencies
2. ✅ Configure `.env` file
3. ✅ Ensure backend is running
4. ✅ Verify CORS settings on backend
5. ✅ Add Razorpay script to `index.html` (already present)

### Security Considerations

- ⚠️ Keep `.env` in `.gitignore`
- ⚠️ Never commit API keys
- ⚠️ Use environment variables for sensitive data
- ⚠️ Implement rate limiting on backend
- ⚠️ Validate all user inputs

## 📦 Build for Production

```bash
# Build
yarn build

# Preview build locally
yarn preview

# Deploy dist/ folder to hosting service
```

### Production Checklist

- [ ] Update `API_BASE_URL` in constants.ts
- [ ] Add production environment variables
- [ ] Enable error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up CI/CD pipeline

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run linter: `yarn lint`
4. Test thoroughly
5. Submit pull request

## 📄 License

[Your License Here]

## 🔗 Related Projects

- Backend API: [Link to backend repository]
- Mobile App: [Link if applicable]

## 📞 Support

For issues and questions:

- Create an issue in the repository
- Contact: [Your contact information]

---

Built with ❤️ by [Your Name/Team]
