export const products = [
  {
    id: '1',
    name: 'Premium Office Chair',
    description: 'Ergonomic design with lumbar support',
    category: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
    price: 299
  },
  {
    id: '2',
    name: 'Standing Desk',
    description: 'Height-adjustable electric desk',
    category: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    price: 499
  },
  {
    id: '3',
    name: 'Wireless Keyboard',
    description: 'Low-profile mechanical switches',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    price: 129
  },
  {
    id: '4',
    name: 'Ultra-wide Monitor',
    description: '34" curved display, 4K resolution',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    price: 699
  }
];

export const categories = [...new Set(products.map(p => p.category))];