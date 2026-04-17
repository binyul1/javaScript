// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layout/AdminLayout";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget_password", Component: ForgetPasswordPage },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <>Admin Dashboard</> },
      { path: "products", element: <>Admin Products</> },
      { path: "*", element: <NotFound url="/admin" /> },
    ],
  },

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
