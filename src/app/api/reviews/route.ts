import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch reviews (optionally filter by approved)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const approvedParam = searchParams.get('approved');

    let whereClause = {};
    if (approvedParam === 'true') {
      whereClause = { isApproved: true };
    } else if (approvedParam === 'false') {
      whereClause = { isApproved: false };
    }

    const reviews = await prisma.review.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST - Create new review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, comment } = body;

    if (!name || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        rating: parseInt(rating),
        comment,
        isApproved: false // Default not approved, need admin approval
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}

// PUT - Update review (approve/unapprove or edit)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, rating, comment, isApproved } = body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        name,
        rating: rating ? parseInt(rating) : undefined,
        comment,
        isApproved
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE - Delete review
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.review.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
