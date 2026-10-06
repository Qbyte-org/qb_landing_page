export type MealPeriod = "Breakfast" | "Lunch" | "Dinner";

export type RestaurantDish = {
  id: string;
  period: MealPeriod;
  name: string;
  note: string;
  description: string;
  image: string;
  imageAlt: string;
};

const foodRoot = "/images/food/restaurant-hero";

export const mealPeriods: MealPeriod[] = ["Breakfast", "Lunch", "Dinner"];

// These are meal previews, not a live menu. Each has its own plated photograph.
export const restaurantDishes: RestaurantDish[] = [
  {
    id: "jollof",
    period: "Lunch",
    name: "Jollof, with all the extras.",
    note: "The lunchtime favourite",
    description: "Smoky jollof rice and golden grilled chicken, finished with a little green garnish. A little comfort for a very good lunch.",
    image: `${foodRoot}/jollof-chicken.webp`,
    imageAlt: "Jollof rice topped with grilled chicken wings on a white serving plate",
  },
  {
    id: "ofada",
    period: "Lunch",
    name: "Big flavour. Local roots.",
    note: "A taste of home",
    description: "Ofada rice, rich ayamase, peppered fish and golden plantain. Familiar flavours, made for your next craving.",
    image: `${foodRoot}/ofada-fish-plantain.webp`,
    imageAlt: "Ofada rice, ayamase, peppered fish and fried plantain on a leaf-lined plate",
  },
  {
    id: "pounded-yam",
    period: "Dinner",
    name: "Settle in. Dig in.",
    note: "Your evening comfort",
    description: "Soft pounded yam and a generous bowl of leafy vegetable soup. The kind of proper meal that makes a long day feel shorter.",
    image: `${foodRoot}/pounded-yam-vegetables.webp`,
    imageAlt: "Pounded yam on a white plate beside a bowl of leafy vegetable soup",
  },
  {
    id: "pepper-soup",
    period: "Dinner",
    name: "A bowl of good warmth.",
    note: "Spice up your evening",
    description: "Assorted meat, fragrant herbs and a warming pepper broth. A comforting bowl with a little kick.",
    image: `${foodRoot}/assorted-pepper-soup.webp`,
    imageAlt: "A white bowl of assorted meat pepper soup with herbs and a piece of yam",
  },
  {
    id: "akara",
    period: "Breakfast",
    name: "A golden start to your day.",
    note: "Breakfast, the local way",
    description: "Freshly fried akara with crisp edges and a soft centre. Simple, satisfying bean cakes for those early cravings.",
    image: `${foodRoot}/akara-breakfast.webp`,
    imageAlt: "Golden akara bean cakes on a white plate beside bowls of pap",
  },
  {
    id: "puff-puff",
    period: "Breakfast",
    name: "Little bites. Big joy.",
    note: "Something sweet to start",
    description: "Soft, golden puff-puff with a lightly crisp outside. Grab a few, share a few, and make a little moment of it.",
    image: `${foodRoot}/puff-puff-bites.webp`,
    imageAlt: "Fresh golden puff-puff in a serving tray",
  },
];
