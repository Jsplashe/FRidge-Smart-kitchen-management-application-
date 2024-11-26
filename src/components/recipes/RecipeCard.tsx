import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Clock, ChefHat, Flame } from 'lucide-react';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function RecipeCard({ recipe, onSwipe }: RecipeCardProps) {
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 100) return;
    onSwipe(info.offset.x > 0 ? 'right' : 'left');
  };

  return (
    <motion.div
      className="absolute w-full h-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.8, rotate: -10, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-3">{recipe.title}</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span className="text-sm">{recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              <span className="text-sm">{recipe.calories} cal</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-white/20 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Main Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 4).map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-2 py-1 rounded-full bg-emerald-500/20 text-xs"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 4 && (
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-xs">
                  +{recipe.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}