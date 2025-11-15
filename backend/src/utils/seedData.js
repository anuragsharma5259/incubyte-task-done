import Sweet from '../models/Sweet.js';

const sweets = [
  { name: 'Premium Chocolate Bar', category: 'chocolate', price: 99, quantity: 50, description: 'Rich premium chocolate' },
  { name: 'Rainbow Gummy Bears', category: 'gummy', price: 79, quantity: 100, description: 'Colorful gummy bears' },
  { name: 'Strawberry Lollipop', category: 'lollipop', price: 49, quantity: 75, description: 'Sweet strawberry lollipop' },
  { name: 'Caramel Candy', category: 'candy', price: 69, quantity: 80, description: 'Smooth caramel candies' },
  { name: 'Mint Hard Candy', category: 'hard candy', price: 59, quantity: 90, description: 'Refreshing mint candies' },
  { name: 'Dark Chocolate Truffle', category: 'chocolate', price: 129, quantity: 40, description: 'Luxurious dark chocolate' },
];

const seedData = async () => {
  try {
    await Sweet.insertMany(sweets);
    console.log('✅ Sweets seeded');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  }
};

export default seedData;
