import { SubmitButton } from "../buttons/Button";

export default function ForgetPasswordForm(){
  return (
    <form className="flex flex-col gap-5 w-full">
      <div className="flex w-full items-center">
        <label className="w-1/3 font-semibold text-lg" htmlFor="username">
          UserName:{" "}
        </label>
        <div className="w-full">
          <input
            className="w-full border border-gray-200 rounded-md shadow p-2"
            type="email"
            name="username"
            placeholder="Enter your username..."
          />
        </div>
      </div>

      <div className="flex w-full gap-3">
        <SubmitButton className="bg-green-900!">
          {/* <SubmitButton > */}
          Send Request
        </SubmitButton>
      </div>
    </form>
  );
};