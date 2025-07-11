import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Components/context/authContext";
import "./navigationButtons.css"
const NavigationButtons = ({ categoryTitle, categoryLink }) => {
  const authContext = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        padding: "3rem",
        fontFamily: "var(--primary-font)",
        direction: "rtl",
      }}
    >
      {/* دکمه بازگشت به خانه */}
      <Link
        to="/"
        style={{
          padding: "1.2rem 2.5rem",
          border: "none",
          borderRadius: "15px",
          backgroundColor: "var(--dark-color)",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(43, 206, 86, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        <span
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            transition: "all 0.3s ease",
            opacity: "0.8",
          }}
        >
          {" "}
          🏠{" "}
        </span>
        <span
          style={{
            marginRight: 16,
          }}
        >
          {" "}
          خانه{" "}
        </span>
        <div
          style={{
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
            opacity: "0",
            transition: "opacity 0.3s ease",
          }}
        ></div>
      </Link>

      {/* دکمه بازگشت به صفحه قبل */}
      <button
        style={{
          padding: "1.2rem 2.5rem",
          border: "2px solid var(--primary-color)",
          borderRadius: "15px",
          backgroundColor: "transparent",
          color: "var(--primary-color)",
          fontSize: "1.5rem",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(43, 206, 86, 0.1)";
          e.currentTarget.querySelector(".arrow").style.transform =
            "translateX(-5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.querySelector(".arrow").style.transform =
            "translateX(0)";
        }}
        onClick={() => window.history.back()}
      >
        <span
          className="arrow"
          style={{
            display: "inline-block",
            marginLeft: "8px",
            transition: "transform 0.3s ease",
          }}
        >
          ↩️
        </span>
        بازگشت
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "0",
            height: "3px",
            backgroundColor: "var(--primary-color)",
            transition: "width 0.3s ease",
          }}
        ></div>
      </button>

      {categoryLink ? (
        <Link
          to={categoryLink}
          style={{
            padding: "1.2rem 2.5rem",
            border: "none",
            borderRadius: "15px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "1.5rem",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s ease",
            boxShadow: "0 4px 6px rgba(255,255,255,0.1)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 6px 12px rgba(43, 206, 86, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
          }}
        >
          {categoryTitle}
          <div
            style={{
              position: "absolute",
              inset: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
              opacity: "0",
              transition: "opacity 0.3s ease",
            }}
          ></div>
        </Link>
      ) : null}

      {!authContext.isLoggedIn && (
        <Link
          to="/register"
          style={{
            padding: "1.2rem 2.5rem",
            border: "none",
            borderRadius: "15px",
            background:
              "linear-gradient(135deg, var(--primary-color), var(--sabzlearn-green))",
            color: "var(--white-color)",
            fontSize: "1.5rem",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.querySelector(".shine").style.left = "100%";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.querySelector(".shine").style.left = "-50%";
          }}
          onClick={() => (window.location.href = "/register")}
        >
          ثبت نام
          <div
            className="shine"
            style={{
              position: "absolute",
              top: "0",
              left: "-50%",
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              transition: "left 0.6s ease",
            }}
          ></div>
        </Link>
      )}
    </div>
  );
};

export default NavigationButtons;
