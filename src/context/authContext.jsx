import { createContext, useReducer, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { PropTypes } from "prop-types";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return { ...state };
  }
}

function AuthProvider({ children }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      dispatch({ type: "login", payload: user });
    }

    if (user) {
      let decodedToken = jwt_decode(user.token);
      let currentDate = new Date();
      if (decodedToken.exp > currentDate.getTime()) {
        dispatch({ type: "logout" });
      } else {
        dispatch({ payload: user });
      }
    }
  }, []);

  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function loginAuth(user) {
    if (user.token) {
      dispatch({ type: "login", payload: user });
    }
  }

  function logoutAuth() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginAuth, logoutAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export { AuthProvider, useAuth };
