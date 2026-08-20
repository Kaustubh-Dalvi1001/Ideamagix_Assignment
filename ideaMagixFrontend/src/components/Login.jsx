import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginFn } from "./api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation({
    mutationFn: (data) => loginFn(data),
    onSuccess: (data) => {
      console.log(data);
      dispatch(addUser(data.user));
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      console.error(`Error in login: ${error}`);
      const errorMessage = error?.response?.data?.message || error?.message || "Error in login.";
      toast.error(errorMessage);
    },
  });

  const handleLogin = (data) => {
    loginMutate(data);
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">
            User Name <span className="text-red-300">*</span>
          </label>
          <input
            {...register("userName")}
            required
            maxLength={30}
            type="text"
            className="input"
            placeholder="Enter user name (max 30 chararters)"
          />

          <label className="label">
            Password <span className="text-red-300">*</span>
          </label>
          <input
            {...register("password")}
            required
            maxLength={50}
            type="password"
            className="input"
            placeholder="Enter password (max 50 characters)"
          />

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?
            <NavLink to="/signup" className="link link-primary">
              Sign Up
            </NavLink>
          </p>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
