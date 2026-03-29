import React from "react";
export const PageTitle = () => {
  return <div>Login Form</div>;
};

export const LoginDesc = () => {
  return (
    <form>
      <label>UserName</label>
      <input type="text" placeholder="Enter your username" />
      <label>Password</label>
      <input type="password" placeholder="Enter your password" />
      <button type="submit">Login</button>
      <button type="reset">Reset</button>
      <a href="/forget_password">Forgot Password?</a>
    </form>
  );
};

export default function LoginPage() {
  return (
    <>
      {" "}
      {/*react fragment to wrap the content of the component */}
      <PageTitle />
      <LoginDesc />
    </>
  );
}
