export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Rose Silk Slip Dress",
    image: "/products/rose-silk-dress.jpg",
    description: "Flowing pure mulberry silk midi dress with delicate shoulder straps and a gentle blush drape.",
    price: "$149.00",
  },
  {
    id: "prod-2",
    name: "Pastel Cashmere Knit",
    image: "/products/pastel-cashmere-knit.jpg",
    description: "Ultra-soft premium Mongolian cashmere sweater in a warm blush hue with ribbed cuffs.",
    price: "$189.00",
  },
  {
    id: "prod-3",
    name: "Dusty Rose Trench Coat",
    image: "/products/dusty-trench-coat.jpg",
    description: "Tailored water-repellent cotton twill trench coat with signature storm flap and horn buttons.",
    price: "$249.00",
  },
  {
    id: "prod-4",
    name: "Blush Leather Tote Bag",
    image: "/products/blush-leather-tote.jpg",
    description: "Handcrafted Italian full-grain leather everyday tote with polished gold-tone hardware accents.",
    price: "$165.00",
  },
  {
    id: "prod-5",
    name: "Velvet Pearl Mules",
    image: "/products/velvet-pearl-mules.jpg",
    description: "Pointed-toe dusty rose velvet mules finished with handcrafted pearl embellishments.",
    price: "$125.00",
  },
  {
    id: "prod-6",
    name: "Blossom Wool Fringe Scarf",
    image: "/products/blossom-wool-scarf.jpg",
    description: "Generously sized lightweight merino wool scarf with artisanal woven fringe borders.",
    price: "$79.00",
  },
];
