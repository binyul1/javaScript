import BrandDetailComponent from '@/components/Brand/BrandDetail';
import React from 'react'
//every component or file generated in next is by default a server component

interface IBrandDetailParams {
  params: Promise<{slug:string}>
  // searchParams: Promise<{page:string}>  
}

export default async function BrandDetail({params}: Readonly<IBrandDetailParams>) {
    //params data extract
    const paramsData = await params;
  return (
    <>
    Brand Details {paramsData.slug}
    <BrandDetailComponent />
    </>
  )
}
