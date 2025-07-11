import React, { useEffect, useState } from "react";
import "./landing.css";
import FasTTimeSVG from "./SVGs/FasTTimeSVG";
import UserGraduateSVG from "./SVGs/UserGraduateSVG";
import MouseAndBookSVG from "./SVGs/MouseAndBookSVG";
import Typewriter from "typewriter-effect";
import useCounter from "../../../../Components/hooks/useCounter";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Landing() {
  const [searchValIpt, setSearchValIpt] = useState("");

  const courseCounterFull = 40;
  const userLoginCounterFull = 3107;
  const minuteCounterFull = 3132;
  const courseCounter = useCounter(courseCounterFull);
  const userLoginCounter = useCounter(userLoginCounterFull);
  const minuteCounter = useCounter(minuteCounterFull);

  const navigate = useNavigate();

  const sendUserToSearchPage = (e) => {
    e.preventDefault();

    if (searchValIpt.length === 0) {
      return toast.warning("متنی که میخواهید سرچ کنید رو وارد کنید", {
        position: "bottom-right",
        autoClose: 2500,
        draggable: true,
      });
    }

    if (searchValIpt.length < 2) {
      return toast.error("تعداد کراکتر های شما از حد مجاز کمتر است", {
        position: "bottom-right",
        autoClose: 2500,
        draggable: true,
      });
    }

    if (searchValIpt.length > 50) {
      return toast.error("تعداد کراکتر های شما از حد مجاز بیشتر است", {
        position: "bottom-right",
        autoClose: 2500,
        draggable: true,
      });
    }

    return navigate(`/search/${searchValIpt}`);
  };

  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      sendUserToSearchPage();
    }
  });

  return (
    <section className="landing">
      <ToastContainer />
      <div className="container">
        <h1 className="landing__title">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("ما به هر قیمتی دوره آموزش تولید نمیکنیم !")
                .start()
                .pauseFor(2000)
                .deleteAll()
                .typeString("سبزلرن - آکادمی خصوصی برنامه نویسی")
                .start()
                .pauseFor(4000);
            }}
            options={{ loop: true }}
          />
        </h1>
        <h2 className="landing__subtitle">
          با آکادمی سبزلرن، برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن.
        </h2>
        <div className="landing__searchbar">
          <input
            type="text"
            className="landing__searchbar-input"
            placeholder="چه چیزی دوست داری یاد بگیری ..."
            value={searchValIpt}
            onChange={(e) => setSearchValIpt(e.target.value)}
          />
          <button
            className="landing__searchbar-btn"
            type="submit"
            onClick={sendUserToSearchPage}
            onSubmit={sendUserToSearchPage}
          >
            <i className="fas fa-search landing__searchbar-icon" />
          </button>
        </div>
        <div className="landing-status">
          <div className="landing-status__item">
            <UserGraduateSVG />
            <span className="landing-status__count">
              {userLoginCounter.toLocaleString()}
            </span>
            <span className="landing-status__text">
              کاربر توی سبزلرن ثبت نام کردن
            </span>
          </div>
          <div className="landing-status__item">
            <MouseAndBookSVG />
            <span className="landing-status__count">
              {courseCounter.toLocaleString()}
            </span>
            <span className="landing-status__text">دوره آموزشی داریم</span>
          </div>
          <div className="landing-status__item">
            <FasTTimeSVG />
            <span className="landing-status__count">
              {minuteCounter.toLocaleString()}
            </span>
            <span className="landing-status__text">
              دقیقه آموزش تولید کردیم
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
