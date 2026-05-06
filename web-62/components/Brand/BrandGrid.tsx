'use client';

import Link from "next/link";
import Image from "next/image";
import { BrandListGrid } from "@/components/Brand/BrandListGrid";

export default function BrandGrid() {
  const brandData = [{}];
  return (
    <div className="mx-auto w-full px-4 py-5 sm:px-6 lg:px-8 flex flex-col gap-5">
      <div className="w-full bg-amber-900/10 p-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900 sm:text-3xl">
          Brand Picked for you{" "}
        </h2>
        <Link href={"/brand"} className="text-lg font-semibold text-teal-900">
          <span className="text-amber-900 hover:text-amber-700 ">
            View All Brands{" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-10 inline-block"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.5"
                  d="M5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L5.46967 17.4697ZM6.53033 18.5303L18.5303 6.53033L17.4697 5.46967L5.46967 17.4697L6.53033 18.5303Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  d="M9 6H18V15"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg *:bg-gray-100 md:grid-cols-8">
        <BrandListGrid />
      </div>
    </div>
  );
}
