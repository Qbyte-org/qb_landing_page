// Editorial copy is kept apart from layout and animation code.

/** Copy and image references for AppPreviewPanel. */
export const appPreviewPanelCopy = {
  "yourEverydayFoodKit": "Your everyday food kit.",
  "theQuickBiteApp": "The QuickBite app",
  "srcImagesPhone2Png": "/images/phone2.png",
  "altQuickBiteAppHomeScreenShowingRestaurant": "QuickBite app home screen showing restaurant categories, a lunch offer, and a previous order",
  "aLittleLessEffortALotMore": "A little less effort. A lot more flavour.",
} as const;

/** Copy and image references for AppShowcase. */
export const appShowcaseCopy = {
  "yourNextBite": "Your next bite.",
  "rightHere": "Right here.",
  "theKitchensYouLoveTheOrderYou": "The kitchens you love. The order you know by heart. All in one place, ready for your next craving.",
  "ariaLabelExploreQuickBiteAppFeatures": "Explore QuickBite app features",
  "hrefWaitlist": "/waitlist",
  "getLaunchUpdates": "Get launch updates",
  "comingTo": "Coming to",
  "iOS": " iOS",
} as const;

/** Copy and image references for CategoriesDecor. */
export const categoriesDecorCopy = {
  "srcImagesFoodPinterestYamFishSauce": "/images/food/pinterest/yam-fish-sauce.webp",
  "srcImagesFoodPinterestOfadaEggPlantain": "/images/food/pinterest/ofada-egg-plantain.webp",
  "srcImagesFoodPinterestBerryWafflesWebp": "/images/food/pinterest/berry-waffles.webp",
} as const;

/** Copy and image references for CategoryCard. */
export const categoryCardCopy = {
  actionHref: "/restaurants",
  actionLabel: "Order now",
  timeLabel: "Ready",
  actionAriaLabel: (action: string, category: string) => `${action}: ${category}`,
  "quickBite": "QuickBite",
} as const;

/** Copy and image references for Categories. */
export const categoriesCopy = {
  mobileCategoryNames: ["Jollof Rice", "Swallow", "Snacks"] as readonly string[],
  "titleWhatAreYouCraving": "What are you craving?",
  "subtitleFromSmokyJollofToLateNight": "From smoky jollof to late-night small chops, pick a category and dig in.",
  "actionAriaLabelBrowseFormat": (value0: string | number) => `Browse ${value0} restaurants`,
} as const;

/** Copy and image references for CityCoverage. */
export const cityCoverageCopy = {
  "nowLiveIn": "Now live in ",
  "nigeriaNext": "Nigeria next",
  "subtitleWeStartedInIleIfeAnd": "We started in Ile-Ife and we're just getting going. Don't see your city yet? It's probably next on the map.",
  "nigeria": ", Nigeria",
  "neighbourhoodsWeCover": "Neighbourhoods we cover",
  "rollingOutAcrossNigeria": "Rolling out across Nigeria",
  "theseCitiesAreNextOnTheQuickBite": "These cities are next on the QuickBite map.",
} as const;

/** Copy and image references for CommunityBento. */
export const communityBentoCopy = {
  riderProgramImages: ["/menu/app-phone.svg", "/menu/company-card.svg"],
  defaultKitchenPrompt: "Own a kitchen or cook from home?",
  "growYourFoodBusinessWithQuickBite": "Grow your food business with QuickBite",
  "whetherYouRunABusyRestaurantOr": "Whether you run a busy restaurant or cook from home, reach more hungry customers and get paid reliably.",
  "eyebrowJoinTheEcosystem": "Join the ecosystem",
  "builtForPartnersRidersAnd": "Built for partners, riders, and",
  "everyCityWeReach": "every city we reach",
  "subtitleQuickBiteConnectsRestaurantsHomeKitchensRiders": "QuickBite connects restaurants, home kitchens, riders, and hungry neighbourhoods inside one fast-moving delivery network.",
  "srcImagesFoodPartnerKitchenWebp": "/images/food/partner-kitchen.webp",
  "altARestaurantKitchenPreparingFreshFood": "A restaurant kitchen preparing fresh food",
  "partnerHero": "Partner hero",
  "hrefPartners": "/partners",
  "becomeAPartner": "Become a partner",
  "partnerCTA": "Partner CTA",
  "rideWithUs": "Ride with us",
  "twoWaysToEarn": "Two ways to earn",
  "hrefRiders": "/riders",
  "riderProgram": "Rider program",
  "twoTierModel": "Two-tier model",
  "smartphoneOrNotEveryoneCanEarnWith": "Smartphone or not, everyone can earn with QuickBite.",
  "srcMenuCityPinSvg": "/menu/city-pin.svg",
  "liveCity": "Live city",
  "nigeria": ", Nigeria",
  "more": " more",
  "srcQuickbiteDeliveryBikeSvg": "/quickbite-delivery-bike.svg",
  "ridersPhoto": "Riders photo",
  "ourRiders": "Our riders",
  "srcLogoMarkLightSvg": "/logo-mark-light.svg",
  "expansionCities": "Expansion cities",
  "rollingOutAcrossNigeria": "Rolling out across Nigeria",
  "theseCitiesAreNextOnTheQuickBite": "These cities are next on the QuickBite map.",
} as const;

