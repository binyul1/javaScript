import React from "react";
import { SubmitButton } from "../buttons/Button";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4 h-1/3">
        <div className="p-4 bg-white rounded w-[35%]">
          <div className="flex justify-between">
            <h2 className="font-bold ">DAILY REVENUE</h2>
            <h3 className="bg-green-800 rounded-4xl p-1 text-white">+12.5%</h3>
          </div>
          <h2 className="font-bold text-2xl text-blue-900">$1245.89</h2>
          <p className="font-light ">84 successful transactions today</p>
          <div className="flex gap-4 mt-4">
            <SubmitButton className="bg-blue-800 text-white font-bold">New Sale</SubmitButton>
            <SubmitButton className="bg-gray-500 text-blue-900 font-bold">Add Item</SubmitButton>
          </div>
        </div>
        <div className="w-[60%] bg-gray-300 p-4 rounded">Transaction Volume</div>
      </div>
      <div className="h-2/3 flex gap-4 ">
        <div className="bg-gray-300 p-2 h-full w-[60%]">Top-Selling Products</div>
        <div className="bg-gray-300 flex flex-col gap-4 w-[35%] p-2">
            <div className="bg-gray-200 p-2 "> System Health</div>
            <div className="bg-gray-200 p-2">Live Transation</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
