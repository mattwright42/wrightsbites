export const products = {
  'Delicious Dozen': {
    id: 'prod_S8rVe6LxHxWIh4',
    priceId: 'price_1REZmCI5NbtmiiqjfJJ7mYcz',
    description: 'Our delicious chocolate chip cookie in a slightly smaller size as a 12-pack!',
    mode: 'payment',
  },
  'Chocolate Chip Cookie (The Big One)': {
    id: 'prod_S8rMQDdJ7fZeAo',
    priceId: 'price_1REZdnI5Nbtmiiqj3sZc1X7u',
    description: 'A large, delicious, freshly-baked chocolate chip cookie.',
    mode: 'payment',
  },
} as const;

export type ProductName = keyof typeof products;
export type Product = (typeof products)[ProductName];