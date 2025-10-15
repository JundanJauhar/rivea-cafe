const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Starbucks-style menu...');

  // 1. BEVERAGES - Main Category
  const beverages = await prisma.menuCategory.upsert({
    where: { id: 'beverages' },
    update: {},
    create: {
      id: 'beverages',
      title: 'Beverages',
    },
  });

  // Beverages Subcategories
  await prisma.menuCategory.upsert({
    where: { id: 'espresso-beverages' },
    update: {},
    create: {
      id: 'espresso-beverages',
      title: 'Espresso Beverages',
      parentId: 'beverages',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 'brewed-coffee' },
    update: {},
    create: {
      id: 'brewed-coffee',
      title: 'Brewed Coffee',
      parentId: 'beverages',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 'blended-beverages' },
    update: {},
    create: {
      id: 'blended-beverages',
      title: 'Blended Beverages',
      parentId: 'beverages',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 'others' },
    update: {},
    create: {
      id: 'others',
      title: 'Others',
      parentId: 'beverages',
    },
  });

  // 2. FOOD - Main Category
  await prisma.menuCategory.upsert({
    where: { id: 'food' },
    update: {},
    create: {
      id: 'food',
      title: 'Food',
    },
  });

  // Food Subcategories
  await prisma.menuCategory.upsert({
    where: { id: 'core-menu' },
    update: {},
    create: {
      id: 'core-menu',
      title: 'Core Menu',
      parentId: 'food',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 'reserve-menu' },
    update: {},
    create: {
      id: 'reserve-menu',
      title: 'Reserve Menu',
      parentId: 'food',
    },
  });

  // 3. MERCHANDISE - Main Category
  await prisma.menuCategory.upsert({
    where: { id: 'merchandise' },
    update: {},
    create: {
      id: 'merchandise',
      title: 'Merchandise',
    },
  });

  // Merchandise Subcategories
  await prisma.menuCategory.upsert({
    where: { id: 'seasonal' },
    update: {},
    create: {
      id: 'seasonal',
      title: 'Seasonal',
      parentId: 'merchandise',
    },
  });

  await prisma.menuCategory.upsert({
    where: { id: 'bulk-order' },
    update: {},
    create: {
      id: 'bulk-order',
      title: 'Bulk Order',
      parentId: 'merchandise',
    },
  });

  console.log('✅ Categories and subcategories created!');

  // ========== SAMPLE MENU ITEMS ==========

  // ESPRESSO BEVERAGES
  const espressoItems = [
    { id: 'caffe-latte', name: 'Caffè Latte', price: '42000', desc: 'Espresso shots combined with steamed milk and a light layer of foam' },
    { id: 'cappuccino', name: 'Cappuccino', price: '42000', desc: 'Dark, rich espresso with a thick layer of creamy foam' },
    { id: 'caffe-mocha', name: 'Caffè Mocha', price: '48000', desc: 'Rich espresso with bittersweet mocha sauce and steamed milk' },
    { id: 'caramel-macchiato', name: 'Caramel Macchiato', price: '50000', desc: 'Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with caramel drizzle' },
    { id: 'americano', name: 'Caffè Americano', price: '38000', desc: 'Rich, full-bodied espresso with hot water' },
    { id: 'flat-white', name: 'Flat White', price: '45000', desc: 'Ristretto shots with velvety steamed milk' },
  ];

  for (const item of espressoItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'espresso-beverages',
      },
    });
  }

  // BREWED COFFEE
  const brewedItems = [
    { id: 'pike-place', name: 'Pike Place Roast', price: '32000', desc: 'Smooth and balanced with subtle notes of cocoa and toasted nuts' },
    { id: 'dark-roast', name: 'Dark Roast', price: '32000', desc: 'Bold and robust with a smoky finish' },
    { id: 'cold-brew', name: 'Cold Brew', price: '40000', desc: 'Slow-steeped for 20 hours, smooth and naturally sweet' },
    { id: 'iced-coffee', name: 'Iced Coffee', price: '35000', desc: 'Freshly brewed and served over ice' },
  ];

  for (const item of brewedItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'brewed-coffee',
      },
    });
  }

  // BLENDED BEVERAGES (FRAPPUCCINO)
  const blendedItems = [
    { id: 'java-chip-frappuccino', name: 'Java Chip Frappuccino', price: '52000', desc: 'Mocha sauce and Frappuccino chips blended with coffee and ice' },
    { id: 'caramel-frappuccino', name: 'Caramel Frappuccino', price: '50000', desc: 'Coffee blended with caramel syrup, ice and topped with whipped cream' },
    { id: 'vanilla-cream-frappuccino', name: 'Vanilla Cream Frappuccino', price: '48000', desc: 'Vanilla bean and ice blended with milk' },
    { id: 'matcha-frappuccino', name: 'Matcha Cream Frappuccino', price: '52000', desc: 'Premium matcha green tea blended with milk and ice' },
    { id: 'chocolate-cream-frappuccino', name: 'Chocolate Cream Frappuccino', price: '50000', desc: 'Rich chocolate blended with milk and ice' },
  ];

  for (const item of blendedItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'blended-beverages',
      },
    });
  }

  // OTHERS (Tea, Chocolate, etc)
  const otherItems = [
    { id: 'teavana-green-tea', name: 'Teavana Green Tea Latte', price: '45000', desc: 'Premium matcha green tea blended with milk' },
    { id: 'chai-tea-latte', name: 'Chai Tea Latte', price: '45000', desc: 'Black tea infused with cinnamon, clove and other spices' },
    { id: 'hot-chocolate', name: 'Hot Chocolate', price: '42000', desc: 'Steamed milk with mocha sauce and whipped cream' },
    { id: 'iced-chocolate', name: 'Iced Chocolate', price: '42000', desc: 'Mocha sauce with milk over ice' },
  ];

  for (const item of otherItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'others',
      },
    });
  }

  // CORE MENU (Food)
  const coreMenuItems = [
    { id: 'chicken-sandwich', name: 'Chicken Sandwich', price: '38000', desc: 'Grilled chicken with fresh vegetables' },
    { id: 'ham-cheese-croissant', name: 'Ham & Cheese Croissant', price: '35000', desc: 'Butter croissant with ham and cheese' },
    { id: 'chocolate-croissant', name: 'Chocolate Croissant', price: '32000', desc: 'Flaky croissant with chocolate filling' },
    { id: 'blueberry-muffin', name: 'Blueberry Muffin', price: '28000', desc: 'Moist muffin with fresh blueberries' },
    { id: 'banana-walnut-loaf', name: 'Banana Walnut Loaf', price: '30000', desc: 'Sweet banana bread with walnuts' },
  ];

  for (const item of coreMenuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'core-menu',
      },
    });
  }

  // RESERVE MENU (Premium Food)
  const reserveMenuItems = [
    { id: 'tiramisu', name: 'Tiramisu', price: '45000', desc: 'Classic Italian dessert with coffee and mascarpone' },
    { id: 'chocolate-cake', name: 'Chocolate Cake', price: '42000', desc: 'Rich chocolate cake with chocolate ganache' },
    { id: 'cheesecake', name: 'New York Cheesecake', price: '48000', desc: 'Creamy cheesecake with graham crust' },
  ];

  for (const item of reserveMenuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'reserve-menu',
      },
    });
  }

  // SEASONAL (Merchandise)
  const seasonalItems = [
    { id: 'tumbler-2024', name: 'Seasonal Tumbler 2024', price: '250000', desc: 'Limited edition tumbler for this season' },
    { id: 'mug-collection', name: 'Mug Collection', price: '180000', desc: 'Collectible ceramic mug' },
  ];

  for (const item of seasonalItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'seasonal',
      },
    });
  }

  // BULK ORDER
  const bulkOrderItems = [
    { id: 'coffee-traveler', name: 'Coffee Traveler', price: '150000', desc: 'Freshly brewed coffee, serves 12' },
    { id: 'box-of-coffee', name: 'Box of Coffee', price: '200000', desc: 'Assorted coffee selection for events' },
  ];

  for (const item of bulkOrderItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        categoryId: 'bulk-order',
      },
    });
  }

  console.log('✅ All menu items created!');
  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log('   3 Main Categories: Beverages, Food, Merchandise');
  console.log('   9 Subcategories');
  console.log('   30+ Menu Items');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
