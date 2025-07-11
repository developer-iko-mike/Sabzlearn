import React, { useState, useCallback, useEffect } from "react";
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";
import routes from "../Components/router";
import AuthContext from "../Components/context/authContext";
import { useRoutes } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const routtes = useRoutes(routes);

  const login = useCallback((userInfos = {}, token) => {
    setToken(token);
    setIsLoggedIn(true);
    console.log(token);
    if (userInfos.name) {
      setUserInfos(userInfos);
    }
    localStorage.setItem("user", JSON.stringify({ token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  });

  useEffect(() => {
    const fetchData = async () => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      if (localStorageData) {
        try {
          const response = await fetch(`http://localhost:4000/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          });
          const userData = await response.json();
          setIsLoggedIn(true);
          setUserInfos(userData);
        } catch (error) {
          console.error("خطا در گرفتن اطلاعات کاربر:", error);
        }
      }
    };

    fetchData();
  }, [login, token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      <Header />
      {routtes}
      <Footer />
    </AuthContext.Provider>
  );
}
