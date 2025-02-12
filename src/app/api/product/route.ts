import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.title || !formData.price || !formData.category || !formData.images) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare the product data for Sanity
    const product = {
      _type: 'product',
      id: formData.id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      discountPercentage: formData.discountPercentage || 0, // Default to 0 if not provided
      rating: formData.rating || 0, // Default to 0 if not provided
      tags: formData.tags || [], // Default to empty array if not provided
      stock: formData.stock || 0, // Default to 0 if not provided
      brand: formData.brand || '', // Default to empty string if not provided
      availabilityStatus: formData.availabilityStatus || 'in-stock', // Default to 'in-stock' if not provided
      images: formData.images.map((image: string) => ({
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image, // Assuming formData.images is an array of Sanity asset IDs
        },
      })),
    };

    // Create the product in Sanity
    const createdProduct = await sanityClient.create(product);

    // Return success response
    return NextResponse.json(
      { success: true, product: createdProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();


    const existingProduct = await sanityClient.fetch(
      `*[_type == "product"]`
    );


  } catch (error) {
    console.error('Error in DELETE /api/product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const Product = await sanityClient.fetch(
      `*[_type == "product"]{
        id,
        title,
        description,
        images[]{
            _key,
            asset->{url} // This fetches the image URL from the asset reference
            },
            category,
            price,
            discountPercentage,
            rating,
            tags[],
            stock,
            brand,
        availabilityStatus
    }`
    );
    return NextResponse.json(Product || [], { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/get-product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}