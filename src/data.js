import React, { useEffect } from 'react';

export const flavors = [
  'Vanilla',
  'Chocolate',
  'Confetti',
  'Strawberry',
  'Cookies and Cream',
  'Red Velvet',
  'Chocolate Chip',
  'Cinnamon Swirl',
  'Lemon',
];
export const fillings = [
  {
    type: 'Fruit',
    flavors: ['Strawberry', 'Blueberry', 'Raspberry', 'Peach', 'Pineapple'],
    price: 5,
  },
  {
    type: 'Pudding',
    flavors: ['Vanilla', 'Chocolate', 'Banana'],
    price: 5,
  },
];
export const frostings = [
  {
    type: 'American Buttercream',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  {
    type: 'Swiss Meringue',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  {
    type: 'Ganache',
    flavors: ['White', 'Milk', 'Semi-Sweet ', 'Dark'],
  },
  {
    type: 'Whipped Cream',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  { type: 'Cream Cheese' },
];
export const toppings = [
  { topping: 'Sprinkles', price: 0 },
  { topping: 'White Chocolate Drip', price: 2 },
  { topping: 'Chocolate Drip', price: 2 },
];
export const sizes = [
  { amount: 'Dozen (12)', price: 25 },
  { amount: 'Half Dozen (6)', price: 15 },
];
