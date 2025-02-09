import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId, delta } = body;

    // Validate inputs
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 });
    }
    if (typeof delta !== 'number') {
      return NextResponse.json({ error: 'Invalid delta' }, { status: 400 });
    }

    // Fetch the user's cart
    const cart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      { userId }
    );

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Find the item to update
    const itemIndex = cart.items.findIndex((item:any) => item.product._ref === productId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });
    }

    // Calculate the new quantity
    const updatedQuantity = cart.items[itemIndex].quantity + delta;

    // Ensure the quantity doesn't go below 1
    if (updatedQuantity < 1) {
      return NextResponse.json(
        { error: 'Quantity cannot be less than 1' },
        { status: 400 }
      );
    }

    // Update the cart
    const updatedCart = await sanityClient
      .patch(cart._id)
      .set({ [`items[${itemIndex}].quantity`]: updatedQuantity })
      .commit();

    return NextResponse.json({ cart: updatedCart }, { status: 200 });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}