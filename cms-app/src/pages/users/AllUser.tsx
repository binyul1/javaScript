import { useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title/PageTitle";
import axiosInstance from "../../config/apiClient";
import type { IUserDetail } from "../../types/auth-type";
import { toast } from "sonner";
import { NavLink } from "react-router";
import { useAuth } from "../../lib/hook/auth-hook";

export const AllUser = () => {
  const [data, setData] = useState<Array<IUserDetail>>();
  const { loggedInUser } = useAuth();

  const getAllUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/user");
      setData(response.data);
    } catch (exceptation) {
      console.error(exceptation);
      toast.error("Error loading users....");
    }
  }, []);

  useEffect(() => {
    return () => {
      getAllUser();
    };
  }, [getAllUser]);

  return (
    <section className="bg-gray-100 min-h-screen p-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PageTitle className="text-teal-900">User Management</PageTitle>
          <button className="inline-flex items-center justify-center rounded-full bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900">
            Add New User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((user: IUserDetail, index: number) => (
                  <tr
                    key={user._id}
                    className={`transition-all duration-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.firstName + " " + user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{user.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold ${user.role === "admin" ? "bg-blue-200 text-blue-700" : "bg-teal-100 text-teal-700"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-wrap gap-2">
                        <NavLink
                          to={`/${loggedInUser?.role}/chat/${user._id}`}
                          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition duration-200 hover:scale-[1.03] hover:shadow-xl hover:from-teal-800 hover:to-cyan-700"
                        >
                          Chat
                        </NavLink>
                        <button className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition hover:border-teal-300 hover:text-teal-900 hover:shadow-sm">
                          Edit
                        </button>
                        <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
