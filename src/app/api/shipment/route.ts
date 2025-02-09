import { NextRequest, NextResponse } from 'next/server';

// Mock database (replace with actual database logic)
const shipments: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse request body
        const { userId, orderId, ...shipmentDetails } = body;

        // Save shipment details to the database
        const shipment = {
            id: shipments.length + 1,
            userId,
            orderId,
            ...shipmentDetails,
            createdAt: new Date().toISOString(),
        };
        shipments.push(shipment);

        return NextResponse.json({ message: 'Shipment saved successfully', shipment });
    } catch (error: any) {
        console.error('Error saving shipment:', error);
        return NextResponse.json(
            { message: 'Failed to save shipment', error: error.message },
            { status: 500 }
        );
    }
}
