import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, X } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import RecipeCard from '../components/recipes/RecipeCard';
import { Recipe } from '../types/recipe';
import { mockRecipes } from '../data/mockData';

export default function Recipes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedRecipes([...savedRecipes, mockRecipes[currentIndex].id]);
    }
    setCurrentIndex((prev) => Math.min(prev + 1, mockRecipes.length - 1));
  };

  const handleButtonClick = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Recipe Recommendations</h1>
        
        {currentIndex < mockRecipes.length ? (
          <>
            <div className="relative w-full aspect-[3/4] mb-6">
              <AnimatePresence>
                <RecipeCard
                  key={mockRecipes[currentIndex].id}
                  recipe={mockRecipes[currentIndex]}
                  onSwipe={handleSwipe}
                />
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleButtonClick('left')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
                Skip
              </button>
              <button
                onClick={() => handleButtonClick('right')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
              >
                <ThumbsUp className="h-5 w-5" />
                Save Recipe
              </button>
            </div>

            <motion.div 
              className="mt-6 text-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Swipe right to save, left to skip
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              You've seen all recipes!
            </h2>
            <p className="text-gray-600 mb-6">
              You saved {savedRecipes.length} recipes to your collection.
            </p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}