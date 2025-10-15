import { PrismaClient } from '@prisma/client';
import fullMenu from '../src/data/fullMenu';
import { menuItems } from '../src/data/menuItems';
import galleryDefault, { employees, areaPhotos } from '../src/data/gallery';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.galleryItem.deleteMany();

  // Insert categories and their items from fullMenu
  for (const cat of fullMenu) {
    await prisma.menuCategory.create({
      data: {
        id: cat.id,
        title: cat.title,
        items: {
          create: cat.items.map((it: any) => ({
            id: it.id,
            name: it.name,
            price: it.price ?? null,
            desc: it.desc ?? null,
            img: it.img ?? null,
          })),
        },
      },
    });
  }

  // Insert menuItems (flat list) if any
  for (const it of menuItems) {
    // ensure id as string
    const id = String(it.id);
    // Attach to a default category if none exists
    let defaultCat = await prisma.menuCategory.findUnique({ where: { id: 'flat-items' } });
    if (!defaultCat) {
      defaultCat = await prisma.menuCategory.create({ data: { id: 'flat-items', title: 'Flat Items' } });
    }

    await prisma.menuItem.upsert({
      where: { id },
      update: {
        name: it.name,
        price: it.price,
        desc: it.desc,
        img: it.img,
        categoryId: defaultCat.id,
      },
      create: {
        id,
        name: it.name,
        price: it.price,
        desc: it.desc,
        img: it.img,
        categoryId: defaultCat.id,
      },
    });
  }

  // Gallery
  const allGallery = [...employees, ...areaPhotos];
  for (const g of allGallery) {
    await prisma.galleryItem.create({ data: { id: g.id, title: g.title ?? null, caption: g.caption ?? null, img: g.img } });
  }

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
