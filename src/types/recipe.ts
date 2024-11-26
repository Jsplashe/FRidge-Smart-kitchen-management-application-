export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  calories: number;
  tags: string[];
}