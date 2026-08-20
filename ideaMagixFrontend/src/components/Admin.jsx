import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addCourseFn, addLectureFn, getCoursesFn, getInstructorsFn } from "./api";
import { useEffect, useState } from "react";

const Admin = () => {
  const {
    register: registerCourse,
    handleSubmit: handleSubmitCourse,
    reset: resetCourse,
    watch: watchCourse,
  } = useForm();

  const {
    register: registerLecture,
    handleSubmit: handleSubmitLecture,
    reset: resetLecture,
    control: controleLecture,
  } = useForm();

  const [previewURL, setPreviewURL] = useState(null);

  const photoFile = watchCourse("photo");

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
      resetCourse();
    },
    onError: (error) => {
      console.log(`Error in adding course: ${error}`);
      const errorMessage = error?.response?.data?.message || error?.message || "Error in adding course.";
      toast.error(errorMessage);
    },
  });

  const handleAddCourse = (data) => {
    // console.log(data);
    addCourseMutate(data);
  };

  const {
    data: courses,
    isError: coursesIsError,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCoursesFn,
  });

  useEffect(() => {
    if (coursesIsError) {
      console.error(`Error in getting courses ${coursesError}`);
      const errorMessage =
        coursesError?.response?.data?.message || coursesError?.message || "Error in getting courses.";
      toast.error(`Error in getting courses ${errorMessage}`);
    }
  }, [coursesIsError, coursesError]);

  //   console.log(courses?.courses);

  const {
    data: instructors,
    isError: instructorsIsError,
    error: instructorsError,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: getInstructorsFn,
  });

  useEffect(() => {
    if (instructorsIsError) {
      console.error(`Error in getting courses ${instructorsError}`);
      const errorMessage =
        instructorsError?.response?.data?.message ||
        instructorsError?.message ||
        "Error in getting instructors.";
      toast.error(`Error in getting courses ${errorMessage}`);
    }
  }, [instructorsIsError, instructorsError]);

  //   console.log(instructors?.instructors);

  const { mutate: addLectureMutate } = useMutation({
    mutationFn: (data) => addLectureFn(data),
    onSuccess: (data) => {
      //   console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(`Error in adding lecture: ${error}`);
      const errorMessage = error?.response?.data?.message || error?.message || "Error in adding lecture.";
      toast.error(errorMessage);
    },
  });

  const handleAddLecture = (data) => {
    // console.log(data);
    addLectureMutate(data);
    resetLecture();
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
          <form onSubmit={handleSubmitCourse(handleAddCourse)} className="flex flex-col gap-2">
            <div>
              <label className="label">
                Name <span className="text-red-300">*</span>
              </label>
              <input
                {...registerCourse("name")}
                required
                type="text"
                className="input"
                maxLength={30}
                placeholder="Enter course name (max 30 characters)"
              />
            </div>

            <div>
              <label className="label">
                Level <span className="text-red-300">*</span>
              </label>
              <select {...registerCourse("level")} required className="select">
                <option value="beginner"> Beginner </option>
                <option value="intermediate"> Intermediate </option>
                <option value="advanced"> Advanced </option>
              </select>
            </div>

            <div>
              <label className="label">
                Description <span className="text-red-300">*</span>
              </label>
              <textarea
                {...registerCourse("description")}
                required
                className="textarea"
                maxLength={200}
                placeholder="Enter course description (max 200 characters)"
              />
            </div>

            <div>
              <label className="label">
                Photo <span className="text-red-300">*</span>
              </label>
              <input {...registerCourse("photo")} required type="file" className="file-input" />
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Course +</button>
            </div>
          </form>
        </div>
      </div>

      {/* add lecture */}
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Add Lecture</h2>

          <form onSubmit={handleSubmitLecture(handleAddLecture)} className="flex flex-col gap-2">
            {/* course */}
            <div>
              <label className="label">
                Course <span className="text-red-300">*</span>
              </label>
              <Controller
                name="course"
                control={controleLecture}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} className="select">
                    <option value="" disabled>
                      Select a course
                    </option>
                    {courses?.courses?.map((eachCourse) => (
                      <option key={eachCourse._id} value={eachCourse._id}>
                        {eachCourse.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* instructor */}
            <div>
              <label className="label">
                Instructor <span className="text-red-300">*</span>
              </label>
              <Controller
                name="instructor"
                control={controleLecture}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} className="select">
                    <option disabled value="">
                      Select an instructor
                    </option>
                    {instructors?.instructors?.map((eachInstructor) => (
                      <option key={eachInstructor._id} value={eachInstructor._id}>
                        {eachInstructor.userName}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* date */}
            <div>
              <label className="label">
                Date <span className="text-red-300">*</span>
              </label>

              <input required {...registerLecture("date")} type="date" className="input" />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add Lecture +</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
