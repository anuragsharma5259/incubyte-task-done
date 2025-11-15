import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Create order
router.post('/', protect, createOrder);

// GET /api/orders - Get all orders (Admin)
router.get('/', protect, adminOnly, getAllOrders);

// GET /api/orders/my - Get user orders
router.get('/my', protect, getUserOrders);

// PUT /api/orders/:id/status - Update order status (Admin)
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
