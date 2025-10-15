export type MenuItem = {
  id: number;
  name: string;
  price: string;
  desc: string;
  img: string;
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Cappuccino Rivea",
    price: "Rp35.000",
    desc: "Espresso lembut dengan busa susu krim dan sentuhan kayu manis.",
    img: "/menu/cappuccino.jpg",
  },
  {
    id: 2,
    name: "Signature Latte",
    price: "Rp32.000",
    desc: "Susunan rasa vanila dan karamel yang menenangkan.",
    img: "/menu/latte.jpg",
  },
  {
    id: 3,
    name: "Iced Brew",
    price: "Rp28.000",
    desc: "Cold brew pekat, sempurna untuk hari panas.",
    img: "/menu/iced-brew.jpg",
  },
  {
    id: 4,
    name: "Croissant Almond",
    price: "Rp22.000",
    desc: "Renyah, berlapis, dan diisi almond manis.",
    img: "/menu/croissant.jpg",
  },
];
