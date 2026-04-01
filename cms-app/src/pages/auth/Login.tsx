import { InputText } from "../../components/page-title/form/InputText";
export const PageTitle = () => {
  const pageTitle = "Login Page";
  return (
    <h1 className="text-4xl font-semibold text-teal-900 text-center">
      {pageTitle}
    </h1>
  );
};

export const LoginDesc = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-4 items-center">
        <label className="items-center">UserName</label>
        <InputText type="username" name="username"/>
      </div>
      <div className="flex gap-4 mb-4 items-center">
        <label className="">Password</label>
        <InputText type="password" name="password"/>
      </div>
      <a
        href="/forget_password"
        className="flex w-full justify-end underline text-teal-700 italic hover:text-teal-t00/60"
      >
        Forgot Password?
      </a>
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
        >
          Login
        </button>
        <button
          type="reset"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 w-[50%]"
        >
          Reset
        </button>
      </div>
    </form>
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
