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

const foodRoot = "/images/food/pinterest";

export const mealPeriods: MealPeriod[] = ["Breakfast", "Lunch", "Dinner"];

// These are meal previews, not a live menu. Copy follows the local board photos.
export const restaurantDishes: RestaurantDish[] = [
  {
    id: "jollof",
    period: "Lunch",
    name: "Jollof, with all the extras.",
    note: "The lunchtime favourite",
    description: "Smoky jollof rice, pepper-glazed chicken and golden plantain. A little comfort for a very good lunch.",
    image: `${foodRoot}/jollof-chicken-plantain.webp`,
    imageAlt: "Jollof rice with glazed chicken and fried plantain on a black plate",
  },
  {
    id: "ofada",
    period: "Lunch",
    name: "Big flavour. Local roots.",
    note: "A taste of home",
    description: "Ofada rice, rich ayamase and an egg to bring it all together. Familiar flavours, made for your next craving.",
    image: `${foodRoot}/ofada-rice-ayamase.webp`,
    imageAlt: "Ofada rice served with ayamase stew and an egg",
  },
  {
    id: "pounded-yam",
    period: "Dinner",
    name: "Settle in. Dig in.",
    note: "Your evening comfort",
    description: "Yam, leafy vegetable soup and fish. The kind of proper meal that makes a long day feel shorter.",
    image: `${foodRoot}/pounded-yam-greens.webp`,
    imageAlt: "Yam served with leafy vegetable soup and fish",
  },
  {
    id: "pepper-soup",
    period: "Dinner",
    name: "A bowl of good warmth.",
    note: "Spice up your evening",
    description: "Assorted meat, fragrant herbs and a warming pepper broth. A comforting bowl with a little kick.",
    image: `${foodRoot}/assorted-meat-pepper-soup.webp`,
    imageAlt: "Assorted meat pepper soup with herbs in a white bowl",
  },
  {
    id: "akara",
    period: "Breakfast",
    name: "A golden start to your day.",
    note: "Breakfast, the local way",
    description: "Freshly fried akara with crisp edges and a soft centre. Simple, satisfying bean cakes for those early cravings.",
    image: `${foodRoot}/akara-bean-cakes.webp`,
    imageAlt: "Golden akara bean cakes on a white plate",
  },
  {
    id: "puff-puff",
    period: "Breakfast",
    name: "Little bites. Big joy.",
    note: "Something sweet to start",
    description: "Soft, golden puff-puff with a lightly crisp outside. Grab a few, share a few, and make a little moment of it.",
    image: `${foodRoot}/puff-puff.webp`,
    imageAlt: "A basket filled with golden puff-puff",
  },
];
