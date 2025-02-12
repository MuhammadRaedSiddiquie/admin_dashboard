'use client';
import React, { useState } from 'react';
import { FiSidebar } from 'react-icons/fi';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import useProductStore from '../stores/useProductStore';
import useSyncProduct from '../hooks/useSyncProduct';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { Button, SelectRoot, SelectValueText } from '@chakra-ui/react';
import { Box, createListCollection } from "@chakra-ui/react"
import { nanoid } from 'nanoid';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sanityClient } from '@/lib/sanity.client';
import { SidebarTrigger } from '@/components/ui/sidebar';

const ProductsPage = () => {
    const { items } = useProductStore();
    useSyncProduct();

    const [formData, setFormData] = useState({
        id: nanoid(),
        title: '',
        description: '',
        price: '',
        category: '',
        discountPercentage: '',
        rating: '',
        tags: [] as string[],
        stock: '',
        brand: '',
        availabilityStatus: 'in-stock',
        images: [] as File[],
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFormData((prevData) => ({ ...prevData, images: acceptedFiles }));
        },
        multiple: true,
        maxSize: 4 * 1024 * 1024,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Prevent negative values for price and stock
        if ((name === 'price' || name === 'stock') && parseFloat(value) < 0) {
            alert(`${name} cannot be negative.`);
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(',').map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price || !formData.category || !formData.images) {
            alert('Please fill all required fields.');
            return;
        }

        try {
            // Upload images to Sanity and get their asset IDs
            const imageAssets = await Promise.all(
                formData.images.map(async (file) => {
                    const asset = await sanityClient.assets.upload('image', file);
                    return asset._id;
                })
            );

            const productData = {
                ...formData,
                images: imageAssets,
                price: parseFloat(formData.price),
                discountPercentage: parseFloat(formData.discountPercentage),
                rating: parseFloat(formData.rating),
                stock: parseInt(formData.stock),
            };

            const response = await axios.post('/api/product', productData);
            if (response.data.success) {
                alert('Product saved successfully!');
                setFormData({
                    id: nanoid(),
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                    discountPercentage: '',
                    rating: '',
                    tags: [],
                    stock: '',
                    brand: '',
                    availabilityStatus: 'in-stock',
                    images: [],
                });
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product. Please try again.');
        }
    };
    const [sort, setSort] = useState<string[]>(["default"]);
    const [sorted, setSorted] = useState(items);
    const categories = createListCollection({
        items: [
            { label: "Beauty", value: "beauty" },
            { label: "Automobile", value: "automobile" },
            { label: "Tech", value: "tech" },
            { label: "Decoration", value: "decoration" },
            { label: "Apparel", value: "apparel" },
        ],
    })
    const productSorting = () => {
        console.log(sort, 'sort')
        switch (sort[0]) {
            case 'default':
                setSorted(items)
                break;
            case 'beauty':
                const newItems = items.filter((items: any) => items.category === 'beauty')
                console.log(newItems)
                setSorted(newItems)
                break;
        }
    }

    return (
        <section className="w-full px-6 flex gap-6 flex-col items-start py-6">
            <div className="gap-6 flex items-center">
                <SidebarTrigger />
                <Breadcrumbs text={'Products'} />
            </div>
            <div className="gap-1 flex w-full border-b-2 border-[#e9e9e9] items-start flex-col py-6">
                <h1 className="text-4xl font-bold">Products</h1>
                <p className="text-sm">Manage products</p>
            </div>
            <div className="w-full rounded-[8px] flex items-start justify-between border-0 border-[#e9e9e9] py-2 px-2">
                <div className='flex gap-2'>
                    <Select onValueChange={(value) => setSort([value])}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="apparel">Clothing</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                        </SelectContent>
                    </Select>

                    <button onClick={() => productSorting()} className='bg-black text-sm text-white rounded-[5px] py-[10px] px-[20px]'>Filter</button>
                </div>
                <Dialog>
                    <DialogTrigger className="bg-black text-white px-4 py-2 rounded-md font-semibold">
                        Add Product +
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Product</DialogTitle>
                        </DialogHeader>
                        <Card className="h-[80vh] mt-6 p-6 bg-white rounded-lg shadow-sm overflow-y-scroll">
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* File Upload Section */}
                                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                                        <label className="cursor-pointer flex flex-col items-center space-y-2">
                                            <Upload className="w-10 h-10 text-gray-400" />
                                            <span className="text-sm text-gray-600">Drag 'n' drop files here, or click to select</span>
                                            <span className="text-xs text-gray-400">You can upload up to 4 files (4MB each)</span>
                                            <input type="file" className="hidden" {...getInputProps()} />
                                        </label>
                                        {/* Display uploaded file names */}
                                        {formData.images.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-700">Selected files:</p>
                                                <ul className="text-xs text-gray-500">
                                                    {formData.images.map((file, index) => (
                                                        <li key={index}>{file.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter product name" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <Select onValueChange={handleCategoryChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select categories" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="electronics">Electronics</SelectItem>
                                                    <SelectItem value="clothing">Clothing</SelectItem>
                                                    <SelectItem value="accessories">Accessories</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <Input type="number" min="0" name="price" value={formData.price} onChange={handleChange} required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                                        <Input name="tags" value={formData.tags.join(', ')} onChange={handleTagsChange} placeholder="Enter tags" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                                        <Input name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                                        <Input type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} placeholder="Enter stock" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Availability Status</label>
                                        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, availabilityStatus: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select availability status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="in-stock">In Stock</SelectItem>
                                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                                <SelectItem value="pre-order">Pre-Order</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="text-right">
                                        <Button type="submit" className="bg-black text-white px-4 py-2 rounded-md font-medium">
                                            Add Product
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='w-full rounded-[8px] flex flex-col items-center border-2 border-[#e7e7e7]'>
                <ul className="w-full flex justify-between items-center border-b-2 border-secondaryCol py-2">
                    <li className="montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base">
                        Image
                    </li>
                    <li className="montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base">
                        Name
                    </li>
                    <li className="montserrat-semibold w-[15%] flex items-center justify-center text-secondaryCol text-base">
                        Category
                    </li>
                    <li className="montserrat-semibold w-[40%] flex items-center justify-center text-secondaryCol text-base">
                        Description
                    </li>
                    <li className="montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base">
                        Price
                    </li>
                    <li className="montserrat-semibold w-[5%] flex items-center justify-center text-secondaryCol text-base">
                        ...
                    </li>
                </ul>
                <ul className="w-full flex flex-col justify-start items-center [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {items?.length > 0 ? (
                        sorted?.map((product: any) => (
                            <li
                                key={product.product?.id || product?.id}
                                className="w-full min-h-[100px] flex items-center justify-between border-b-2 border-[#e3e3e3]"
                            >
                                <div className="flex flex-col items-center justify-center gap-4 w-[10%] h-[80px]">
                                    <Image
                                        src={product?.images[0]?.asset?.url || product?.image}
                                        alt={product?.title || product?.title}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 w-[20%] h-[80px]">
                                    <h3 className="montserrat-medium text-center text-primaryCol px-2 text-base">{product?.title}</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 w-[15%] h-[80px]">
                                    <h3 className="montserrat-medium text-center text-primaryCol text-base">{product?.category}</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 w-[40%] h-[80px]">
                                    <p className="montserrat-medium text-center text-primaryCol px-2 text-base line-clamp-2">{product?.description}</p>
                                </div>
                                <div className="flex items-center justify-center w-[10%]">
                                    <h3 className="text-black montserrat-semibold text-center text-lg">
                                        ${(product.price).toFixed(2)}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-center w-[5%]">
                                    <button
                                        className="text-black text-2xl font-bolder text-center"
                                    //   onClick={() => removeFromCart(userId, product.product?._id)}
                                    >
                                        ...
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="montserrat-bold text-primaryCol text-xl">Your Cart Is Empty</p>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default ProductsPage;