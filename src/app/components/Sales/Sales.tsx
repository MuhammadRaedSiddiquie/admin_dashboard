'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
} from '@/components/ui/card';

const Sales = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<any>(null);
    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/get-sales`);
            if (!response.ok) {
                throw new Error("Failed to fetch order details");
            }
            const data = await response.json();
            console.log(data)
            setOrder(data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrderDetails();
    }, [])
    return (

        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made {order?.length} sales this month.</CardDescription>
            </CardHeader>
            {loading ? <div className='h-[50vh] flex items-center justify-center bg-[url("/loader.gif")] bg-contain bg-center'></div> :
            <CardContent className='h-[50vh] overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
                <div className='space-y-8'>
                    {
                        order ? order.map((items: any, value: any) => (
                            <div key={value} className='flex items-center'>
                                <Avatar className='h-9 w-9'>
                                    <AvatarImage
                                        src={`https://api.slingacademy.com/public/sample-users/${value}.png`}
                                        alt='Avatar'
                                    />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className='ml-4 space-y-1'>
                                    <p className='text-sm font-medium leading-none'>{items.shippingDetails.name}</p>
                                    <p className='text-sm text-muted-foreground'>
                                        {items.shippingDetails.email}
                                    </p>
                                </div>
                                <div className='ml-auto font-semibold'>+{items.paymentDetails.amount}$</div>
                            </div>
                        )) : <></>
                    }
                </div>
            </CardContent>
            }
        </Card>

    )
}

export default Sales