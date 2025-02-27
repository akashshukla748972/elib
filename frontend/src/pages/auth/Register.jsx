import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = (userData) => {
    console.log(userData);
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
          <UserRoundPlus size={25} className="animate-pulse" />
        </div>

        <form
          onSubmit={handleSubmit(userLogin)}
          className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-6 w-full"
        >
          <div className="form-control relative">
            {errors.username && (
              <span className="text-red-400">User name is required</span>
            )}
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              className="w-full border border-[#2C3E50] px-6 py-3 rounded-md outline-none "
              placeholder="User Name"
            />
          </div>
          <div className="form-control">
            {errors.email && (
              <span className="text-red-400">Email is required</span>
            )}
            <input
              {...register("email", { required: true })}
              type="text"
              className="w-full border border-[#2C3E50]  px-6 py-3 rounded-md outline-none"
              placeholder="Email"
            />
          </div>
          <div className="form-control">
            {errors.password && (
              <span className="text-red-400">Password is required</span>
            )}
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              className="w-full border border-[#2C3E50]  px-6 py-3 rounded-md outline-none"
              placeholder="Password"
            />
          </div>
          <div className="form-control">
            <button className="w-full outline-none border-none px-6 py-3 bg-gradient-to-bl from-gray-700 to-gray-800 rounded-md text-[#FFFFFF]">
              Register{" "}
            </button>
            <p className="text-[#2C3E50] text-base text-center my-2">
              Already have account?{" "}
              <Link
                to={"/"}
                className="font-semibold text-blue-600 hover:underline"
              >
                login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
