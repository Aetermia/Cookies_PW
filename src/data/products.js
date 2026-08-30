export const categories = {
  cookies: {
    id: "cookies",
    title: "Cookies",
  },
  frozen: {
    id: "frozen",
    title: "Cookies Congeladas",
  },
}

export const products = [
  // --- Cookies ---
  {
    id: 1,
    name: "Classic Choco Chip",
    description: "La clásica con trozos generosos de chocolate semi-amargo.",
    price: 3500,
    category: "cookies",
    image: "/cookies-classic.svg",
  },
  {
    id: 2,
    name: "Double Chocolate",
    description: "Masa de cacao intenso con chips de chocolate blanco y negro.",
    price: 4000,
    category: "cookies",
    image: "/cookies-double.svg",
  },
  {
    id: 3,
    name: "Oatmeal Raisin",
    description: "Avena tostada con pasas maceradas y un toque de canela.",
    price: 3800,
    category: "cookies",
    image: "/cookies-oatmeal.svg",
  },

  // --- Cookies Congeladas ---
  {
    id: 4,
    name: "Frozen Nutella",
    description: "Rellena de Nutella, horneada al momento y servida tibia.",
    price: 4500,
    category: "frozen",
    image: "/cookies-frozen-nutella.svg",
  },
  {
    id: 5,
    name: "Frozen Red Velvet",
    description: "Red velvet con queso crema reservada para hornear en casa.",
    price: 4200,
    category: "frozen",
    image: "/cookies-frozen-redvelvet.svg",
  },
  {
    id: 6,
    name: "Frozen Matcha",
    description: "Masa de matcha con chispas de chocolate blanco, lista para hornear.",
    price: 4600,
    category: "frozen",
    image: "/cookies-frozen-matcha.svg",
  },
]
