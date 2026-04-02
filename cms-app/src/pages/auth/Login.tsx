import { LoginDesc } from "../../components/auth/LoginForm";

export const PageTitle = () => {
  const pageTitle = "Login Page";
  return (
    <h1 className="text-4xl font-semibold text-teal-900 text-center">
      {pageTitle}
    </h1>
  );
};

export default function LoginPage() {
  return (
    <section className="flex h-screen items-center justify-center bg-gray-200">
      {/*react fragment to wrap the content of the component */}
      <div className="bg-white flex flex-col gap-10 w-wrap shadow-lg rounded-md p-5">
        <PageTitle />
        <LoginDesc />
      </div>
    </section>
  );
}
