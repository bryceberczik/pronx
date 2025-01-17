import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    setGeneralError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setGeneralError("Please fill out both email and password.");
      return;
    }

    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      setGeneralError("Invalid email or password.");
    }
  };

  return (
    <div>
      <div className="mt-20 mb-[60px]">
        <h1 className="text-center text-[#F5F5DC]">Welcome Back</h1>
      </div>

      <div className="bg-[#302F2F] p-6 w-100% mx-4 rounded-[10px]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#F5F5DC] text-sm mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
              placeholder="Enter email"
              value={loginData.email || ""}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-[#F5F5DC] text-sm mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
              placeholder="Enter password"
              value={loginData.password || ""}
              onChange={handleChange}
            />
          </div>

          {/* General Error */}
          {generalError && (
            <p className="text-red-500 text-sm mt-1">{generalError}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#202020] text-[#F5F5DC] px-6 py-2 rounded-[5px] hover:bg-gray-800 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>

      {/* Redirect to Signup */}
      <div className="mt-6 text-center text-[#F5F5DC]">
        Don't have an account?
        <Link
          to="/signup"
          className="ml-1 underline text-[#F5F5DC] hover:text-gray-300"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
