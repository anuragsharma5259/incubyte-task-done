import sweetRepository from '../repositories/sweetRepository.js';

export const getAllSweets = async (req, res) => {
  try {
    const sweets = await sweetRepository.findAll();
    res.json({ success: true, data: sweets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchSweets = async (req, res) => {
  try {
    const sweets = await sweetRepository.search(req.query);
    res.json({ success: true, data: sweets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSweet = async (req, res) => {
  try {
    const sweet = await sweetRepository.create(req.body);
    res.status(201).json({ success: true, data: sweet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const sweet = await sweetRepository.update(req.params.id, req.body);
    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }
    res.json({ success: true, data: sweet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const sweet = await sweetRepository.delete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }
    res.json({ success: true, message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const sweet = await sweetRepository.purchase(req.params.id, quantity);
    res.json({ success: true, message: 'Purchase successful', data: sweet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Valid quantity required' });
    }
    const sweet = await sweetRepository.restock(req.params.id, quantity);
    res.json({ success: true, message: 'Restock successful', data: sweet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
