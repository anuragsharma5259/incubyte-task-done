# Sweet Shop Frontend

A modern, responsive React frontend built with Vite and Tailwind CSS for the Sweet Shop management system.

## 🎨 Features

### Core Features
- ✅ User Registration & Login with beautiful candy-themed UI
- ✅ Role-based Access Control (Admin & User views)
- ✅ Responsive Dashboard with all sweets
- ✅ Advanced Search & Filter functionality (name, category, price range)
- ✅ Purchase sweets with real-time inventory updates
- ✅ Admin Panel for complete CRUD operations
- ✅ Restock functionality for admins
- ✅ Modern animations and smooth transitions
- ✅ Toast notifications for user feedback
- ✅ Protected routes with authentication

### 🎁 Extra Features Added

1. **Complete Order Management System**
   - Shopping cart with add/remove/update quantity
   - Cart sidebar with live updates
   - Checkout modal with shipping address form
   - Order history page (My Orders)
   - Order status tracking with visual timeline
   - Admin order management panel
   - Revenue tracking and statistics

2. **Enhanced UI/UX**
   - Beautiful landing page with Candy Crush theme
   - Premium gradient navbar
   - Fully responsive design (mobile, tablet, desktop)
   - Animated components with smooth transitions
   - Custom confirmation modals (no browser alerts)
   - Real-time toast notifications
   - Loading states and spinners
   - Hover effects and micro-interactions

3. **Advanced Components**
   - `CheckoutModal` - Collects shipping details
   - `ConfirmModal` - Custom confirmation dialogs
   - `CartSidebar` - Slide-in shopping cart
   - `MyOrders` - User order history with tracking
   - `AdminOrders` - Complete order management for admin
   - `AdminNavbar` - Separate navbar for admin panel

4. **State Management**
   - Context API for authentication
   - Context API for shopping cart
   - Persistent cart state
   - Real-time cart updates

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library
- **Context API** - State management

## 📦 Installation

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

Build files will be in the `dist` folder.

## 📁 Project Structure

