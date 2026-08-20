import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { removeUser, addUser } from "../store/userSlice";
import { toast } from "react-toastify";
import { getProfile, logout } from "./api";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { status, profile } = useSelector((store) => store.userReducer);
  // console.log(profile);

  const location = useLocation();

  const {
    data: profileData,
    isError,
    error: profileError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
    retry: false,
    enabled: status === "idle",
  });

  useEffect(() => {
    if (isError) {
      const httpStatus = profileError?.response?.status;
      const errorMessage =
        profileError?.response?.data?.message || profileError?.message || "Erorr in fetching user.";
      if (httpStatus === 401) {
        dispatch(removeUser());
        queryClient.clear();
        toast.error(errorMessage);
        navigate("/login");
      }
    }
  }, [isError, profileError, dispatch, queryClient, navigate]);

  useEffect(() => {
    if (profileData?.user) {
      dispatch(addUser(profileData.user));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (status === "authenticated" && location.pathname === "/" && profile.role === "admin") {
      navigate("/admin");
    } else if (status === "authenticated" && location.pathname === "/" && profile.role === "instructor") {
      navigate("/instructor");
    }
  }, [status, location.pathname, profile?.role, navigate]);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(`Error in logging out ${error}`);
      const errorMessage = error?.response?.data?.message || error?.message || "Erorr in logging out.";
      toast.error(errorMessage);
    },
  });

  const handleLogout = () => {
    queryClient.clear();
    dispatch(removeUser());
    logoutMutate();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-sm">
        {profile && (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              // tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="disabled">
                <a>{profile?.userName}</a>
              </li>
              <li className="disabled">
                <a>{profile?.role}</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        <span className="text-xl font-medium"> Ideamagix Assignment </span>
      </div>
      {/* content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      {/* Footer */}
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Ideamagix Assignment</p>
        </aside>
      </footer>
    </div>
  );
};

export default Body;
