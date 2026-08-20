import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Admin from "./components/Admin";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
