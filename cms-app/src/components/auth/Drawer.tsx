import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiCashRegisterFill } from "react-icons/pi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaShuttleVan } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { SubmitButton } from "../buttons/Button";
export const Drawer = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/*Dashboard user profile and settings */}
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <MdOutlineDashboard className="size-6" /> Dashboard
      </SubmitButton>
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <PiCashRegisterFill className="size-6" /> Register
      </SubmitButton>
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <MdOutlineInventory2 className="size-6" /> Inventory
      </SubmitButton>
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <CiMenuBurger className="size-6" /> Orders
      </SubmitButton>
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <FaShuttleVan className="size-6"    /> Vendors
      </SubmitButton>
      <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2 bg-gray-300 ">
        <IoPeopleSharp className="size-6" /> Customers
      </SubmitButton>
    </div>
  );
};
