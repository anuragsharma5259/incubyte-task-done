import express from 'express';
import {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from '../controllers/sweetController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/sweets - View all sweets
router.get('/', protect, getAllSweets);

// GET /api/sweets/search - Search sweets
router.get('/search', protect, searchSweets);

// POST /api/sweets - Add new sweet (Admin)
router.post('/', protect, adminOnly, createSweet);

// PUT /api/sweets/:id - Update sweet (Admin)
router.put('/:id', protect, adminOnly, updateSweet);

// DELETE /api/sweets/:id - Delete sweet (Admin)
router.delete('/:id', protect, adminOnly, deleteSweet);

// POST /api/sweets/:id/purchase - Purchase sweet
router.post('/:id/purchase', protect, purchaseSweet);

// POST /api/sweets/:id/restock - Restock sweet (Admin)
router.post('/:id/restock', protect, adminOnly, restockSweet);

export default router;
