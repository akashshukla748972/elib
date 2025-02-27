import React from "react";
import { useForm } from "react-hook-form";
import { cssProperties } from "../../utils/cssProperties";
import { Link, redirect } from "react-router-dom";
import { UserRound } from "lucide-react";
import { animate, motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = (data) => {
    console.log(data);
  };

  const data = cssProperties.colors.primary;
  console.log(data);
  return (
    <div className={`fixed inset-0 flex justify-center items-center`}>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`px-4 sm:px-6 lg:px-8 py-6 shadow-2xl w-[350px] sm:w-[350px] md:w-[400px] lg:w-[450px]`}
      >
        <div className="text-4xl font-semibold mb-6 w-fit mx-auto p-4 rounded-full bg-[#ECF0F1]">
          <UserRound size={25} className="animate-pulse" />
        </div>

        <form
          onSubmit={handleSubmit(userLogin)}
          className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-6 w-full"
        >
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
            <p className="text-[#2C3E50] text-base">
              <Link>Forgot password?</Link>
            </p>
          </div>
          <div className="form-control">
            <button className="w-full outline-none border-none px-6 py-3 bg-gradient-to-bl from-gray-700 to-gray-800 rounded-md text-[#FFFFFF]">
              Login{" "}
            </button>
            <p className="text-[#2C3E50] text-base text-center my-2">
              Don't have accoutn? <Link to={"/register"}>register</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
