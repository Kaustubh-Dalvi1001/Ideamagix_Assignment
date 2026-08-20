import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addCourseFn } from "./api";
import { useEffect, useState } from "react";

const Admin = () => {
  const { register, handleSubmit, reset, watch } = useForm();

  const [previewURL, setPreviewURL] = useState(null);

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);

      return () => URL.createObjectURL(objectURL);
    } else {
      setPreviewURL(null);
    }
  }, [photoFile]);

  const { mutate: addCourseMutate } = useMutation({
    mutationFn: (data) => addCourseFn(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      reset();
    },
    onError: (error) => {
      console.log(`Error in adding course: ${error}`);
      const errorMessage = error?.response?.data?.message || error?.message || "Error in adding course.";
      toast.error(errorMessage);
    },
  });

  const handleAddCourse = (data) => {
    console.log(data);
    addCourseMutate(data);
  };

  return (
    <div className="flex justify-center items-start h-full py-8 gap-10 overflow-y-auto">
      {/* add course */}
      <div className="card bg-base-200 w-96 shadow-sm">
        {previewURL && (
          <figure className="px-10 pt-10">
            <img src={previewURL} alt="Shoes" className="rounded-xl" />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">Add Course</h2>
          <form onSubmit={handleSubmit(handleAddCourse)}>
            <label className="label">
              Name: <span className="text-red-300">*</span>
            </label>
            <input {...register("name")} required type="text" className="input" maxLength={30} />

            <label className="label">
              Level: <span className="text-red-300">*</span>
            </label>
            <select {...register("level")} required className="select">
              <option value="beginner"> Beginner </option>
              <option value="intermediate"> Intermediate </option>
              <option value="advanced"> Advanced </option>
            </select>

            <label className="label">
              Description: <span className="text-red-300">*</span>
            </label>
            <textarea {...register("description")} required className="textarea" maxLength={200} />

            <label className="label">
              Photo: <span className="text-red-300">*</span>
            </label>
            <input {...register("photo")} required type="file" className="file-input" />

            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary"> Add Course + </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
