import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const storeUser = useSelector((store) => store.userReducer);
  console.log(storeUser);
  console.log(document.cookie);
  

  // const { _id, userName, role } = storeUser;

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-sm">
        <div>
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
                <a>userName</a>
              </li>
              <li className="disabled">
                <a>role</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
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
