import { LuCog, LuShoppingBag, LuShoppingCart, LuUsers } from "react-icons/lu";
import logo from "../../assets/images/logo.jpg";
import { PageTitle } from "../../components/page-title/PageTitle";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <section className="w-full h-screen flex gap-5 bg-stone-50">
        <aside className="w-100 bg-gray-200 p-10 flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center w-full">
            <img src={logo} alt="logo" className="size-25 rounded-full bg-gray-400" />
            <PageTitle className="text-gray-950! text-shadow-lg">
              Admin Panel
            </PageTitle>
          </div>

          <nav>
            <ul className="flex flex-col gap-2">
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2">
                <a className=" flex gap-2 items-center" href="/admin">
                  <LuCog className="text-gray-700 size-6" />
                  Dashboard
                </a>
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2">
                <a href="/admin/products" className="flex gap-2 items-center">
                  <LuShoppingBag className="text-gray-700 size-6" />
                  Product
                </a>
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2 ">
                <a href="/admin/users" className="flex gap-2 items-center">
                  <LuUsers className="text-gray-700 size-6" />
                  Users
                </a>
              </li>
              <li className="rounded text-lg font-semibold shadow-lg w-full bg-gray-100 p-2 ">
                <a href="/admin/orders" className="flex gap-2 items-center">
                  <LuShoppingCart className="text-gray-700 size-6" />
                  Orders
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="w-full">
          {/* Chagned and dynamic */}
          <Outlet />
        </section>
      </section>
    </>
  );
}
