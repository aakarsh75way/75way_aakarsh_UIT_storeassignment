import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Inputs } from "../../../../../utils/store/types";
import { useRegisteruserMutation } from "../../rtkquery";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [registeruser] = useRegisteruserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [bError, setbError] = useState<string>(""); // Define the type here

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data:FieldValues) => {
    clearErrors();
    const response = await registeruser(data);
    if ("error" in response) {
      console.log("Error", response);
      const err: any = response.error;
      setbError(err.data.error);
    } else {
      navigate("/auth/login");
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm font-semibold block">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          id="email"
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        {bError && <p className="text-red-500">{bError}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold block">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "Password must be 10 characters long",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="password"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold block"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="username" className="text-sm font-semibold block">
          Username
        </label>
        <input
          {...register("username")}
          type="text"
          id="username"
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="preference" className="text-sm font-semibold block">
          Prefrence
        </label>
        
        <select {...register("preference", { required: "Prefrence is Required" })}  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">
          <option value="user">User</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md ${
          isSubmitting
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700"
        } focus:outline-none focus:ring focus:border-blue-300 transition duration-300`}
      >
        Sign Up
      </button>
      <div className="text-center text-gray-300 text-sm mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-400 underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
