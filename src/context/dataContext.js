import React, { createContext, useState, useReducer } from 'react';
import { setAuthToken } from '../config/api';
export const DataContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      setAuthToken(payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [dataUserLogin, setDataUserLogin] = useState([]);
    const [formLogin, setFormLogin] = useState([]);
    const [userLogin, setUserLogin] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);
    const [navbarProfile, setNavbarProfile] = useState(false);
    const [Number, setNumber] = useState('');
    const [dataBooking, setDataBooking] = useState('');
    const [appearancePay, setAppearancePay] = useState(false);
    const [message, setMessage] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [idUserLogin, setIdUserLogin] = useState("");

    return (
        <DataContext.Provider value={{state, dispatch, dataUserLogin, setDataUserLogin, userLogin, setUserLogin, dataBooking, setDataBooking, adminLogin, setAdminLogin, navbarProfile, setNavbarProfile, Number, setNumber, appearancePay, setAppearancePay,  formLogin, setFormLogin, message, setMessage, showLoginModal, setShowLoginModal, idUserLogin, setIdUserLogin}}>
            {children}
        </DataContext.Provider>

    );
};
