import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    // Validate inputs
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing userId. Expected a string.' },
        { status: 400 }
      );
    }
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing productId. Expected a string.' },
        { status: 400 }
      );
    }

    // Fetch the user's cart
    const cart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      { userId }
    );

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart or user not found.' },
        { status: 404 }
      );
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item:any) => item.product._ref === productId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found in the cart.' },
        { status: 400 }
      );
    }

    // Remove the item from the cart
    const updatedCart = await sanityClient
      .patch(cart._id)
      .splice('items', itemIndex, 1) // Remove 1 item at the specified index
      .commit();

    return NextResponse.json(
      { message: 'Item removed from cart successfully.', cart: updatedCart },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in remove-cart API:', (error as Error).message);
    return NextResponse.json(
      { error: 'Server error occurred.' },
      { status: 500 }
    );
  }
}