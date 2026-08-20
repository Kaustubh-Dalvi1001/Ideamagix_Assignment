import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "./api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutate: userSignUp } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: (data) => {
      console.log(data);
      dispatch(addUser(data.user));
      toast.success(data.message);
      reset();
      navigate("/");
    },
    onError: (error) => {
      console.error(`Error in signup: ${error}`);
      const errorMessage = error.response.data.message || error.message;
      toast.error(`Error in signup. ${errorMessage}`);
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    userSignUp(data);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="label">
            Email <span className="text-red-300">*</span>
          </label>
          <input
            {...register("userName")}
            type="text"
            className="input"
            maxLength={30}
            required
            placeholder="Enter user name (max 30 characters)"
          />

          <label className="label">
            Password <span className="text-red-300">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            className="input"
            maxLength={50}
            required
            placeholder="Enter Password (max 50 characters)"
          />

          <label className="label">
            Role <span className="text-red-300">*</span>
          </label>
          <select className="select" {...register("role")} required>
            <option value="admin"> Admin </option>
            <option value="Instructor"> Instructor </option>
          </select>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <NavLink to="/login" className="link link-primary">
              Login
            </NavLink>
          </p>

          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
