import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

// POST: Add or update an item in the cart
export async function POST(request: Request) {
  try {
    const { userId, productId, quantity, price, image } = await request.json();

    // Fetch existing cart
    const existingCart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      { userId }
    );

    if (existingCart) {
      // Check if the product already exists in the cart
      const existingItemIndex = existingCart.items.findIndex(
        (item:any) => item.product._ref === productId
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        existingCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if product doesn't exist
        existingCart.items.push({
          _key: Math.random().toString(36).substring(7),
          product: { _type: 'reference', _ref: productId },
          quantity,
          price,
          image,
        });
      }

      // Update cart in Sanity
      const updatedCart = await sanityClient
        .patch(existingCart._id)
        .set({ items: existingCart.items })
        .commit();

      return NextResponse.json(updatedCart, { status: 200 });
    } else {
      // Create new cart
      const newCart = {
        _type: 'cart',
        userId,
        items: [
          {
            _key: Math.random().toString(36).substring(7),
            product: { _type: 'reference', _ref: productId },
            quantity,
            price,
            image,
          },
        ],
      };

      const result = await sanityClient.create(newCart);
      return NextResponse.json(result, { status: 201 });
    }
  } catch (error) {
    console.error('Error in POST /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(request: Request) {
  try {
    const { userId, productId } = await request.json();

    // Fetch existing cart
    const existingCart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0]`,
      { userId }
    );

    if (existingCart) {
      // Remove the item from the cart
      const updatedItems = existingCart.items.filter(
        (item:any) => item.product._ref !== productId
      );

      // Update cart in Sanity
      const updatedCart = await sanityClient
        .patch(existingCart._id)
        .set({ items: updatedItems })
        .commit();

      return NextResponse.json(updatedCart, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET: Fetch the user's cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Fetch cart from Sanity
    const cart = await sanityClient.fetch(
      `*[_type == "cart" && userId == $userId][0] {
        items[] {
          _key,
          quantity,
          price,
          product-> {
            _id,
            title,
            price,
            images[0] {
              asset-> { url }
            }
          }
        }
      }`,
      { userId }
    );
    

    // Return items or an empty array if cart is not found
    return NextResponse.json(cart?.items || [], { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}