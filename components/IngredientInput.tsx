
import React, { useState, KeyboardEvent } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (index: number) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        보유 중인 재료 입력 (엔터를 눌러 추가)
      </label>
      <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-orange-500 transition-all">
        {ingredients.map((ing, idx) => (
          <span 
            key={idx} 
            className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full"
          >
            {ing}
            <button 
              onClick={() => onRemove(idx)}
              className="ml-2 hover:text-orange-900 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ingredients.length === 0 ? "예: 계란, 대파, 두부..." : ""}
          className="flex-grow min-w-[120px] outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default IngredientInput;
