import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { signUp } from "../api/authAPI";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setGeneralError("");
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    if (!signUpData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (signUpData.firstName.length > 20) {
      newErrors.firstName = "First name must be less than 20 characters.";
    }

    if (!signUpData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (signUpData.lastName.length > 20) {
      newErrors.lastName = "Last name must be less than 20 characters.";
    }

    if (!signUpData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!signUpData.password) {
      newErrors.password = "Password is required.";
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = await signUp(signUpData);
        Auth.login(data.token, true);
      } catch (err: any) {
        console.error("Failed to sign up", err);

        if (err.response?.data?.message) {
          setGeneralError(err.response.data.message);
        } else {
          setGeneralError("Failed to sign up. Please try again.");
        }
      }
    }
  };

  return (
    <div>
      <div className="mt-20 mb-[60px]">
        <h1 className="text-center text-[#F5F5DC]">Create Your Account</h1>
      </div>

      <div className="bg-[#302F2F] p-6 w-100% mx-4 rounded-[10px]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name and Last Name Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-[#F5F5DC] text-sm mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter first name"
                value={signUpData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-[#F5F5DC] text-sm mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter last name"
                value={signUpData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

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
              value={signUpData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              value={signUpData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {/* Redirect to Login */}
      <div className="mt-6 text-center text-[#F5F5DC]">
        Already have an account?
        <Link
          to="/login"
          className="ml-1 underline text-[#F5F5DC] hover:text-gray-300"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
