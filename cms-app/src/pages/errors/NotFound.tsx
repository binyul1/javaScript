import { IoArrowBack, IoWarningOutline } from "react-icons/io5";
import { PageTitle } from ".././../components/page-title/PageTitle";

export default function NotFound() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-3xl p-5 rounded-md bg-white shadow flex flex-col items-center gap-4">
        <IoWarningOutline className="text-4xl text-red-500 mx-auto" />
        <PageTitle className="text-red-800">404 Not Found</PageTitle>
        <p className="text-red-900 text-lg font-semibold">
          {" "}
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="text-red-600 border-1 border-red-600 rounded-2xl w-full hover:bg-red-100 transistion hover:scale-98 flex items-center justify-center gap-4"
        >
           <IoArrowBack/> 
          Go back to Home
        </a>
      </div>
    </section>
  );
}
