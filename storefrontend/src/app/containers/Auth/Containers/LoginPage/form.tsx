import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FieldValues, useForm } from 'react-hook-form';
import { Login } from '../../../../../utils/store/types';
import { useLoginuserMutation } from '../../rtkquery';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/slice';

const LoginForm = () => {
  const [mutate] = useLoginuserMutation();
  const [bError, setbError] = useState<string>("");
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>();


  const onSubmit=async(data:FieldValues)=>{
   const response = await mutate(data);
   if ("error" in response) {
     console.log("Error", response);
     const err: any = response.error;
     setbError(err.data.error);
   } else {
    localStorage.setItem("sessionToken",response.data.accessToken)
    localStorage.setItem("role",response.data.findUser?.role)

    dispatch(
      actions.setForm({ key: "accessToken", value: response.data.accessToken })
    );
    dispatch(
      actions.setForm({ key: "findUser", value: JSON.stringify(response.data.findUser) })
    );
     navigate("/");
   }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="text-sm font-semibold block">
          Email
        </label>
        <input
        {...register("email",{
          required:"Email is required"
        })}
          type="text"
          id="email"
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
          placeholder="Enter your Email"
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="text-sm font-semibold block">
          Password
        </label>
        <input
        {...register("password",{
          required:"Password is required"
        })}
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
          placeholder="Enter your password"
        />
        <span
          className="absolute top-1/2 right-4 transform  cursor-pointer "
          onClick={handleTogglePassword}
        >
          {showPassword ?  <AiOutlineEyeInvisible className='flex items-center justify-center' size={20} /> : <AiOutlineEye size={20} />}
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
      >
        Login
      </button>
      <div className="text-center text-gray-300 text-sm mt-4">
        Don't have an account? <Link to="/auth/signup" className="text-blue-400 underline">Sign up</Link>
      </div>
    </form>
  );
};

export default LoginForm;
