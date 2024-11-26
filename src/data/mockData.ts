import { InventoryItem } from '../types/inventory';
import { Recipe } from '../types/recipe';
import { Notification } from '../types/notification';
import { addDays } from 'date-fns';

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'Dairy',
    quantity: 1,
    unit: 'l',
    expirationDate: addDays(new Date(), 5)
  },
  {
    id: '2',
    name: 'Eggs',
    category: 'Dairy',
    quantity: 6,
    unit: 'pcs',
    expirationDate: addDays(new Date(), 14)
  },
  {
    id: '3',
    name: 'Bread',
    category: 'Bakery',
    quantity: 1,
    unit: 'loaf',
    expirationDate: addDays(new Date(), 4)
  },
  {
    id: '4',
    name: 'Tomatoes',
    category: 'Produce',
    quantity: 4,
    unit: 'pcs',
    expirationDate: addDays(new Date(), 2)
  },
  {
    id: '5',
    name: 'Chicken Breast',
    category: 'Meat',
    quantity: 500,
    unit: 'g',
    expirationDate: addDays(new Date(), 3)
  },
  {
    id: '6',
    name: 'Cheese',
    category: 'Dairy',
    quantity: 200,
    unit: 'g',
    expirationDate: addDays(new Date(), 10)
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Classic Pancakes',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
    prepTime: '20 mins',
    difficulty: 'Easy',
    calories: 350,
    ingredients: ['Flour', 'Eggs', 'Milk', 'Butter', 'Sugar'],
    tags: ['Breakfast', 'Sweet', 'Vegetarian']
  },
  {
    id: 'recipe-2',
    title: 'Grilled Cheese Sandwich',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
    prepTime: '15 mins',
    difficulty: 'Easy',
    calories: 450,
    ingredients: ['Bread', 'Cheese', 'Butter'],
    tags: ['Lunch', 'Quick', 'Vegetarian']
  },
  {
    id: 'recipe-3',
    title: 'Chicken Stir-Fry',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    prepTime: '30 mins',
    difficulty: 'Medium',
    calories: 520,
    ingredients: ['Chicken Breast', 'Bell Peppers', 'Broccoli', 'Soy Sauce', 'Rice'],
    tags: ['Dinner', 'Asian', 'Healthy']
  },
  {
    id: 'recipe-4',
    title: 'Greek Salad',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    prepTime: '15 mins',
    difficulty: 'Easy',
    calories: 280,
    ingredients: ['Tomatoes', 'Cucumber', 'Olives', 'Feta Cheese', 'Olive Oil'],
    tags: ['Lunch', 'Healthy', 'Vegetarian']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'expiring',
    title: 'Expiring Soon',
    message: 'Tomatoes expire in 2 days',
    timestamp: new Date(),
    read: false,
    itemId: '4'
  },
  {
    id: '2',
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: 'Eggs are running low (6 pieces remaining)',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    itemId: '2'
  },
  {
    id: '3',
    type: 'expiring',
    title: 'Expiring Soon',
    message: 'Chicken breast expires in 3 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    itemId: '5'
  },
  {
    id: '4',
    type: 'system',
    title: 'New Recipes Available',
    message: 'Check out 3 new recipes based on your inventory!',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true
  }
];