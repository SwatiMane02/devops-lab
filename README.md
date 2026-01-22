# 🚨 EmergencyHub - Centralized Emergency Response Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


## 🌟 Overview

**EmergencyHub** is a comprehensive emergency response platform that bridges the gap between citizens, volunteers, and emergency agencies. The platform enables:

- 🚨 **Real-time incident reporting** by community members
- 🦺 **Volunteer coordination** for emergency response
- 🏛️ **Agency management** of resources and operations
- 🤖 **AI-powered predictions** for severity classification and risk assessment
- 📊 **Analytics dashboard** for data-driven decision making
- 🗺️ **Geospatial tracking** of incidents and resources

### The Problem

Traditional emergency response systems often suffer from:
- Delayed incident reporting
- Poor coordination between agencies and volunteers
- Inefficient resource allocation
- Lack of real-time visibility
- No predictive capabilities

### Our Solution

EmergencyHub provides a unified platform that:
- ✅ Enables instant incident reporting with GPS location
- ✅ Connects volunteers with nearby emergencies
- ✅ Gives agencies real-time visibility and control
- ✅ Uses AI to predict severity and optimize response
- ✅ Tracks resources and their availability
- ✅ Sends targeted alerts based on location and role

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router v6
- **State Management:** React Hooks
- **Maps:** Leaflet / Google Maps API
- **Charts:** Recharts / Chart.js
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **API Documentation:** Postman Collection

---


## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v6 or higher
- **Python** 3.8+ (for AI services)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priti2107/EmergencyHub.git
   cd EmergencyHub
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**

   **Backend (.env):**
   ```bash
   cd backend
   # Copy and configure .env file
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/aegisnet
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:8080
   ```

   **Frontend (.env):**
   ```bash
   cd frontend
   # Create .env file
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongodb
   ```

6. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   # Server running on http://localhost:5000
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   # App running on http://localhost:8080
   ```


---

## 👥 User Roles

### 1. Community Member
**Permissions:**
- Report incidents
- View own reports
- Receive alerts
- View nearby incidents
- Access safety resources

**Use Case:** Citizens reporting emergencies and staying informed

### 2. Volunteer
**Permissions:**
- All Community permissions +
- View assigned incidents
- Accept/decline assignments
- Update incident status
- Add response notes
- Track volunteer hours

**Use Case:** First responders and community volunteers

### 3. Government Agency
**Permissions:**
- All Volunteer permissions +
- View all incidents
- Manage resources
- Create and broadcast alerts
- Access analytics dashboard
- Manage users
- Assign resources and volunteers
- Generate reports

**Use Case:** Emergency management agencies and officials

---

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation and sanitization
- CORS protection
- Environment variable configuration
- Secure HTTP headers

---

