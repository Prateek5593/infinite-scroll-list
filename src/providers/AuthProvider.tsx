import React from "react";

const sessionUser = sessionStorage.getItem('user') || null;

const initialState = {
  isAuthenticated: false,
  user: sessionUser,
};

type State = {
  isAuthenticated: boolean;
  user: string | null;
};

type LoginPayload = {
  user: string;
};

type Action = { type: "LOGIN"; payload: LoginPayload } | { type: "LOGOUT" };

type Context = {
    state: State,
    dispatch: (a: Action) => void
}

export const AuthContext = React.createContext<Context>({
    state: initialState,
    dispatch: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
