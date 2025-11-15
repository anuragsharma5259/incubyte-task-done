import Order from '../models/Order.js';

class OrderRepository {
  async create(orderData) {
    return await Order.create(orderData);
  }

  async findAll() {
    return await Order.find()
      .populate('user', 'name email')
      .populate('items.sweet', 'name category')
      .sort({ createdAt: -1 });
  }

  async findByUserId(userId) {
    return await Order.find({ user: userId })
      .populate('items.sweet', 'name category')
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.sweet', 'name category');
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email');
  }
}

export default new OrderRepository();
