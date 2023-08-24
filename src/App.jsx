import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";
import User from "./pages/User";
import Register from "./pages/Register";
import Books from "./pages/Books";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        {/* <Route index path="/books"></Route> */}
        <Route path="/user" element={<User />}></Route>
        <Route path="/books" element={<Books />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
