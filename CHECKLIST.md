# ✅ Project Restart Checklist

Use this checklist to restart your Virtual Classroom project systematically.

---

## 📋 PRE-START CHECKLIST

### Environment Setup

- [ ] Node.js >= 16.x installed
- [ ] Yarn or npm available
- [ ] Code editor (VSCode recommended) installed
- [ ] Git repository cloned/pulled latest

### Backend Verification

- [ ] Backend repository available
- [ ] Backend API URL known (default: http://localhost:5000)
- [ ] Backend is running (or can be started)
- [ ] Database is accessible

---

## 🔧 INITIAL SETUP (First Time)

### 1. Install Dependencies

```bash
cd /Users/abhishektr/code/vclassroom/frontend
yarn install
```

- [ ] Dependencies installed without errors
- [ ] `node_modules` folder created

### 2. Environment Configuration

```bash
cp .env.example .env
```

- [ ] `.env` file created
- [ ] Open `.env` and update:
  - [ ] `VITE_GOOGLE_CLIENT_ID` (get from Google Console)
  - [ ] `VITE_RAZORPAY_KEY` (get from Razorpay Dashboard)

### 3. API Configuration

Open `src/utils/constants.ts` and verify:

- [ ] `API_BASE_URL` points to correct backend
- [ ] For development: `http://localhost:5000`
- [ ] For production: Update to production URL

### 4. Remove Old Build Artifacts

```bash
rm -rf dist/
rm -rf node_modules/.vite/
```

- [ ] Old builds removed

---

## 🔐 SECURITY CHECKLIST

### Critical Security Tasks

- [ ] Rotate Google OAuth Client ID (if exposed)
- [ ] Rotate Razorpay API Key (if exposed)
- [ ] Verify `.env` is in `.gitignore`
- [ ] Never commit `.env` file
- [ ] Check git history for exposed keys
- [ ] Update credentials in backend if changed

### Code Security Review

- [ ] Review `src/components/Profile/PersonalDetails.tsx:64`
  - [ ] Replace hardcoded userId with dynamic value
- [ ] Check for any hardcoded API keys in code
- [ ] Verify CORS settings allow only your domains
- [ ] Check cookie settings (secure, sameSite)

---

## 🐛 BUG FIXES CHECKLIST

### Critical Bugs (Already Fixed ✅)

- [x] Fixed wrong env variable in PersonalDetails.tsx
- [x] Fixed Redux serialization warning
- [x] Fixed httpOnly cookie client-side issue
- [x] Removed accidental git log file
- [x] Updated .gitignore

### Remaining Bugs to Fix

- [ ] Fix hardcoded userId in PersonalDetails.tsx
- [ ] Remove/integrate unused socket.ts file
- [ ] Add Error Boundary to App.tsx
- [ ] Remove all console.log statements (production)
- [ ] Clean up commented code blocks

---

## 🧹 CODE CLEANUP CHECKLIST

### Console Statements

Find and review all console statements:

```bash
grep -r "console\." src/ | grep -v "node_modules"
```

- [ ] Keep necessary error logs
- [ ] Remove debug console.logs
- [ ] Replace with proper logging service

### Commented Code

- [ ] Review `src/api/axiosInstance.ts` (100+ lines commented)
- [ ] Decision: Delete or uncomment
- [ ] Remove example code from README.md

### Type Safety

- [ ] Fix `socket: any` in socketSlice.ts
- [ ] Add proper interfaces where missing
- [ ] Enable `@typescript-eslint/no-explicit-any` in ESLint

---

## 🎨 UI/UX IMPROVEMENTS

### Loading States

- [ ] Add loading indicators to API calls
- [ ] Use skeleton loaders where appropriate
- [ ] Implement global loading overlay

### Error Handling

- [ ] Integrate ErrorBoundary component
- [ ] Add error states to forms
- [ ] Show user-friendly error messages
- [ ] Add retry buttons where needed

### Accessibility

- [ ] Add ARIA labels
- [ ] Test keyboard navigation
- [ ] Check color contrast
- [ ] Test with screen reader

---

## 🔌 WEBSOCKET CHECKLIST

### Socket.io Setup

- [ ] Verify socket connects on auth
- [ ] Test real-time notifications
- [ ] Test chat functionality
- [ ] Check socket disconnects on logout

### Socket Error Handling

- [ ] Add connection error handler
- [ ] Add reconnection logic
- [ ] Handle socket timeout
- [ ] Test offline behavior

---

## 🎥 FEATURE TESTING CHECKLIST

### Authentication

- [ ] Email/password login works
- [ ] Google OAuth works
- [ ] OTP verification works
- [ ] Logout works properly
- [ ] Token refresh works
- [ ] Protected routes redirect correctly

### Student Features

- [ ] Can browse courses
- [ ] Can view course details
- [ ] Can enroll in courses
- [ ] Can access course content
- [ ] Can attend live classes
- [ ] Can send messages in chat
- [ ] Can track progress

### Teacher Features

- [ ] Can create courses
- [ ] Can upload content
- [ ] Can edit course details
- [ ] Can manage students
- [ ] Can start live classes
- [ ] Can view analytics

### Admin Features

- [ ] Can view all users
- [ ] Can manage teachers
- [ ] Can manage courses
- [ ] Can send notifications
- [ ] Can view analytics
- [ ] Can approve/reject requests

### Payment Flow

- [ ] Course price displays correctly
- [ ] Razorpay modal opens
- [ ] Payment processes successfully
- [ ] Payment verification works
- [ ] Course unlocks after payment
- [ ] Error handling works

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All critical bugs fixed
- [ ] Security issues resolved
- [ ] Environment variables set
- [ ] API URLs updated for production
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics set up (optional)

### Build Process

```bash
yarn build
```

- [ ] Build completes without errors
- [ ] Check build size (should be reasonable)
- [ ] Test build locally: `yarn preview`

### Production Configuration

- [ ] Update `API_BASE_URL` in constants.ts
- [ ] Set production environment variables
- [ ] Configure CDN (if using)
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS on backend

### Post-Deployment

- [ ] Verify app loads
- [ ] Test critical user flows
- [ ] Check console for errors
- [ ] Verify API connections
- [ ] Test on mobile devices
- [ ] Monitor error tracking

---

## 📊 PERFORMANCE CHECKLIST

### Code Splitting

- [ ] Implement lazy loading for routes
- [ ] Lazy load heavy components (Jitsi, etc.)
- [ ] Code split by feature/role

### Bundle Optimization

- [ ] Remove unused dependencies
- [ ] Analyze bundle size
- [ ] Consider removing duplicate UI libraries
- [ ] Enable gzip compression

### Image Optimization

- [ ] Implement image compression on upload
- [ ] Use WebP format where possible
- [ ] Add lazy loading for images
- [ ] Set proper image dimensions

### Caching Strategy

- [ ] Configure React Query cache
- [ ] Set HTTP cache headers
- [ ] Consider service worker (PWA)

---

## 🧪 TESTING CHECKLIST

### Manual Testing

- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers
- [ ] Test different screen sizes
- [ ] Test slow network (throttling)

### Automated Testing (Optional)

- [ ] Set up Jest + React Testing Library
- [ ] Write unit tests for utilities
- [ ] Write component tests
- [ ] Set up E2E tests (Cypress/Playwright)
- [ ] Configure CI/CD pipeline

---

## 📝 DOCUMENTATION CHECKLIST

### Project Documentation

- [x] README.md exists
- [x] SETUP.md created
- [x] ANALYSIS.md created
- [x] PROJECT_SUMMARY.md created
- [ ] API documentation (if separate)
- [ ] Deployment guide
- [ ] Troubleshooting guide

### Code Documentation

- [ ] Add JSDoc comments to utilities
- [ ] Document complex logic
- [ ] Add README in complex folders
- [ ] Update component prop descriptions

---

## 🎯 QUICK START (MINIMAL)

For immediate development (skip if time-constrained):

1. **Essential Only**

   ```bash
   yarn install
   cp .env.example .env
   # Edit .env with your keys
   yarn dev
   ```

2. **Critical Fixes**

   - [ ] Fix hardcoded userId
   - [ ] Remove console.logs from production code
   - [ ] Test main user flows

3. **Start Developing**
   - Backend should be running
   - Access at http://localhost:5173

---

## 🆘 TROUBLESHOOTING

### Dependencies won't install

```bash
rm -rf node_modules yarn.lock
yarn install
```

### Port already in use

```bash
# Change port in vite.config.ts
# Or kill process on port 5173
lsof -ti:5173 | xargs kill
```

### CORS errors

- Check backend CORS configuration
- Verify `withCredentials: true` in axios
- Check API_BASE_URL is correct

### Socket won't connect

- Verify backend WebSocket server running
- Check auth token is valid
- Check browser console for errors

### Payment not working

- Verify Razorpay key in .env
- Check Razorpay script in index.html
- Test in sandbox mode first

---

## ✅ COMPLETION CHECKLIST

Before considering the project "restarted":

- [ ] All dependencies installed
- [ ] Environment configured
- [ ] Backend connection verified
- [ ] Critical bugs fixed
- [ ] Main features tested
- [ ] Ready for development

---

**Last Updated**: November 20, 2025  
**Use this checklist systematically to ensure nothing is missed!**
