

export const filters = ["All kitchens", "Rice & grills", "Local soups", "Small chops"] as const;

export type KitchenFilter = (typeof filters)[number];

export const kitchenCategories: Record<string, Exclude<KitchenFilter, typeof filters[0]>> = {
  "Mama Put Kitchen": "Rice & grills",
  "Suya Republic": "Rice & grills",
  "The Swallow House": "Local soups",
  "Naija Bites & Snacks": "Small chops",
  "Ife Ofada Kitchen": "Rice & grills",
  "Pepper Soup Corner": "Local soups",
};

export const kitchenPhotoDescriptions: Record<string, string> = {
  "Mama Put Kitchen": "Jollof rice · Chicken · Plantain",
  "Suya Republic": "Pepper-glazed chicken · Grills",
  "The Swallow House": "Yam · Leafy vegetables · Fish",
  "Naija Bites & Snacks": "Golden puff-puff · Sweet bites",
  "Ife Ofada Kitchen": "Ofada rice · Ayamase · Egg",
  "Pepper Soup Corner": "Assorted meat · Pepper soup · Herbs",
};
