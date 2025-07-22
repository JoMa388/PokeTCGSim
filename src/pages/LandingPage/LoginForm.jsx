import { useState, useEffect } from "react";
import { supabase } from "../../supabase-client";
const LoginForm = () => {
  const [isSignin, setSignIn] = useState(true);
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignin) {
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            userName: user.userName,
          },
        },
      });
      if (error) {
        console.error("Error signing up:", error.message);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) {
        console.error("Error signing up:", error.message);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-1/2">
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
        {isSignin == false && (
          <>
            <label className="label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="Username"
              onChange={(e) => setUser((prev) => ({ ...prev, userName: e.target.value }))}
            />
          </>
        )}
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        <div className="flex justify-between">
          {isSignin == false && (
            <span className="text-blue-600 cursor-pointer hover:underline text-lg" onClick={() => setSignIn(true)}>
              Sign In
            </span>
          )}
          {isSignin && (
            <span className="text-blue-600 cursor-pointer hover:underline text-lg " onClick={() => setSignIn(false)}>
              Register
            </span>
          )}
          <span className="text-blue-600 cursor-pointer hover:underline text-lg ">Forgot Password?</span>
        </div>
        <button type="submit" className="btn btn-neutral mt-4">
          {isSignin ? "Login" : "Register"}
        </button>
      </form>
    </>
  );
};
export default LoginForm;
