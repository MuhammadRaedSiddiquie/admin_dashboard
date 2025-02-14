import { sanityClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";


// Handle GET request
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
        return NextResponse.json(
            { error: "sessionId is required" },
            { status: 400 }
        );
    }

    try {
        // Retrieve Stripe session
        // const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Fetch order details from Sanity
        const order = await sanityClient.fetch(
            `*[_type == "order" && orderId == $sessionId][0]{
        _id,
        orderId,
        userId,
        products[] {
          productId,
          quantity,
          price,
          product->{
            title,
            images[0]{
            asset->{
          url
            }
            }
          },
            
        },
        shippingDetails,
        shippingRate,
        paymentDetails,
        _createdAt
      }`,
            { sessionId }
        );

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}