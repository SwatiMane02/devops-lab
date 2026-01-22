# 🧪 Testing Register & Login Functionality

## ✅ What Was Implemented

### 1. **API Service** (`src/services/api.ts`)
- ✅ Register user function
- ✅ Login user function
- ✅ Token management (localStorage)
- ✅ User session management
- ✅ Error handling

### 2. **Register Page** (`src/pages/Register.tsx`)
- ✅ Full backend integration
- ✅ Form validation (password match, length)
- ✅ Loading states with spinner
- ✅ Success/Error messages
- ✅ Role-based redirection
- ✅ Disabled inputs during loading

### 3. **Login Page** (`src/pages/Login.tsx`)
- ✅ Full backend integration
- ✅ Loading states with spinner
- ✅ Success/Error messages
- ✅ Role-based redirection
- ✅ Disabled inputs during loading

### 4. **Environment Configuration** (`.env`)
- ✅ API URL configured to `http://localhost:5000/api`

---

## 🚀 How to Test

### Prerequisites
Make sure both servers are running:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Should be running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Should be running on http://localhost:3000
```

---

## 📝 Test Scenario 1: Register New User

### Steps:
1. **Navigate to Register Page**
   - Go to `http://localhost:3000/register`

2. **Fill in the Form:**
   - **Select Role:** Choose one (Community, Volunteer, or Agency)
   - **Full Name:** `John Doe`
   - **Email:** `john@example.com`
   - **Password:** `password123`
   - **Confirm Password:** `password123`

3. **Click "Create Account"**

### Expected Results:
- ✅ Button shows "Creating Account..." with spinner
- ✅ Green success message appears: "Account created successfully! Redirecting..."
- ✅ Automatically redirects based on role:
  - **Community** → `/dashboard`
  - **Volunteer** → `/volunteer-dashboard`
  - **Agency** → `/admin`
- ✅ User data and token stored in localStorage

### Possible Errors:
- ❌ "Passwords do not match" - if passwords don't match
- ❌ "Password must be at least 6 characters long" - if password too short
- ❌ "User already exists with this email" - if email already registered
- ❌ Backend connection error - if backend is not running

---

## 📝 Test Scenario 2: Login with Registered User

### Steps:
1. **Navigate to Login Page**
   - Go to `http://localhost:3000/login`

2. **Fill in the Form:**
   - **Email:** `john@example.com` (use the email from registration)
   - **Password:** `password123` (use the password from registration)

3. **Click "Sign In"**

### Expected Results:
- ✅ Button shows "Signing In..." with spinner
- ✅ Green success message appears: "Login successful! Redirecting..."
- ✅ Automatically redirects based on user role
- ✅ User data and token stored in localStorage

### Possible Errors:
- ❌ "Invalid credentials" - if email/password is wrong
- ❌ "Your account has been deactivated" - if account is inactive
- ❌ Backend connection error - if backend is not running

---

## 🔍 Verify in Browser DevTools

### Check localStorage:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Local Storage** → `http://localhost:3000`
4. You should see:
   - `token`: JWT token string
   - `user`: JSON object with user data

### Check Network Requests:
1. Open DevTools (F12)
2. Go to **Network** tab
3. Submit the form
4. Look for requests to:
   - `http://localhost:5000/api/auth/register`
   - `http://localhost:5000/api/auth/login`
5. Check response status (should be 200 or 201)

---

## 🎯 Role-Based Redirection

After successful login/register, users are redirected based on their role:

| Role | Redirect URL |
|------|-------------|
| **Community** | `/dashboard` |
| **Volunteer** | `/volunteer-dashboard` |
| **Agency** | `/admin` |

---

## 🐛 Troubleshooting

### Backend Not Running
**Error:** `Failed to fetch` or `Network error`

**Solution:**
```bash
cd backend
npm run dev
```

### MongoDB Not Running
**Error:** Backend shows MongoDB connection error

**Solution:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongodb
```

### CORS Error
**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:** Backend already has CORS configured for `http://localhost:3000`

### Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:** 
- Kill the process using port 5000
- Or change the port in `backend/.env`

---

## 📊 Test Different User Roles

### Create 3 Different Users:

**1. Community User:**
```
Name: Alice Community
Email: alice@community.com
Password: password123
Role: Community
```

**2. Volunteer User:**
```
Name: Bob Volunteer
Email: bob@volunteer.com
Password: password123
Role: Volunteer
```

**3. Agency User:**
```
Name: Charlie Agency
Email: charlie@agency.com
Password: password123
Role: Agency
```

Then login with each to verify role-based redirection works!

---

## ✨ Features Implemented

### Visual Feedback:
- ✅ Loading spinner during API calls
- ✅ Success messages (green)
- ✅ Error messages (red)
- ✅ Disabled form during submission
- ✅ Password visibility toggle

### Validation:
- ✅ Email format validation
- ✅ Password length (min 6 characters)
- ✅ Password confirmation match
- ✅ Required field validation

### Security:
- ✅ JWT token storage
- ✅ Password hashing (backend)
- ✅ Secure HTTP-only cookies (can be added)

---

## 🎉 Success Criteria

Your implementation is working correctly if:

1. ✅ You can register a new user
2. ✅ Success message appears
3. ✅ You're redirected to the appropriate dashboard
4. ✅ You can login with the same credentials
5. ✅ Token is stored in localStorage
6. ✅ Error messages appear for invalid inputs
7. ✅ Loading states work properly

---

## 📞 Next Steps

After testing, you can:

1. **Add Protected Routes** - Prevent unauthorized access
2. **Add Logout Functionality** - Clear localStorage and redirect
3. **Add Profile Page** - Display and edit user info
4. **Add Password Reset** - Forgot password flow
5. **Add Email Verification** - Verify user emails

---

**Happy Testing! 🚀**
