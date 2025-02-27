import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = (data) => {
    console.log(data);
    if (
      data.email === "shuklaakash357@gmail.com" &&
      data.password === "Akash@123"
    ) {
      alert("Login Successful!");
      localStorage.setItem(
        "token",
        "fsdfgdgdfgdf8g4d5fgadfg84ds5ad1gd84fhsd5fg1sdfh4s"
      );
      dispatch(setUser({ role: "client" }));
      setTimeout(() => navigate("/"), 1000);
    } else if (
      data.email === "admin@example.com" &&
      data.password === "Admin@123"
    ) {
      alert("Admin Login Successful!");
      localStorage.setItem("token", "adminToken123");
      dispatch(setUser({ role: "admin" }));
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-8 shadow-2xl w-[350px] sm:w-[400px] bg-white rounded-lg"
      >
        <div className="text-4xl font-semibold mb-6 w-fit mx-auto p-4 rounded-full bg-gray-200">
          <UserRound size={30} className="animate-pulse" />
        </div>

        <form
          onSubmit={handleSubmit(userLogin)}
          className="flex flex-col gap-6"
        >
          <div className="relative">
            <input
              {...register("email", { required: "Email is required" })}
              type="text"
              className="w-full border border-gray-400 px-4 py-3 rounded-md outline-none"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              type="password"
              className="w-full border border-gray-400 px-4 py-3 rounded-md outline-none"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <p className="text-sm text-right text-gray-600 mt-1">
              <Link to="/forgot-password" className="hover:text-blue-600">
                Forgot password?
              </Link>
            </p>
          </div>

          <button className="w-full py-3 bg-gradient-to-bl from-gray-700 to-gray-800 rounded-md text-white font-semibold hover:opacity-90 transition duration-300">
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              {" "}
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
