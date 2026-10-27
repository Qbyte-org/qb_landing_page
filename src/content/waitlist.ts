export const waitlistFields = {
  name: { name: "name", label: "Name", type: "text", autoComplete: "name", maxLength: 100 },
  email: { name: "email", label: "Email address", type: "email", autoComplete: "email", maxLength: 254 },
  phone: { name: "phone", label: "Nigerian phone number", type: "tel", autoComplete: "tel", maxLength: 32 },
} as const;

export const waitlistCopy = {
  brand: "QuickBite",
  background: ["Coming", "soon!"],
  heading: "Join our waitlist!",
  introduction: "Be first to know when QuickBite starts delivering fast, fresh meals from local favourites near you.",
  location: "Launching in Ile-Ife",
  homeHref: "/",
  homeLabel: "Home",
  homeAriaLabel: "Back to the home page",
  emailHref: "mailto:quickbiteinfo01@gmail.com",
  emailLabel: "Email us",
  emailAriaLabel: "Send QuickBite a message",
  contactHelp: "Enter an email address or a Nigerian mobile number. You can also provide both.",
  submit: "Join Waitlist",
  newsletterSubmit: "Join the waitlist",
  submitting: "Joining...",
  submitAriaLabel: "Join the QuickBite waitlist",
  submittingAriaLabel: "Joining the QuickBite waitlist",
  honeypotLabel: "Website",
  consent: {
    introduction: "I agree to receive QuickBite launch updates and have read the",
    policyLabel: "Privacy Notice",
    policyHref: "/legal/privacy",
    ending: ".",
  },
  result: {
    shareHeading: "Bring your people.",
    shareDescription: "Food is better when your roommates are on it too.",
    shareLabel: "Share on WhatsApp",
    // The pre-filled WhatsApp message; the invite link is added on its own line below it.
    shareText: [
      "Your favorite meals delivered instantly.",
      "A premium food delivery service is launching soon.",
      "Join the waitlist today for exclusive early access.",
      "Secure your place among the first to experience it.",
    ].join("\n"),
    copyLabel: "Copy invite link",
    copiedLabel: "Link copied",
    inviteHref: "https://www.quickbiteltd.org/waitlist",
    eyebrow: "The QuickBite waitlist",
    closeAriaLabel: "Close waitlist result",
    referenceLabel: "Request reference:",
    contactLabel: "Contact our team",
    communityHeading: "Join the community of quickbitters.",
    communityLabel: "Join on WhatsApp",
    communityHref: "https://chat.whatsapp.com/H6omHZTPhf8KSm9fLLqmGz?mode=gi_t",
  },
} as const;

