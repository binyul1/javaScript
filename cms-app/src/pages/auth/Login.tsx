import { useEffect } from "react";
import { LoginForm } from "../../components/auth/LoginForm";
import { PageTitle } from "../../components/page-title/PageTitle";
import { useAuth } from "../../lib/hook/auth-hook";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      navigate(`/${loggedInUser.role}`);
    }
  }, []);

  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-100">
      {/*react fragment to wrap the content of the component */}
      <div className="bg-white flex flex-col gap-10 w-4xl shadow-lg rounded-md p-10">
        <PageTitle pageTitle="Login Page" />

        <LoginForm />
      </div>
    </section>
  );
}