/** Copy and image references for FAQ. */
export const fAQCopy = {
  "fAQ": "FAQ",
  "goodQuestions": "Good questions.",
  "clearAnswers": "Clear answers.",
  "fromYourFirstOrderToYourNext": "From your first order to your next opportunity, here's what you need to know about QuickBite.",
  "stillHaveSomethingOnYourMind": "Still have something on your mind?",
  "hrefMailtoQuickbiteinfo01GmailCom": "mailto:quickbiteinfo01@gmail.com",
  "talkToOurTeam": "Talk to our team",
} as const;

/** Copy and image references for ForPartners. */
export const forPartnersCopy = {
  "routeStamp": "Route stamp",
  "partnerFlow": "Partner Flow",
  "qBLIVE": "QB / LIVE",
  "stage0": "Stage 0",
  "hrefQuickbiteDeliveryBikeSvg": "/quickbite-delivery-bike.svg",
  "moveOrder": "Move order",
  "routeApproved": "Route approved",
  "fromPrepTable": "From prep table",
  "to": "to ",
  "frontDoor": "front door.",
  "quickBiteTurnsEveryPartnerOrderIntoA": "QuickBite turns every partner order into a clean operational flow: prep, pack, dispatch and deliver without losing visibility.",
  "builtForRestaurantsThatWantFasterHandoffs": "Built for restaurants that want faster handoffs, clearer order status and customers who know exactly when food is arriving.",
  "hrefPartners": "/partners",
  "becomePartner": "Become partner",
} as const;

/** Copy and image references for ForRiders. */
export const forRidersCopy = {
  cleared: "CLEARED",
  standby: "STANDBY",
  selected: "SELECTED",
  open: "OPEN",
  "routeTag": "route tag",
  "riderManifest": "rider manifest",
  "qUICKBITEDISPATCH": "QUICKBITE DISPATCH",
  "value0730am": "07:30am",
  "assignedTo": "assigned to",
  "tool": "tool",
  "payout": "payout",
  "hrefRiders": "/riders",
  "ariaLabelApplyAsFormat": (value0: string | number) => `Apply as ${value0}`,
  "applyAs": "Apply as ",
  "dutyLogCompare": "duty log / compare",
  "riderPathLedger": "Rider path ledger",
  "aPPRIDERCHECKED": "APP RIDER CHECKED",
  "dISPATCHCHECKED": "DISPATCH CHECKED",
  "record": "record",
  "appRider": "App Rider",
  "dispatchPartner": "Dispatch Partner",
  "rideWith": "Ride with",
  "quickBite": "QuickBite.",
  "earnAsAnAppRiderOrCoordinate": "Earn as an app rider, or coordinate a dispatch team from one partner workspace. Pick the path that matches how you work.",
} as const;

/** Copy and image references for Hero. */
export const heroCopy = {
  "ariaLabelRealFoodDeliveredFormat": (value0: string | number) => `Real food, delivered ${value0}`,
  "realFood": "Real food,",
  "delivered": "delivered",
  "hrefRestaurants": "/restaurants",
  "orderNow": "Order now",
} as const;

/** Copy and image references for ProcessControls. */
export const processControlsCopy = {
  "ariaLabelPreviousProcessStep": "Previous process step",
  "ariaLabelNextProcessStep": "Next process step",
} as const;

