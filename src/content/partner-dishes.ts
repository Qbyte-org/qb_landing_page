export type PartnerDish = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

/** A distinct collection for partner kitchens; source photographs are recorded beside the assets. */
export const partnerDishes: readonly PartnerDish[] = [
  {
    id: "party-rice-chicken",
    title: "A proper party plate.",
    category: "Rice & chicken",
    description: "Jollof, fried rice, peppered chicken and all the little extras. A plate worth coming back for.",
    image: "/images/food/partners/party-rice-chicken.webp",
    alt: "A white plate of jollof rice, fried rice, peppered chicken, plantain and salad",
  },
  {
    id: "rice-beans-stew",
    title: "Everyday comfort, served.",
    category: "Rice & beans",
    description: "Rice and beans with a rich pepper stew. Familiar food, made with your kitchen's own touch.",
    image: "/images/food/partners/rice-beans-stew.webp",
    alt: "Rice and beans on a white plate beside pepper stew with meat and boiled eggs",
  },
  {
    id: "beef-suya",
    title: "Straight from the grill.",
    category: "Suya & grills",
    description: "Spiced beef skewers finished with red onion. The kind of flavour that makes an evening.",
    image: "/images/food/partners/beef-suya.webp",
    alt: "Spiced beef suya skewers topped with red onion on a black serving pan",
  },
  {
    id: "small-chops",
    title: "A little of everything.",
    category: "Small chops",
    description: "Golden puff-puff, crisp spring rolls and savoury bites. Made for sharing, or keeping all to yourself.",
    image: "/images/food/partners/small-chops.webp",
    alt: "A serving tray of puff-puff, spring rolls, samosas, glazed chicken and dipping sauces",
  },
  {
    id: "grilled-tilapia",
    title: "Good food, simply done.",
    category: "Fish & seafood",
    description: "Grilled fish with a squeeze of lemon. Let your signature seasoning do the talking.",
    image: "/images/food/partners/grilled-tilapia.webp",
    alt: "Golden grilled tilapia fillets with lemon and a herb garnish on a white plate",
  },
  {
    id: "egusi-soup",
    title: "A taste of home.",
    category: "Local soups",
    description: "Rich egusi, leafy greens and tender meat. Your much-loved recipe deserves a place at more tables.",
    image: "/images/food/partners/egusi-soup.webp",
    alt: "Egusi soup with leafy greens and pieces of meat in a white serving bowl",
  },
];
