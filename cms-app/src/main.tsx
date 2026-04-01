import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css"; //importing the CSS file for styling
//import App from "./App.tsx"; //importing the App component from App.tsx
import LoginPage from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import "./assets/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
    <ForgetPassword />
  </StrictMode>,
);
