export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Rose Silk Slip Dress",
    price: 149.00,
    description: "Flowing pure mulberry silk midi dress with delicate shoulder straps and a gentle blush drape.",
    category: "Clothing",
    image: "/products/rose-silk-dress.jpg"
  },
  {
    id: 2,
    name: "Pastel Cashmere Knit",
    price: 189.00,
    description: "Ultra-soft premium Mongolian cashmere sweater in a warm blush hue with ribbed cuffs.",
    category: "Clothing",
    image: "/products/pastel-cashmere-knit.jpg"
  },
  {
    id: 3,
    name: "Dusty Rose Trench Coat",
    price: 249.00,
    description: "Tailored water-repellent cotton twill trench coat with signature storm flap and horn buttons.",
    category: "Clothing",
    image: "/products/dusty-trench-coat.jpg"
  },
  {
    id: 4,
    name: "Blush Leather Tote Bag",
    price: 165.00,
    description: "Handcrafted Italian full-grain leather everyday tote with polished gold-tone hardware accents.",
    category: "Accessories",
    image: "/products/blush-leather-tote.jpg"
  },
  {
    id: 5,
    name: "Velvet Pearl Mules",
    price: 125.00,
    description: "Pointed-toe dusty rose velvet mules finished with handcrafted pearl embellishments.",
    category: "Accessories",
    image: "/products/velvet-pearl-mules.jpg"
  },
  {
    id: 6,
    name: "Blossom Wool Fringe Scarf",
    price: 79.00,
    description: "Generously sized lightweight merino wool scarf with artisanal woven fringe borders.",
    category: "Accessories",
    image: "/products/blossom-wool-scarf.jpg"
  }
];
