import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { SidebarTrigger } from '@/components/ui/sidebar'

const page = () => {
    return (
        <section className="w-full px-6 flex gap-6 flex-col items-start py-6">
            <div className="gap-6 flex items-center">
                <SidebarTrigger />
                <Breadcrumbs text={'Account'}></Breadcrumbs>
            </div>
            <div className="gap-1 flex w-full border-b-2 border-[#e9e9e9] items-start flex-col py-6">
                <h1 className="text-4xl font-bold">Profile:</h1>
                <p className="text-sm">Manage Account Details</p>
            </div>
            <div className='w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                <div className='col-span-1 gap-2 flex flex-col'>
                    <h1 className='text-xl font-medium px-1'>Username:</h1>
                    <h3 className='text-md font-medium text-[#64748b] border-2 border-[#e1e1e1] px-1 py-1 rounded-[8px]'>Muhammad Raed Siddiquie</h3>
                </div>
                <div className='col-span-1 gap-2 flex flex-col'>
                    <h1 className='text-xl font-medium px-1'>Phone:</h1>
                    <h3 className='text-md font-medium text-[#64748b] border-2 border-[#e1e1e1] px-1 py-1 rounded-[8px]'>+92 335290148</h3>
                </div>
                <div className='col-span-2 gap-2 flex flex-col'></div>
                <div className='col-span-2 gap-2 flex flex-col'>
                    <h1 className='text-xl font-medium px-1'>Email:</h1>
                    <h3 className='text-md font-medium text-[#64748b] border-2 border-[#e1e1e1] px-1 py-1 rounded-[8px]'>bhairaed636@gmail.com</h3>
                </div>
                <div className='col-span-2 gap-2 flex flex-col'></div>
                <div className='col-span-2 gap-2 flex flex-col'>
                    <h1 className='text-xl font-medium px-1'>Github:</h1>
                    <h3 className='text-md font-medium text-[#64748b] border-2 border-[#e1e1e1] px-1 py-1 rounded-[8px]'>MuhammadRaedSiddiquie
                    </h3>
                </div>
            </div>
        </section>
    )
}

export default page