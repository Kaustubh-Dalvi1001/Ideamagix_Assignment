import { useQuery } from "@tanstack/react-query";
import { getAssignedLecturesFn } from "./api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Instructor = () => {
  const {
    data: assignedLectures,
    isError,
    error,
  } = useQuery({
    queryKey: ["assignedLectures"],
    queryFn: getAssignedLecturesFn,
  });

  useEffect(() => {
    if (isError) {
      console.error(`Error in getting assigned lectures: ${error}`);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Error in getting assigned lectures.";
      toast.error(`Error in getting courses ${errorMessage}`);
    }
  }, [isError, error]);

  console.log(assignedLectures);

  return (
    <div>
      <p className="p-4 pb-2 text-xs opacity-60 tracking-wide">Lectures assigned to you.</p>
      {assignedLectures?.lectures?.map((eachLecture, index) => {
        return (
          <ul key={eachLecture._id} className="list bg-base-100 rounded-box shadow-md">
            <li className="list-row">
              <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
              <div>
                <img
                  className="size-15 rounded-box"
                  alt="Tailwind CSS list item"
                  src={eachLecture.course.image}
                />
              </div>
              <div className="list-col-grow">
                <span className="font-semibold opacity-80">{eachLecture.course.name}</span> |{" "}
                <span className="text-xs uppercase font-semibold opacity-60">{eachLecture.course.level}</span>{" "}
                |<span> {new Date(eachLecture.date).toLocaleDateString()} </span>
                <p className="list-col-wrap text-xs">{eachLecture.course.description}</p>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Instructor;
