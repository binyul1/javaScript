// import { BrowserRouter, Route, Routes } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";

import LoginPage from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import NotFound from "../pages/errors/NotFound";
import CheckLogin from "../components/auth/CheckLogin";
import { AdminRouter } from "../lib/router/admin-router";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/forget_password", Component: ForgetPasswordPage },

  ...AdminRouter,

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
