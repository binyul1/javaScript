// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layout/AdminLayout";
import CheckLogin from "../components/auth/CheckLogin";
import ListAllProducts from "../pages/products/ListAllProducts";
import ProductDetail from "../pages/products/ProductDetail";
import ProductProvider from "../lib/provider/ProductProvider";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget_password", Component: ForgetPasswordPage },
  {
    path: "/admin",
    element: (
      <CheckLogin allowed={"admin"}>
        <AdminLayout />
      </CheckLogin>
    ),
    children: [
      { index: true, element: <>Admin Dashboard</> },

      //CRUD operations
      {
        path: "products",
        element: (
          <ProductProvider>
            <ListAllProducts />
          </ProductProvider>
        ),
      },
      {
        path: "product/:productId/detail",
        element: (
          <ProductProvider>
            <ProductDetail />
          </ProductProvider>
        ),
      },
      { path: "*", element: <NotFound url="/admin" /> },
    ],
  },

  {
    path: "/user",
    element: (
      <CheckLogin allowed={"user"}>
        <>User Dashboard</>
      </CheckLogin>
    ),
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
