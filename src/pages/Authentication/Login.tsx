
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
      <div className="max-w-md w-full text-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-8">
          Log in to continue exploring our vast collection of books!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit()}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email..."
                className={`w-full px-4 py-2  text-white rounded-lg border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                } focus:outline-gray-500 focus:ring-2`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  className={`w-full px-4 py-2  text-white rounded-lg border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center"
          >
            <p>Login</p>
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          New Here?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
