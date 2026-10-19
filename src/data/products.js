const products = [
  {
    id: 1,
    name: "Animal Liquid Chelated Calcium Kathcal Gold 5 liter",
    slug: "animal-liquid-chelated-calcium-kathcal-gold-5-liter",
    image: "/images/kathcal-gold-5-ltr.webp",
    price: 270,
    oldPrice: 320,
    category: "Calcium Supplements",
    categorySlug: "calcium-supplements",
    shortDescription:
      "Premium liquid calcium supplement for better animal nutrition and health.",
    description:
      "Kathcal Gold is a liquid calcium supplement designed for animal nutrition and daily calcium support.",
    benefits: [
      "Supports healthy bones",
      "Helps improve calcium intake",
      "Supports animal growth",
      "Useful for daily nutritional support",
    ],
    ingredients: [
      "Chelated Calcium",
      "Minerals",
      "Nutritional Supplements",
    ],
    dosage: "Use as directed by a veterinarian or animal nutrition expert.",
    suitableFor: [
      "Cattle",
      "Buffalo",
      "Dairy Animals",
    ],
    storage: "Store in a cool and dry place away from direct sunlight.",
    stock: 50,
    rating: 4.8,
    reviews: 24,
    isBestSelling: true,
  },

  {
    id: 2,
    name: "Chelated Liquid Calcium CH Brutcal 2 LTR",
    slug: "chelated-liquid-calcium-ch-brutcal-2-ltr",
    image: "/images/ch-brutcal-2-ltr.webp",
    price: 104,
    oldPrice: 130,
    category: "Calcium Supplements",
    categorySlug: "calcium-supplements",
    shortDescription:
      "Liquid calcium supplement for supporting animal nutrition.",
    description:
      "CH Brutcal is formulated to provide nutritional calcium support for animals.",
    benefits: [
      "Supports calcium nutrition",
      "Supports healthy bones",
      "Helps maintain animal health",
    ],
    ingredients: [
      "Chelated Calcium",
      "Minerals",
    ],
    dosage: "Use as directed by a veterinarian or animal nutrition expert.",
    suitableFor: [
      "Cattle",
      "Buffalo",
      "Dairy Animals",
    ],
    storage: "Store in a cool and dry place.",
    stock: 35,
    rating: 4.7,
    reviews: 18,
  },

  {
    id: 3,
    name: "Veterinary Anti Mastitis Powder UC Tonic 250 GM",
    slug: "veterinary-anti-mastitis-powder-uc-tonic-250-gm",
    image: "/images/uc-tonic-mastitis-powder-250-gm.webp",
    price: 180,
    oldPrice: 220,
    category: "Animal Wellness",
    categorySlug: "animal-wellness",
    shortDescription:
      "Veterinary nutritional support product for animal wellness.",
    description:
      "UC Tonic is a veterinary nutritional supplement designed for animal wellness support.",
    benefits: [
      "Supports animal wellness",
      "Nutritional support",
      "Helps maintain healthy animals",
    ],
    ingredients: [
      "Nutritional Ingredients",
      "Minerals",
      "Supplement Blend",
    ],
    dosage: "Use according to veterinary guidance.",
    suitableFor: [
      "Cattle",
      "Buffalo",
    ],
    storage: "Keep in a cool and dry place.",
    stock: 40,
    rating: 4.6,
    reviews: 15,
    isBestSelling: true,
  },

  {
    id: 4,
    name: "VITAMIN-H Biotin-H 100 ML",
    slug: "vitamin-h-biotin-h-100-ml",
    image: "/images/animal-feed-supplement.webp",
    price: 58,
    oldPrice: null,
    category: "Vitamin Supplements",
    categorySlug: "vitamin-supplements",
    shortDescription:
      "Vitamin and nutritional supplement for animals.",
    description:
      "Biotin-H provides nutritional vitamin support for animals.",
    benefits: [
      "Vitamin support",
      "Nutritional support",
      "Supports animal wellness",
    ],
    ingredients: [
      "Biotin",
      "Vitamins",
    ],
    dosage: "Use as directed.",
    suitableFor: [
      "Cattle",
      "Buffalo",
      "Livestock",
    ],
    storage: "Store in a cool and dry place.",
    stock: 60,
    rating: 4.5,
    reviews: 12,
  },

  {
    id: 5,
    name: "Veterinary Chelated Mineral Mixture CH ALMIN GOLD 20 KG",
    slug: "veterinary-chelated-mineral-mixture-ch-almin-gold-20kg",
    image: "/images/mineral-mixture.webp",
    price: 1540,
    oldPrice: 1736,
    category: "Mineral Supplements",
    categorySlug: "mineral-supplements",
    shortDescription:
      "Chelated mineral mixture for complete animal nutrition support.",
    description:
      "CH ALMIN GOLD is a mineral supplement designed to support animal nutritional requirements.",
    benefits: [
      "Supports mineral nutrition",
      "Helps maintain animal health",
      "Supports nutritional balance",
    ],
    ingredients: [
      "Chelated Minerals",
      "Trace Minerals",
    ],
    dosage: "Use according to veterinary or nutritional guidance.",
    suitableFor: [
      "Cattle",
      "Buffalo",
      "Dairy Animals",
    ],
    storage: "Store in a cool, dry and clean place.",
    stock: 20,
    rating: 4.9,
    reviews: 32,
    isBestSelling: true,
  },

  {
    id: 6,
    name: "Vitamin-H Biotin-H 500 ML",
    slug: "vitamin-h-biotin-h-500ml",
    image: "/images/veterinary-supplements.webp",
    price: 180,
    oldPrice: 220,
    category: "Vitamin Supplements",
    categorySlug: "vitamin-supplements",
    shortDescription:
      "Vitamin supplement for animal nutritional support.",
    description:
      "Biotin-H 500 ML provides nutritional vitamin support for animals.",
    benefits: [
      "Supports vitamin nutrition",
      "Supports animal wellness",
      "Daily nutritional support",
    ],
    ingredients: [
      "Biotin",
      "Vitamins",
    ],
    dosage: "Use as directed.",
    suitableFor: [
      "Cattle",
      "Buffalo",
    ],
    storage: "Store in a cool and dry place.",
    stock: 45,
    rating: 4.7,
    reviews: 20,
  },

  {
    id: 7,
    name: "225ml Kathsure",
    slug: "kathsure-225-ml",
    image: "/images/veterinary-feed-supplement.webp",
    price: 180,
    oldPrice: 220,
    category: "Feed Supplements",
    categorySlug: "feed-supplements",
    shortDescription:
      "Animal feed supplement for nutritional support.",
    description:
      "Kathsure is an animal feed supplement designed for nutritional support.",
    benefits: [
      "Supports animal nutrition",
      "Feed supplement",
      "Supports animal wellness",
    ],
    ingredients: [
      "Nutritional Ingredients",
      "Minerals",
    ],
    dosage: "Use as directed.",
    suitableFor: [
      "Cattle",
      "Buffalo",
    ],
    storage: "Store in a cool and dry place.",
    stock: 30,
    rating: 4.6,
    reviews: 14,
    isBestSelling: true,
  },

  {
    id: 8,
    name: "Veterinary Liver Tonic LEVET 500 ml",
    slug: "veterinary-liver-tonic-levet-500ml",
    image: "/images/veterinary-liver-tonic.webp",
    price: 180,
    oldPrice: 220,
    category: "Liver Tonics",
    categorySlug: "liver-tonics",
    shortDescription:
      "Veterinary liver tonic for animal nutritional support.",
    description:
      "LEVET is a veterinary liver tonic designed to provide nutritional support for animals.",
    benefits: [
      "Supports liver nutrition",
      "Supports animal wellness",
      "Nutritional support",
    ],
    ingredients: [
      "Liver Support Nutrients",
      "Vitamins",
      "Minerals",
    ],
    dosage: "Use according to veterinary guidance.",
    suitableFor: [
      "Cattle",
      "Buffalo",
      "Livestock",
    ],
    storage: "Store in a cool and dry place.",
    stock: 28,
    rating: 4.8,
    reviews: 27,
  },
];

export default products;