
import { GoogleGenAI, Type } from "@google/genai";
import { MealTime, RecipeResponse } from "../types";

export const generateRecipes = async (ingredients: string[], mealTime: MealTime): Promise<RecipeResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `냉장고에 있는 다음 재료들을 활용하여 ${mealTime} 식사로 적합한 요리 레시피 3가지를 제안해주세요. 
  재료: ${ingredients.join(', ')}
  식사 시간: ${mealTime}
  
  각 레시피는 제목, 설명, 필요한 재료 목록, 조리 순서를 포함해야 합니다. 
  제시된 재료 외에 소금, 설탕, 간장 등 기본적인 양념은 냉장고에 있다고 가정해도 좋습니다.
  사용자의 재료를 최대한 활용하는 방향으로 제안해주세요.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recipes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                recipeName: { type: Type.STRING },
                description: { type: Type.STRING },
                ingredients: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                steps: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                difficulty: { type: Type.STRING },
                time: { type: Type.STRING }
              },
              propertyOrdering: ["recipeName", "description", "ingredients", "steps", "difficulty", "time"]
            }
          }
        },
        required: ["recipes"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{"recipes": []}');
    return result as RecipeResponse;
  } catch (error) {
    console.error("JSON Parsing Error:", error);
    throw new Error("레시피 생성 중 오류가 발생했습니다.");
  }
};
