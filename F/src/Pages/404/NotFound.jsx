import React, { useContext, useEffect } from "react";
import "./404.css";
import AuthContext from "../../Components/context/authContext";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    toast.warning("صفحه مورد نظر پیدا نشد یا پاک شده", {
      position: "bottom-center",
      autoClose: 6500,
      draggable: true,
    });

    const timeout = setTimeout(() => {
      navigate(-1);
      toast.loading("درحال ورود به صقحه قبلی", {
        position: "bottom-center",
        draggable: true,
      });
    }, 8000);

    return () => clearTimeout(timeout); // جلوگیری از باگ در هنگام خروج از صفحه
  }, []);

  return (
    <div className="NotFound">
      <ToastContainer />
      <div
        className={`NotFoundBTNs${
          !authContext.isLoggedIn ? " noLoginButton" : ""
        }`}
      >
        <Link className="magic-btn" to="/">
          خانه
        </Link>
        <button className="magic-btn" onClick={() => navigate(-1)}>
          برگشت
        </button>
        {!authContext.isLoggedIn && (
          <Link className="magic-btn" to="/register">
            ثبت‌ نام
          </Link>
        )}
      </div>
    </div>
  );
}