/** Copy and image references for ProcessStepCopy. */
export const processStepCopyCopy = {
  "ourProcess": "Our process",
} as const;

/** Copy and image references for HowItWorks. */
export const howItWorksCopy = {
  "howItWorks": "How It Works",
  "hrefRestaurants": "/restaurants",
  "learnMore": "Learn more",
} as const;

/** Copy and image references for PassportLeafletMap. */
export const passportLeafletMapCopy = {
  "ariaLabelFormat": (value0: string | number, value1: string | number) => `${value0}, ${value1}`,
  "qB": "QB",
} as const;

/** Copy and image references for PopularRestaurants. */
export const popularRestaurantsCopy = {
  "titleTrendingRestaurants": "Trending restaurants",
  "subtitleVerifiedKitchensLovedByThousandsOf": "Verified kitchens loved by thousands of QuickBite customers.",
  "hrefRestaurants": "/restaurants",
  "seeAllRestaurants": "See all restaurants",
  "altFoodFromFormat": (value0: string | number) => `Food from ${value0}`,
  "deliveryFrom": "Delivery from",
} as const;

/** Copy and image references for AnimatedStamp. */
export const animatedStampCopy = {
  texture: "/images/footer-grain.svg",
  "entryStamp": "Entry stamp",
  "value072026": "07 / 2026",
} as const;

/** Copy and image references for RestaurantMembershipCard. */
export const restaurantMembershipCardCopy = {
  "ariaLabelDetailsForFormat": (value0: string | number) => `Details for ${value0}`,
  "hrefRestaurants": "/restaurants",
  "ariaLabelViewFormat": (value0: string | number) => `View ${value0}`,
  "view": "View",
  "avgOrder": " avg order",
  "ariaLabelOpenFormat": (value0: string | number) => `Open ${value0}`,
  "open": "Open",
} as const;

/** Copy and image references for QuickBiteDeliveryHub. */
export const quickBiteDeliveryHubCopy = {
  popular: "Popular",
  routeSelected: (name: string) => `${name} route selected`,
  "nigeriaRollout": "Nigeria rollout",
  "campusKitchensNeighbourhoodStaplesAndLateNight": "Campus kitchens, neighbourhood staples, and late-night favourites connected into one live delivery grid.",
  "aLaunchSimulationOfTheNextQuickBite": "A launch simulation of the next QuickBite delivery cluster, tuned for restaurants, riders, and city-wide demand.",
  "liveAndHealthy": "Live and healthy",
  "openingSoon": "Opening soon",
  "mostOrdered": "Most ordered",
  "fastLane": "Fast lane",
  "campusPick": "Campus pick",
  "dinnerRush": "Dinner rush",
  "freshDrop": "Fresh drop",
  "hrefRestaurants": "/restaurants",
  "altFoodFromFormat": (value0: string | number) => `Food from ${value0}`,
  "srcFoodPizzaSvg": "/food/pizza.svg",
  "srcFoodDrinksSvg": "/food/drinks.svg",
  "quickBiteDeliveryHub": "QuickBite Delivery Hub",
  "aLiveViewOfTheFoodNetwork": "A live view of the food network around you.",
  "exploreRestaurants": "Explore restaurants",
  "activeCity": "Active city",
  "labelAvgDelivery": "Avg delivery",
  "labelRestaurants": "Restaurants",
  "labelRidersOnline": "Riders online",
  "weather": "Weather",
  "serviceStatus": "Service status",
  "switchCity": "Switch city",
  "ariaLabelStylisedQuickBiteDeliveryNetworkInFormat": (value0: string | number) => `Stylised QuickBite delivery network in ${value0}`,
  "hrefQuickbiteDeliveryBikeSvg": "/quickbite-delivery-bike.svg",
  "liveDeliveryRoutes": "Live delivery routes",
  "discover": "Discover",
  "kitchens": " kitchens",
  "smartRoutingActive": "Smart routing active",
  "restaurantsUpdateAsRoutesAndNeighbourhoodDemand": "Restaurants update as routes and neighbourhood demand shift.",
} as const;

