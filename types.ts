
export enum MealTime {
  BREAKFAST = '아침',
  LUNCH = '점심',
  DINNER = '저녁'
}

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  steps: string[];
  difficulty: '쉬움' | '보통' | '어려움';
  time: string;
}

export interface RecipeResponse {
  recipes: Recipe[];
}
