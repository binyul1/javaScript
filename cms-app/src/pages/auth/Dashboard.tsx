import { Drawer } from "../../components/auth/Drawer";
import { LogoutDrawer } from "../../components/auth/LogoutDrawer";
import { FaRegBell } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { SubmitButton } from "../../components/buttons/Button";
import DashboardContent from "../../components/auth/DashboardContent";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-300 h-screen p-4 flex flex-col justify-between">
        {/*Dashboard left sidebar */}
        <div className="pb-6">
          {/*Dashboard logo and title */}
          <h1 className="text-2xl text-[#312E81]">Precision POS</h1>
          <p className="text-[#312E81] font-light">Executive Terminal</p>
        </div>
        <div>{/*Dashboard navigation Buttons */}</div>
        <Drawer />
        <LogoutDrawer />
      </div>
      <div className="w-3/4 h-screen bg-[#d2c0e9] p-8 flex flex-col gap-8">
        {/*Dashboard Right sidebar */}
        <div className="flex justify-between">
          <div>
            {/*Dashboard header */}
            <h1 className="">Sales OverView</h1>
            <p>Monitoring real-time performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center bg-gray-200 p-2 rounded-2xl">
              <SubmitButton>
                <FaRegBell className="size-4" />
              </SubmitButton>
              <SubmitButton>
                <CiSettings className="size-4" />
              </SubmitButton>
            </div>
            <SubmitButton>
              <IoMdPerson className="size-5" />
            </SubmitButton>
          </div>
        </div>

        <div className="">{/*Dashboard content */}
            <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
