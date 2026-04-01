import { PageTitle } from "../../components/page-title/PageTitle";



export const ForgetPasswordForm = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-4 items-center">
        <label className="items-center">UserName</label>
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4  focus:ring-blue-500"
          placeholder="Enter your username"
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
        >
            Submit
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
        <PageTitle  
         pageTitle="Request for password change?"
        className="text-left text-emerald-900">
           Request for password change?
        </PageTitle>
        <ForgetPasswordForm />
      </div>
    </section>
  );
}
