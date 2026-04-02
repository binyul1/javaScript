// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import Dashboard from "../pages/auth/Dashboard";


const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget_password", Component: ForgetPasswordPage },
  { path: "/dashboard", element: <Dashboard /> }
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
