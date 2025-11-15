import orderRepository from '../repositories/orderRepository.js';
import sweetRepository from '../repositories/sweetRepository.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    // Check stock and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const sweet = await sweetRepository.findById(item.sweetId);
      if (!sweet) {
        return res.status(404).json({ success: false, message: `Sweet ${item.sweetId} not found` });
      }
      if (sweet.quantity < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${sweet.name}` });
      }

      orderItems.push({
        sweet: sweet._id,
        name: sweet.name,
        price: sweet.price,
        quantity: item.quantity
      });

      totalAmount += sweet.price * item.quantity;

      // Decrease stock
      await sweetRepository.purchase(sweet._id, item.quantity);
    }

    // Create order
    const order = await orderRepository.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderRepository.findAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderRepository.findByUserId(req.user._id);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderRepository.updateStatus(req.params.id, status);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
