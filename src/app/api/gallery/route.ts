import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.galleryItem.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, title, caption, img, branch } = body as any;
  if (!id || !img) return NextResponse.json({ error: 'id and img required' }, { status: 400 });
  const created = await prisma.galleryItem.create({ 
    data: { 
      id: String(id), 
      title: title ?? null, 
      caption: caption ?? null, 
      img: String(img),
      branch: branch ?? null
    } 
  });
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title, caption, img, branch } = body as any;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const updated = await prisma.galleryItem.update({ 
    where: { id: String(id) }, 
    data: { 
      title: title ?? undefined, 
      caption: caption ?? undefined, 
      img: img ?? undefined,
      branch: branch ?? undefined
    } 
  });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const deleted = await prisma.galleryItem.delete({ where: { id: String(id) } });
  return NextResponse.json(deleted);
}
