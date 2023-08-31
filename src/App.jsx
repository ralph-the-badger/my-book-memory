import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";
import User from "./pages/User";
import Register from "./pages/Register";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
// import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          {/* <Route index path="/books"></Route> */}
          <Route path="/user" element={<User />}></Route>
          {/* <ProtectedRoute> */}
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/add" element={<AddBook />}></Route>
          <Route path="/books/:id" element={<Book />}></Route>
          {/* </ProtectedRoute> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
