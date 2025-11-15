# 🍬 Sweet Shop Management System

A full-stack MERN application for managing a sweet shop with advanced features including order management, inventory control, and real-time cart functionality.

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Extra Features](#extra-features)
- [AI Usage](#ai-usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Sweet Shop Management System is a modern, full-stack web application that provides a complete solution for managing a sweet shop's inventory, orders, and customer interactions. Built with the MERN stack, it features a beautiful candy-themed UI, real-time updates, and comprehensive order management.

### Key Highlights

- 🎨 **Modern UI/UX** - Candy Crush inspired design with smooth animations
- 🛒 **Complete E-commerce Flow** - From browsing to order tracking
- 👨‍💼 **Admin Dashboard** - Powerful inventory and order management
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔐 **Secure Authentication** - JWT-based auth with role-based access
- 📦 **Order Management** - Complete order lifecycle tracking
- 💾 **Real Database** - MongoDB Atlas integration

## ✨ Features

### Core Features (As Per Requirements)

#### 🔐 Authentication System
- User registration with name, email, and password
- Secure login with JWT token-based authentication
- Password hashing using bcryptjs
- Role-based access control (User/Admin)
- Protected routes with middleware

#### 🍭 Sweet Shop Management
- View all available sweets with details
- Search sweets by name, category, or price range
- Real-time inventory updates
- Category-based organization
- Purchase functionality with stock management

#### 👨‍💼 Admin Panel
- Complete CRUD operations for sweets
- Add new sweets with validation
- Update sweet details and pricing
- Delete sweets with confirmation
- Restock inventory functionality
- Statistics dashboard

#### 💾 Database Integration
- MongoDB Atlas cloud database
- Persistent data storage
- Auto-seeding with 12 default sweets
- Proper schema design with validation

### 🎁 Extra Features Implemented

#### 1. Complete Order Management System
**Frontend:**
- 🛒 **Shopping Cart**
  - Add/remove items with one click
  - Update quantities in real-time
  - Slide-in cart sidebar
  - Live price calculation
  - Persistent cart state

- 📦 **Checkout Flow**
  - Beautiful checkout modal
  - Shipping address collection
  - Phone number validation
  - Pincode validation
  - Form validation

- 📋 **Order History (My Orders)**
  - View all past orders
  - Visual order status timeline
  - Track order progress (Pending → Processing → Shipped → Delivered)
  - Order details with items and pricing
  - Delivery address display
  - Order date and time

**Backend:**
- Order schema with relationships
- Order creation endpoint
- User order history endpoint
- Admin order management endpoint
- Order status update functionality
- Stock reduction on purchase

**Admin Features:**
- 📊 **Order Management Panel**
  - View all customer orders
  - Customer details (name, phone, address)
  - Order items breakdown
  - Status update dropdown
  - Revenue tracking
  - Order statistics (total, pending, delivered)

#### 2. Enhanced UI/UX
- 🎨 **Beautiful Landing Page**
  - Candy Crush themed hero section
  - Animated floating candies
  - Featured sweets showcase
  - Stats dashboard
  - Call-to-action sections

- 🎭 **Premium Design System**
  - Gradient effects throughout
  - Smooth animations and transitions
  - Hover effects and micro-interactions
  - Custom loading states
  - Toast notifications for all actions
  - Custom confirmation modals (no browser alerts)

- 📱 **Fully Responsive**
  - Mobile-first design approach
  - Tablet optimization
  - Desktop layouts
  - Touch-friendly buttons
  - Optimized images and icons

#### 3. Advanced Features
- 🔍 **Search & Filter**
  - Real-time search
  - Category filtering
  - Price range filtering
  - Combined filters

- 📊 **Admin Dashboard**
  - Total products count
  - Stock level indicators
  - Out of stock alerts
  - Low stock warnings
  - Revenue tracking

- 🔔 **Real-time Notifications**
  - Success messages
  - Error handling
  - Loading states
  - Confirmation dialogs

#### 4. Security Enhancements
- Environment-based admin credentials
- JWT token expiration handling
- Input validation on frontend and backend
- Protected API routes
- CORS configuration
- Password hashing with bcrypt

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2 | UI Library |
| Vite | 5.x | Build Tool |
| React Router | 6.x | Routing |
| Tailwind CSS | 3.x | Styling |
| Axios | 1.6 | HTTP Client |
| Lucide React | Latest | Icons |
| React Toastify | 9.x | Notifications |
| Context API | - | State Management |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20.x | Runtime |
| Express.js | 4.18 | Web Framework |
| MongoDB | Atlas | Database |
| Mongoose | 7.x | ODM |
| JWT | 9.x | Authentication |
| bcryptjs | 2.4 | Password Hashing |
| dotenv | 16.x | Environment Variables |
| CORS | 2.8 | Cross-Origin |
| Express Validator | 7.x | Validation |

### Architecture Patterns
- **MVC Pattern** - Model-View-Controller separation
- **Repository Pattern** - Data access abstraction
- **ES6 Modules** - Modern JavaScript imports
- **Context API** - React state management
- **JWT Authentication** - Stateless auth
- **REST API** - RESTful endpoints

## 🚦 How to Run (Frontend & Backend)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sweet-shop.git
cd sweet-shop
```

### 2. Backend Setup
```bash
cd backend
npm install
# Add your MongoDB URI and other secrets to .env
npm start
```
- The backend will run at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- The frontend will run at `http://localhost:3000`

### 4. Usage
- Register or login as a user to browse and order sweets.
- Login as admin (credentials in `.env`) to manage sweets and orders.

## 🤖 AI Usage (Transparency)

### AI Tools Used
- **GitHub Copilot (Claude Sonnet 4.5)**

### How AI Was Used
- Generated boilerplate for backend (Express routes, controllers, models).
- Suggested React component structures and responsive Tailwind CSS classes.
- Helped design order management system and checkout flow.
- Assisted in debugging, error handling, and optimizing code.
- Provided ideas for UI/UX improvements and mobile responsiveness.

### Reflection
- AI accelerated development, especially for repetitive code and patterns.
- Manual review and customization were done for all AI-generated code.
- AI suggestions were most useful for structure, less so for business logic.
- Co-authorship added to all commits using AI assistance.

```text
Co-authored-by: GitHub Copilot <copilot@github.com>
```

## 📝 Quick Reference

- **Backend:** Node.js + Express + MongoDB (Atlas)
- **Frontend:** React + Vite + Tailwind CSS
- **Authentication:** JWT (token-based)
- **Order Management:** Full flow from cart to admin tracking
- **Responsive:** Mobile, tablet, desktop
- **Extra Features:** Order status tracking, admin dashboard, toast notifications

## 🏗️ Architecture

### 1. Client-Side (Frontend)
- **React** for building user interfaces
- **Vite** as the build tool and development server
- **React Router** for routing and navigation
- **Tailwind CSS** for styling and responsive design
- **Axios** for making HTTP requests to the backend
- **Context API** for state management across components
- **React Toastify** for displaying notifications

### 2. Server-Side (Backend)
- **Node.js** as the runtime environment
- **Express.js** for building the RESTful API
- **MongoDB Atlas** as the cloud database
- **Mongoose** for object data modeling (ODM) with MongoDB
- **JWT** for user authentication and authorization
- **bcryptjs** for hashing and securing passwords
- **dotenv** for managing environment variables
- **CORS** for enabling cross-origin resource sharing
- **Express Validator** for validating and sanitizing user input

### 3. Development Tools
- **Git** for version control
- **GitHub** for hosting the repository and collaboration
- **Postman** for testing API endpoints
- **MongoDB Compass** for managing the MongoDB database
- **Visual Studio Code** as the code editor

### 4. Deployment
- **Render.com** for deploying the backend server
- **Vercel** for deploying the frontend application
- **MongoDB Atlas** for the production database

## 📸 Screenshots

### 1. Landing Page
![Landing Page](./screenshots/landing-page.png)

### 2. Product Listing
![Product Listing](./screenshots/product-listing.png)

### 3. Shopping Cart
![Shopping Cart](./screenshots/shopping-cart.png)

### 4. Checkout Page
![Checkout Page](./screenshots/checkout-page.png)

### 5. Order History
![Order History](./screenshots/order-history.png)

### 6. Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

## 🌐 Deployment

The Sweet Shop Management System is deployed on Render.com for the backend and Vercel for the frontend.

- **Frontend:** [https://sweet-shop-frontend.vercel.app](https://sweet-shop-frontend.vercel.app)
- **Backend:** [https://sweet-shop-backend.onrender.com](https://sweet-shop-backend.onrender.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a pull request

Please ensure your code follows the existing style and includes appropriate tests.

---

Made with ❤️ by anurag sharma (https://github.com/anuragsharma5259))

