import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all branches (with optional filter for active branches)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get('active') === 'true';

    const branches = await prisma.branch.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: [
        { province: 'asc' },
        { city: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch branches' },
      { status: 500 }
    );
  }
}

// POST - Create new branch
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, city, province, phone, mapsUrl, img, openingHours, isActive } = body;

    if (!name || !address || !city || !province) {
      return NextResponse.json(
        { error: 'Name, address, city, and province are required' },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.create({
      data: {
        name,
        address,
        city,
        province,
        phone: phone || null,
        mapsUrl: mapsUrl || null,
        img: img || null,
        openingHours: openingHours || null,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    console.error('Error creating branch:', error);
    return NextResponse.json(
      { error: 'Failed to create branch' },
      { status: 500 }
    );
  }
}

// PUT - Update branch
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, address, city, province, phone, mapsUrl, img, openingHours, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.update({
      where: { id },
      data: {
        name,
        address,
        city,
        province,
        phone,
        mapsUrl,
        img,
        openingHours,
        isActive
      }
    });

    return NextResponse.json(branch);
  } catch (error) {
    console.error('Error updating branch:', error);
    return NextResponse.json(
      { error: 'Failed to update branch' },
      { status: 500 }
    );
  }
}

// DELETE - Delete branch
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }

    await prisma.branch.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error('Error deleting branch:', error);
    return NextResponse.json(
      { error: 'Failed to delete branch' },
      { status: 500 }
    );
  }
}
