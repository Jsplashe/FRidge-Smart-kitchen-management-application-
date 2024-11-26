export interface Meal {
  id: string;
  title: string;
  imageUrl?: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  calories: number;
  prepTime: string;
}

export interface DayPlan {
  id: string;
  date: Date;
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}