import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const signUp = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const loginFn = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};

export const addCourseFn = async (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("level", data.level);
  formData.append("description", data.description);
  formData.append("photo", data.photo[0]);

  const response = await api.post("/addCourse", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getCoursesFn = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const getInstructorsFn = async () => {
  const response = await api.get("/instructors");
  return response.data;
};

export const addLectureFn = async (data) => {
  const response = await api.post("/addLecture", data);
  return response.data;
};
