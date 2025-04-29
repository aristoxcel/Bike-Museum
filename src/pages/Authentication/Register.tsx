import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import axios from "axios";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

type ApiError = {
  status?: number;
  data?: {
    message?: string;
    error?: string;
  };
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      const image = data.image[0];
      const newFormData = new FormData();
      newFormData.append("file", image);
      newFormData.append("upload_preset", "rakib001");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtrek2mmx/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url || response.data.url;

      const { name, email, password } = data;
      const userInfo = {
        name,
        email,
        password,
        role: "user", // Role fixed to "user"
        imageUrl,
      };
      console.log("Registering user with:", userInfo);

      const result = await registerUser(userInfo).unwrap();

      if (result?.success) {
        toast.success("Registration Successful!", { duration: 2000 });
        reset();
        navigate("/login"); // keep this unchanged
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Registration Error =>", error);
      console.log("Error message:", error?.data?.message);

      toast.error(error?.data?.message || "Something went wrong", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <RingLoader size={80} color="#C2410C" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
      <div className="max-w-md w-full text-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-6">Get Started</h1>
        <p className="text-center text-gray-400 mb-8">
          Unlock access to a wide range of books with just a few details!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name..."
                className={`w-full px-4 py-2 text-white rounded-lg border ${errors.name
                  ? "border-orange-500 focus:ring-orange-500"
                  : "border-gray-700 focus:ring-gray-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.name?.message === "string" && (
                <p className="text-orange-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
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
                className={`w-full px-4 py-2 text-white rounded-lg border ${errors.email
                  ? "border-orange-500 focus:ring-orange-500"
                  : "border-gray-700 focus:ring-gray-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.email?.message === "string" && (
                <p className="text-orange-500 text-sm mt-1">{errors.email.message}</p>
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
                  className={`w-full px-4 py-2 text-white rounded-lg border ${errors.password
                    ? "border-orange-500 focus:ring-orange-500"
                    : "border-gray-700 focus:ring-gray-500"
                  } focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              {typeof errors.password?.message === "string" && (
                <p className="text-orange-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                accept="image/*"
                className={`w-full px-4 py-2 text-white rounded-lg border ${errors.image
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.image?.message === "string" && (
                <p className="text-orange-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium border border-orange-500 rounded-lg bg-[linear-gradient(105deg,_#f97316_4.1%,_#ea580c_54.8%,_#c2410c_92.38%)] flex items-center justify-center"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
