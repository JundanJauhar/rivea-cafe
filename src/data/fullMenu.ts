export type MenuItem = {
  id: string;
  name: string;
  price?: string;
  desc?: string;
  img?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

// Full transcription (best-effort) of items in the attached menu images.
// Items or prices marked with [CHECK] need verification against original file.
export const fullMenu: MenuCategory[] = [
  {
    id: 'rice-bowl-series',
    title: 'Rice Bowl / Nasi',
    items: [
      { id: 'rb1', name: 'Rice Bowl Special', price: 'Rp25.000', desc: 'Nasi + topping spesial', img: '/menu/rice-bowl.jpg' },
      { id: 'rb2', name: "Chicken Katsu Rice Bowl", price: 'Rp32.000', desc: 'Chicken katsu, nasi, saus', img: '/menu/katsu-rice.jpg' },
      { id: 'rb3', name: 'Fried Rice Series - Original', price: 'Rp28.000', desc: 'Nasi goreng special', img: '/menu/fried-rice.jpg' },
    ],
  },

  {
    id: 'special-chicken',
    title: 'Special Chicken',
    items: [
      { id: 'sc1', name: 'Chicken Teriyaki', price: 'Rp35.000', desc: 'Chicken teriyaki with veggies', img: '/menu/chicken-teriyaki.jpg' },
      { id: 'sc2', name: 'Chicken Katsu (Set)', price: 'Rp38.000', desc: 'Crispy katsu + rice', img: '/menu/katsu.jpg' },
    ],
  },

  {
    id: 'special-breakfast',
    title: 'Special Breakfast & Light Meals',
    items: [
      { id: 'lb1', name: 'Croissant Almond', price: 'Rp22.000', desc: 'Almond croissant', img: '/menu/croissant.jpg' },
      { id: 'lb2', name: 'Pancake / Waffle [CHECK]', price: 'Rp28.000', desc: 'Sweet breakfast item', img: '/menu/pancake.jpg' },
    ],
  },

  {
    id: 'noodle-series',
    title: 'Noodle Series',
    items: [
      { id: 'n1', name: 'Ramen / Mie Kuah [CHECK]', price: 'Rp30.000', desc: 'Pilihan kuah atau goreng', img: '/menu/noodle.jpg' },
      { id: 'n2', name: 'Noodle Goreng Special', price: 'Rp32.000', desc: 'Mie goreng spesial', img: '/menu/noodle-fried.jpg' },
    ],
  },

  {
    id: 'seafood-series',
    title: 'Seafood Series',
    items: [
      { id: 'sf1', name: 'Seafood Platter', price: 'Rp55.000', desc: 'Campuran seafood goreng / panggang', img: '/menu/seafood.jpg' },
      { id: 'sf2', name: 'Fish & Chips', price: 'Rp45.000', desc: 'Classic fish and chips', img: '/menu/fish-chips.jpg' },
    ],
  },

  {
    id: 'vegetables-soup',
    title: 'Vegetables & Soup',
    items: [
      { id: 'vs1', name: 'Soup of the Day', price: 'Rp20.000', desc: 'Sup hangat pilihan koki', img: '/menu/soup.jpg' },
      { id: 'vs2', name: 'Vegetable Platter', price: 'Rp24.000', desc: 'Sayuran segar & saus', img: '/menu/veg.jpg' },
    ],
  },

  {
    id: 'kids-series',
    title: 'Kids Series',
    items: [
      { id: 'k1', name: 'Kids Meal - Mini Burger', price: 'Rp18.000', desc: 'Menu kecil untuk anak', img: '/menu/kids-burger.jpg' },
      { id: 'k2', name: 'Kids Pasta', price: 'Rp18.000', desc: 'Porsi kecil pasta', img: '/menu/kids-pasta.jpg' },
    ],
  },

  {
    id: 'espresso-based',
    title: 'Espresso Based',
    items: [
      { id: 'e1', name: 'Espresso Single', price: 'Rp15.000', desc: 'Single shot espresso', img: '/menu/espresso.jpg' },
      { id: 'e2', name: 'Espresso Double', price: 'Rp18.000', desc: 'Double shot', img: '/menu/espresso-double.jpg' },
      { id: 'e3', name: 'Americano', price: 'Rp20.000', desc: 'Espresso + hot water', img: '/menu/americano.jpg' },
      { id: 'e4', name: 'Manual Brew', price: 'Rp25.000 - Rp35.000 [CHECK]', desc: 'Single origin manual brew', img: '/menu/manual-brew.jpg' },
    ],
  },

  {
    id: 'signature-coffee',
    title: 'Rivea Signature Coffee & Others',
    items: [
      { id: 'rc1', name: 'Rivea Signature', price: 'Rp30.000', desc: 'Signature blend', img: '/menu/coffee2.jpg' },
      { id: 'rc2', name: 'Signature Mocktail / Ice', price: 'Rp35.000', desc: 'Signature non-alcoholic mocktail', img: '/menu/mocktail.jpg' },
    ],
  },

  {
    id: 'milk-based',
    title: 'Milk Based & Refreshers',
    items: [
      { id: 'mb1', name: 'Latte - Signature', price: 'Rp32.000', desc: 'Milk + espresso + syrup', img: '/menu/latte.jpg' },
      { id: 'mb2', name: 'Milk Based - Caramel / Vanilla', price: 'Rp30.000', desc: 'Various flavored milk coffees', img: '/menu/milk2.jpg' },
      { id: 'mb3', name: 'Iced Brew', price: 'Rp28.000', desc: 'Cold brew', img: '/menu/iced-brew.jpg' },
    ],
  },

  {
    id: 'others-desserts',
    title: 'Others / Desserts',
    items: [
      { id: 'o1', name: 'Dessert - Cake Slice [CHECK]', price: 'Rp28.000', desc: 'Slice of cake - flavor varies', img: '/menu/cake.jpg' },
      { id: 'o2', name: 'Ice Cream / Others', price: 'various', desc: 'Dessert & sides', img: '/menu/icecream.jpg' },
    ],
  },
];

export default fullMenu;
