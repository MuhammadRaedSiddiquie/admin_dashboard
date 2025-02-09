
import { sanityClient } from '@/lib/sanity.client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try{
    const { userId } = await req.json();

    // Fetch existing cart
    const existingCart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      { userId }
    );

    if (existingCart) {
      // Clear all items from the cart
      const updatedCart = await sanityClient
        .patch(existingCart._id)
        .set({ items: [] })
        .commit();

        return NextResponse.json(updatedCart, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
              { error: 'Internal Server Error' },
              { status: 500 }
            );
  }
}