/** Copy and image references for QuickBiteDistrictExplorer. */
export const quickBiteDistrictExplorerCopy = {
  "districtFavourite": "District favourite",
  "fastRoute": "Fast route",
  "lunchRush": "Lunch rush",
  "nightBite": "Night bite",
  "popularStop": "Popular stop",
  "freshFind": "Fresh find",
  "nigeriaRollout": "Nigeria rollout",
  "exploreIleIfeAsConnectedFoodDistricts": "Explore Ile-Ife as connected food districts: campus cravings, neighbourhood kitchens, fast rider corridors, and late-night bite stops.",
  "previewTheNextQuickBiteFoodDistrictWith": "Preview the next QuickBite food district with launch corridors, restaurant clusters, and rider-ready neighbourhood routes.",
  "hrefRestaurants": "/restaurants",
  "altFoodFromFormat": (value0: string | number) => `Food from ${value0}`,
  "altFoodFromFormat2": (value0: string | number) => `Food from ${value0}`,
  "srcFoodSnacksSvg": "/food/snacks.svg",
  "srcFoodPizzaSvg": "/food/pizza.svg",
  "foodDistrictExplorer": "Food District Explorer",
  "browseTheCityByFoodDistrictsNot": "Browse the city by food districts, not by lists.",
  "placeholderSearchRestaurantsCuisineOrDistrictMood": "Search restaurants, cuisine, or district mood",
  "ariaLabelFormat": (value0: string | number) => `${value0} illustrated food district map`,
  "hrefQuickbiteDeliveryBikeSvg": "/quickbite-delivery-bike.svg",
  "m": "m",
  "deliveryCompleted": "Delivery completed",
  "activeDistrict": "Active district",
  "deliveryTime": "Delivery time",
  "min": " min",
  "ordersToday": "Orders today",
  "riderReroutesWhenYouChooseADistrict": "Rider reroutes when you choose a district",
  "restaurantDiscoveryStrip": "Restaurant discovery strip",
  "floatingFindsNear": "Floating finds near ",
  "exploreAll": "Explore all",
  "labelDistrictLandmarks": "District landmarks",
  "copySimplifiedBuildingsAndFoodCorridorsShow": "Simplified buildings and food corridors show where demand clusters.",
  "labelParksAndBoundaries": "Parks and boundaries",
  "copySoftMapZonesHelpTheExplorer": "Soft map zones help the explorer feel custom rather than like a plain map.",
  "labelRouteTexture": "Route texture",
  "copyWaterRoadsPinsAndRiderMotion": "Water, roads, pins and rider motion create a living city layer.",
} as const;

/** Copy and image references for QuickBitePassportHub. */
export const quickBitePassportHubCopy = {
  "preparingDestinationMap": "Preparing destination map",
  "food": "Food",
  "byCity": "by city.",
  "discoverFood": "Discover food",
  "byDestination": "by destination.",
  "hrefRestaurants": "/restaurants",
  "ariaLabelExploreKitchens": "Explore kitchens",
  "chooseAnAreaToExploreLocalKitchens": "Choose an area to explore local kitchens",
  "exploreKitchens": "Explore Kitchens",
  "destinations": "Destinations",
  "restaurants": " Restaurants",
} as const;

/** Copy and image references for RestaurantsExperience. */
export const restaurantsExperienceCopy = {
  "headingYourNextFoodRun": "Your next food run.",
  "supportingCopyJoinTheWaitlistForLaunchNews": "Join the waitlist for launch news and a first look at QuickBite in Ile-Ife.",
  "actionLabelJoinTheWaitlist": "Join the waitlist",
  "actionHrefWaitlist": "/waitlist",
} as const;

/** Copy and image references for Testimonials. */
export const testimonialsCopy = {
  "ariaLabelTheQuickBiteCommunity": "The QuickBite community",
  "community": "Community",
  "goodFood": "Good food.",
  "betterTogether": "Better together.",
  "fromCampusCravingsToTheKitchenCounter": "From campus cravings to the kitchen counter, meet the food lovers, local kitchens and riders behind the everyday food run.",
} as const;

/** Copy and image references for TrustBar. */
export const trustBarCopy = {
  "builtForEverydayCravings": "Built for everyday cravings",
  "browseNearbyKitchensOrderInSecondsAnd": "Browse nearby kitchens, order in seconds, and track every bite.",
} as const;
