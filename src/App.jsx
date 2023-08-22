import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";
// import User from "./pages/User";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/sign-in"} element={<Register />} />
        {/* <Route path="/user/:id" element={<User />}>
          <Route index path="/books"></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
