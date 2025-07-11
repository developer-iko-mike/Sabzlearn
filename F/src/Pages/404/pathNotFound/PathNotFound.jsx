import React, { useEffect } from "react";
import NavigationButtons from "./NavigationButtons";
import PeekCharacter from "./PeekCharacter";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./pathNotFound.css";

const NotFound2 = ({
  headerTiTle = "404",
  title = "صفحه مورد نظر پیدا نشد!",
  categoryLink,
  categoryTitle = "بازگشت به دسته بندی",
  caption = "به نظر می‌رسد مسیر وارد شده وجود ندارد. می‌توانید از دکمه‌های زیر برای بازگشت به بخش‌های اصلی سایت استفاده کنید",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
      toast.loading("درحال ورود به صقحه قبلی", {
        position: "bottom-center",
        draggable: true,
      });
    }, 8000);

    return () => clearTimeout(timeout); // جلوگیری از باگ در هنگام خروج از صفحه
  }, []);

  return (
    <div
      style={{
        minHeight: "43rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: `
  linear-gradient(135deg, rgba(20, 20, 20, 0.85) 0%, rgba(45, 47, 49, 0.85) 100%), top center/300px auto no-repeat
`,

        color: "var(--white-color)",
        fontFamily: "var(--primary-font)",
        direction: "rtl",
        padding: "2rem",
      }}
    >
      <ToastContainer />
      {/* تصویر سرک‌کشنده سمت راست */}
      {/* کاراکتر پیک‌دهنده راست */}
      <img
        src="/404/404.png"
        alt="peek right"
        className="peek-character peek-right"
      />

      {/* کاراکتر پیک‌دهنده چپ */}
      <img
        src="/404/404.png"
        alt="peek left"
        className="peek-character peek-left"
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "15rem",
            fontWeight: "900",
            background:
              "linear-gradient(45deg, var(--primary-color), var(--sabzlearn-green))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 50px rgba(43, 206, 86, 0.3)",
            animation: "float 3s ease-in-out infinite",
            position: "relative",
            zIndex: 1,
          }}
        >
          {headerTiTle}
        </div>

        <h2
          style={{
            fontSize: "2rem",
            margin: "1.5rem 0",
            position: "relative",
            animation: "slideIn 1s ease-out",
          }}
        >
          {title}
          <span
            style={{
              position: "absolute",
              right: "-40px",
              top: "-10px",
              fontSize: "2.5rem",
              animation: "rotate 4s linear infinite",
            }}
          >
            🌀
          </span>
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "600px",
            lineHeight: "1.8",
            opacity: "0.9",
            animation: "fadeInUp 1s ease-out",
          }}
        >
          {caption}
        </p>

        {/* افکت‌های پس زمینه */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120%",
            height: "120%",
            background:
              "radial-gradient(circle, rgba(43,206,86,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        ></div>
      </div>

      {/* بخش دکمه‌ها */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "2rem 0",
          animation: "slideUp 1s ease-out",
        }}
      >
        <NavigationButtons categoryLink={categoryLink} categoryTitle={categoryTitle} />
      </div>
    </div>
  );
};

export default NotFound2;
