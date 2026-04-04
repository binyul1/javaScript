// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import Dashboard from "../pages/auth/Dashboard";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layout/AdminLayout";
import AdminProduct from "../pages/auth/AdminProduct";
import AdminOrders from "../pages/auth/AdminOrders";
import AdminUsers from "../pages/auth/AdminUsers";
import AdminDashboard from "../pages/auth/AdminDashboard";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget_password", Component: ForgetPasswordPage },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProduct /> },
      { path: "users", element: <AdminUsers /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "*", element: <NotFound url="/admin" /> },
    ],
  },
  { path: "admin1", element: <Dashboard /> },

  //
  { path: "*", element: <NotFound /> },
]);

export default function RouterConfig() {
  //Declarative mode
  // return(
  //     <>
  //        <BrowserRouter>
  //         <Routes>
  //             <Route path="/" element={<LoginPage />} />
  //             <Route path="/forget_password" Component={ForgetPasswordPage} />
  //         </Routes>
  //        </BrowserRouter>
  //     </>
  // )
  return <RouterProvider router={router} />;
}
