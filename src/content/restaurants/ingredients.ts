export type DishIngredient = { src: string; name: string; rotation: number };

const water: DishIngredient = { src: "/images/food/utensils/water-glass.webp", name: "Glass of drinking water", rotation: 0 };

function utensils(kind: "fork-knife" | "spoon-fork", rotation = 0): DishIngredient {
  return { src: `/images/food/utensils/${kind}-pair.webp`, name: kind === "fork-knife" ? "Dining fork and knife" : "Soup spoon and dining fork", rotation };
}

/** A glass of water and complete photographed cutlery accompany each meal. */
export const dishIngredients: Record<string, readonly [DishIngredient, DishIngredient]> = {
  jollof: [water, utensils("fork-knife", 8)],
  ofada: [water, utensils("fork-knife", 6)],
  "pounded-yam": [water, utensils("spoon-fork", 6)],
  "pepper-soup": [water, utensils("spoon-fork", 10)],
  akara: [water, utensils("fork-knife", 8)],
  "puff-puff": [water, utensils("fork-knife", 4)],
};
