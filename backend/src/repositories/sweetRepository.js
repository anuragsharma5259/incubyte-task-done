import Sweet from '../models/Sweet.js';

class SweetRepository {
  async findAll() {
    return await Sweet.find();
  }

  async findById(id) {
    return await Sweet.findById(id);
  }

  async create(sweetData) {
    return await Sweet.create(sweetData);
  }

  async update(id, sweetData) {
    return await Sweet.findByIdAndUpdate(id, sweetData, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Sweet.findByIdAndDelete(id);
  }

  async search(filters) {
    const query = {};
    
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }
    
    return await Sweet.find(query);
  }

  async purchase(id, quantity) {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < quantity) throw new Error('Insufficient stock');
    
    sweet.quantity -= quantity;
    return await sweet.save();
  }

  async restock(id, quantity) {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error('Sweet not found');
    
    sweet.quantity += Number(quantity);
    return await sweet.save();
  }
}

export default new SweetRepository();
