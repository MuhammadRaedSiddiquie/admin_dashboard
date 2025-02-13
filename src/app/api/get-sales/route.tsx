import { sanityClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        const order = await sanityClient.fetch(
            `*[_type == "order"]{
         _id,
        shippingDetails {
          name,
          email,
        },
        paymentDetails {
          amount,
        },
      }`
        );

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        console.log(order)
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}