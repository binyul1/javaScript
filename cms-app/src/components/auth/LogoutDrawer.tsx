import React from "react";
import { SubmitButton } from "../../components/buttons/Button";

import { CiCirclePlus } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
export const LogoutDrawer = () => {
  return (
    <div>
      {/*Dashboard logout Button */}
      <SubmitButton className="bg-blue-800 text-white text-left mb-6 flex items-center gap-2 hover:bg-blue-800/90">
        <CiCirclePlus /> Complete Sales
      </SubmitButton>
      <div className="flex flex-col gap-2">
        <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2">
          <IoIosHelpCircleOutline /> Help
        </SubmitButton>
        <SubmitButton className="hover:bg-white text-blue-800 text-left flex items-center gap-2">
          <IoIosLogOut /> Logout
        </SubmitButton>
      </div>
    </div>
  );
};
