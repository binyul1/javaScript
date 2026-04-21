import { lazy } from "react";
import CheckLogin from "../../components/auth/CheckLogin";
import NotFound from "../../pages/errors/NotFound";

export const AdminLayout = lazy(async() => await import ("../../pages/layout/AdminLayout"))
import CreateOrder from "../../pages/order/CreateOrder";
import ListAllProducts from "../../pages/products/ListAllProducts";
import ProductDetail from "../../pages/products/ProductDetail";
import ProductProvider from "../provider/ProductProvider";
import ListOrder from "../../pages/order/ListOrder";



// eslint-disable-next-line react-refresh/only-export-components
export const AdminRouter = [
{ path: "/admin",
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
      { path: "order", element:<ListOrder />},
      { path: "order/create", element:<CreateOrder />},
      { path: "*", element: <NotFound url="/admin" /> },
    ],
  },
]