
import React, { useState } from 'react';
import { MealTime, Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealTime, setMealTime] = useState<MealTime>(MealTime.LUNCH);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = (ing: string) => {
    if (!ingredients.includes(ing)) {
      setIngredients([...ingredients, ing]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSuggest = async () => {
    if (ingredients.length === 0) {
      alert("최소 한 가지 이상의 재료를 입력해주세요!");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await generateRecipes(ingredients, mealTime);
      setRecipes(response.recipes);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("레시피를 가져오는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">
              🍳
            </div>
            <h1 className="text-xl font-bold text-gray-900">냉장고 파먹기 AI</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8">
        {/* Intro Section */}
        <section className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">오늘 뭐 먹지?</h2>
          <p className="text-gray-600 leading-relaxed">
            냉장고 속에 있는 재료들을 알려주세요. AI 셰프가 당신의 식사 시간에 딱 맞는 3가지 레시피를 제안해 드립니다.
          </p>
        </section>

        {/* Input Section */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10 space-y-8">
          {/* Ingredient Input */}
          <IngredientInput 
            ingredients={ingredients} 
            onAdd={handleAddIngredient} 
            onRemove={handleRemoveIngredient} 
          />

          {/* Meal Time Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">식사 시간 선택</label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.values(MealTime)).map((time) => (
                <button
                  key={time}
                  onClick={() => setMealTime(time)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                    mealTime === time 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-[1.02]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSuggest}
            disabled={loading || ingredients.length === 0}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
              loading || ingredients.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI 셰프가 고민 중...
              </span>
            ) : (
              '레시피 추천 받기'
            )}
          </button>
        </section>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-10 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Results Section */}
        {recipes.length > 0 && (
          <section id="results" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">추천 레시피 TOP 3</h2>
              <span className="text-sm text-gray-500">{mealTime} 추천</span>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
            
            <div className="text-center py-10">
              <button 
                onClick={() => setRecipes([])}
                className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4"
              >
                결과 초기화하기
              </button>
            </div>
          </section>
        )}

        {/* Empty State / Initial View Footer */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm">재료를 입력하고 추천 버튼을 눌러보세요!</p>
          </div>
        )}
      </main>

      {/* Floating UI Elements or Footer can go here if needed */}
    </div>
  );
};

export default App;