/** Copy for the /waitlist page, in scroll order. */
export const waitlistPage = {
  location: "Coming soon to Ile-Ife",
  greeting: "Ṣé o ti jẹun?",
  greetingTranslation: "Have you eaten?",
  headline: "Ife's food, at your door.",
  introduction: "QuickBite is the food delivery app starting in Ile-Ife. Join the waitlist and get invited in the first wave.",
  emailLabel: "Email address",
  submit: "Get early access",
  assurances: ["Free to join", "Invites go out in waves", "Takes ten seconds"],
  plate: {
    heading: "From jollof to burgers.",
    description: "Local favourites and late-night cravings, from the buka down the road to the pizza spot your friends swear by. We're signing kitchens now, and the waitlist gets a say in which ones.",
    groups: [
      { label: "Local favourites", dishes: ["Jollof rice", "Ofada & ayamase", "Pounded yam & efo", "Pepper soup", "Akara", "Puff-puff"] },
      { label: "Campus cravings", dishes: ["Pizza", "Burgers", "Fried chicken", "Fries"] },
    ],
    // The centre bowl, then the dishes around it clockwise from the top.
    // vessel: "plate" and "saucer" are drawn cream ceramic, "dark-bowl" a drawn dark bowl,
    // and "own" means the photo already has its plate or box.
    centre: { name: "Jollof rice with chicken and plantain", src: "/images/food/plate/jollof-bowl.webp" },
    dishes: [
      { name: "Fries", src: "/images/food/modern-cutouts/fries.webp", vessel: "own" },
      { name: "Burger", src: "/images/food/modern-cutouts/burger.webp", vessel: "plate" },
      { name: "Pounded yam & efo", src: "/images/food/hero-cutouts/pounded-yam.webp", vessel: "own" },
      { name: "Pepper soup", src: "/images/food/hero-cutouts/pepper-soup.webp", vessel: "dark-bowl" },
      { name: "Fried chicken", src: "/images/food/modern-cutouts/fried-chicken.webp", vessel: "plate" },
      { name: "Akara", src: "/images/food/hero-cutouts/akara.webp", vessel: "saucer" },
      { name: "Ofada & ayamase", src: "/images/food/hero-cutouts/ofada.webp", vessel: "plate" },
      { name: "Pizza", src: "/images/food/modern-cutouts/pizza.webp", vessel: "plate" },
      { name: "Puff-puff", src: "/images/food/hero-cutouts/puff-puff.webp", vessel: "saucer" },
    ],
  },
  app: {
    heading: "From craving to your door.",
    note: "Screens from our current test build. Some details will change before launch.",
    steps: [
      { title: "Find something for your budget.", body: "Budget-Friendly keeps the good-value plates in one place, for the end of the month.", src: "/images/app/browse.webp", alt: "Budget-Friendly list in the QuickBite app with Puff-Puff at ₦700, Goat Meat Pepper Soup at ₦3,000 and Ofada Rice at ₦3,500" },
      { title: "Set your price first.", body: "Under ₦1k, ₦1k to 2k, all the way past ₦10k. Filter before you fall for a plate.", src: "/images/app/filters.webp", alt: "Filters sheet with price ranges from Under 1k to Above 10k" },
      { title: "See the plate before you pay.", body: "A real photo, the price, and what else is close by. Then add it to your cart.", src: "/images/app/dish.webp", alt: "Dish page for Ofada Rice and Ofada Stew at ₦3,500 with an Add to cart button" },
      { title: "Watch it move.", body: "Placed, confirmed, on the way, delivered. You see each step as it happens.", src: "/images/app/track.webp", alt: "Order tracking showing Order placed, Order confirmed, Out for delivery and Delivered" },
    ],
  },
  waves: {
    heading: "Doors open in waves.",
    description: "We're opening a little at a time, so every order is looked after. The earlier you join, the earlier your invite lands.",
    items: [
      { label: "Wave 1", detail: "Early signups" },
      { label: "Wave 2", detail: "As more kitchens join" },
      { label: "Everyone", detail: "Public launch" },
    ],
    communityHeading: "Help pick the kitchens.",
    communityDescription: "Vote in our WhatsApp community on which Ife spots we bring on first.",
    communityLabel: "Join the community",
    nominateHeading: "Know a great spot?",
    nominateLabel: "Nominate a kitchen",
    nominateHref: "mailto:quickbiteinfo01@gmail.com?subject=Kitchen%20suggestion%20for%20QuickBite",
  },
  founder: {
    quote: "Happiness can be as simple as a warm meal arriving at your doorstep.",
    name: "Adedokun Daniel",
    role: "Co-founder, QuickBite",
    image: "/images/team/white-ninja.webp",
  },
  faq: {
    heading: "Good questions.",
    items: [
      { question: "When does QuickBite launch?", answer: "Coming soon. We're opening in Ile-Ife first, and people on the waitlist hear before anyone else and get invited in waves." },
      { question: "Where will you deliver?", answer: "We're starting in Ile-Ife. We'll share the exact areas with the waitlist before the first wave opens." },
      { question: "Does joining cost anything?", answer: "No. Joining is free, and you can leave the list whenever you like." },
      { question: "What do you do with my email?", answer: "We send launch updates and your invite. Nothing else. The Privacy Notice has the details." },
    ],
  },
  final: {
    heading: "Be in the first wave.",
    description: "One email, and you're on the list.",
  },
  partners: { prompt: "Run a kitchen?", label: "Partner with us", href: "/partners" },
  riders: { prompt: "Have a bike?", label: "Ride with us", href: "/riders" },
  sticky: "Get early access",
};

export const waitlistResultMessages = {
  success: { title: "You’re on the list!", action: "Lovely, thank you" },
  invalid: { title: "Let’s check those details.", action: "Back to the form" },
  unavailable: { title: "We can’t take signups just yet.", action: "Close" },
  error: { title: "We couldn’t confirm your signup.", action: "Back to the form" },
  "rate-limited": { title: "Give it a moment.", action: "Got it" },
};

export const waitlistRetryMessage = (seconds: number) => `Please wait ${seconds} seconds before trying again.`;
