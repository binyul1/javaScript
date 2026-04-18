import { PageTitle } from "../../components/page-title/PageTitle";
import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";
import { useEffect } from "react";
import { useAuth } from "../../lib/hook/auth-hook";
import { useNavigate } from "react-router";

export default function ForgetPasswordPage(){
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      navigate(`/${loggedInUser.role}`);
    }
  }, [])

  return (
    <section className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white flex flex-col gap-4 w-wrap shadow-lg rounded-md p-5">
        <PageTitle  className="text-left text-emerald-900">
          Request for password change?
        </PageTitle>
        <ForgetPasswordForm />
      </div>
    </section>
  );
}
