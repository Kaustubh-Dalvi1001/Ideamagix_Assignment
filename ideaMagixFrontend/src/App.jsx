import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
