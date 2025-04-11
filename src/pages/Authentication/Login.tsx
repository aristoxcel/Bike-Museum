
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../redux/utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";




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


  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    // const toastId = toast.loading("Please wait...");
    try {
      const result = await login(data).unwrap();
      console.log("Login : ", result);

      const user = verifyToken(result.data.accessToken) as TUser;
      // console.log("user => ,", user);
      if (result?.success) {
        toast.success("Login Successfully..", {
          // id: toastId,
          duration: 2000,
        });
      }
      dispatch(setUser({ user: user, token: result.data.accessToken }));
      navigate("/");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("error =>", error);
      toast.error(error.data.message, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
      <div className="max-w-md w-full text-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-8">
          Log in to continue exploring our vast collection of books!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    ? "border-orange-500 focus:ring-orange-500"
                    : "border-gray-700 focus:ring-gray-500"
                } focus:outline-gray-500 focus:ring-2`}
              />
              {errors.email && (
                <p className="text-orange-500 text-sm mt-1">Email is required</p>
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
                      ? "border-orange-500 focus:ring-orange-500"
                      : "border-gray-700 focus:ring-gray-500"
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
                <p className="text-orange-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium border border-orange-500 rounded-lg bg-[linear-gradient(105deg,_#f97316_4.1%,_#ea580c_54.8%,_#c2410c_92.38%)] flex items-center justify-center"
          >
            <p>Login</p>
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          New Here?{" "}
          <Link to={"/register"} className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
