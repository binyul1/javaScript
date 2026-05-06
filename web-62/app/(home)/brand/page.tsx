import {BrandListGrid} from "@/components/Brand/BrandListGrid";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brand Details",
  description: "This is the brand details page.",
  openGraph: {
    title: "Brand Details",
    description: "This is the brand details page.",
  },
  twitter:{
    title:"Brand Details",
    description:"This is the brand details page.",
  }
};
export default function BrandList() {
  return (
    <>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg *:bg-gray-100 md:grid-cols-8">
        <BrandListGrid />
      </div>
    </>
  );
}
