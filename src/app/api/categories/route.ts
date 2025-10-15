import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cats = await prisma.menuCategory.findMany({ 
    include: { 
      items: true,
      subcategories: true 
    } 
  });
  return NextResponse.json(cats);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, title } = body as any;
  if (!id || !title) return NextResponse.json({ error: 'id and title required' }, { status: 400 });
  const created = await prisma.menuCategory.create({ data: { id: String(id), title: String(title) } });
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title } = body as any;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const updated = await prisma.menuCategory.update({ where: { id: String(id) }, data: { title: title ?? undefined } });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const deleted = await prisma.menuCategory.delete({ where: { id: String(id) } });
  return NextResponse.json(deleted);
}
