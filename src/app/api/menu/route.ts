import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.menuCategory.findMany({ include: { items: true } });
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, price, desc, img, ingredients, steps, categoryId, categoryTitle } = body as any;

    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

    // Determine or create category
    let category = null;
    if (categoryId) {
      category = await prisma.menuCategory.findUnique({ where: { id: categoryId } });
      if (!category && categoryTitle) {
        category = await prisma.menuCategory.create({ data: { id: categoryId, title: String(categoryTitle) } });
      }
    } else {
      const slug = categoryTitle ? String(categoryTitle).toLowerCase().replace(/\s+/g, '-') : 'uncategorized';
      category = await prisma.menuCategory.upsert({
        where: { id: slug },
        update: {},
        create: { id: slug, title: categoryTitle ?? 'Uncategorized' },
      });
    }

    if (!category) return NextResponse.json({ error: 'category not found' }, { status: 400 });

    const itemId = id ?? String(Date.now());
    const created = await prisma.menuItem.create({
      data: {
        id: String(itemId),
        name: String(name),
        price: price ? String(price) : null,
        desc: desc ? String(desc) : null,
        img: img ? String(img) : null,
        ingredients: ingredients ? String(ingredients) : null,
        steps: steps ? String(steps) : null,
        categoryId: category.id,
      } as any,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create item', detail: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, price, desc, img, ingredients, steps, categoryId } = body as any;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const updateData: any = {};
    if (name !== undefined) updateData.name = String(name);
    if (price !== undefined) updateData.price = price ? String(price) : null;
    if (desc !== undefined) updateData.desc = desc ? String(desc) : null;
    if (img !== undefined) updateData.img = img ? String(img) : null;
    if (ingredients !== undefined) updateData.ingredients = ingredients ? String(ingredients) : null;
    if (steps !== undefined) updateData.steps = steps ? String(steps) : null;
    if (categoryId !== undefined) updateData.categoryId = String(categoryId);

    const updated = await prisma.menuItem.update({
      where: { id: String(id) },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update item', detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const deleted = await prisma.menuItem.delete({ where: { id: String(id) } });
    return NextResponse.json(deleted);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete item', detail: String(err) }, { status: 500 });
  }
}
