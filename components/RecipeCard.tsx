
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{recipe.recipeName}</h3>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded uppercase">
            {recipe.difficulty} | {recipe.time}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {recipe.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            필요 재료
          </h4>
          <p className="text-sm text-gray-600">
            {recipe.ingredients.join(', ')}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
            조리 순서
          </h4>
          <ol className="space-y-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex gap-2">
                <span className="font-bold text-orange-500 shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
