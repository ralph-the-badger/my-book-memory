import { createContext, useReducer, useContext } from "react";
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
  }
}

const FAKE_TOKEN = {
  id: "1",
  name: "Ralph",
  email: "badger_rr@gmx.de",
  token: "1234",
};

function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function loginAuth(token) {
    console.log(`loginAuth: ${token}`);
    // if (token === FAKE_TOKEN.token) {
    if (token) {
      dispatch({ type: "login", payload: FAKE_TOKEN });
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
