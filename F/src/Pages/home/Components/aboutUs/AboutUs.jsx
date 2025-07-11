import React, { useState } from "react";
import "./aboutUs.css";
import CopyRightingSVG from "./SVGs/CopyRightingSVG";
import SectionHeader from "../../../../Components/sectionHeader/SectionHeader";
import LeafSVG from "./SVGs/LeafSVG";
import DiamondSVG from "./SVGs/DiamondSVG";
import KingSVG from "./SVGs/KingSVG";
import AboutUsBox from "./AboutUsBox";

export default function AboutUs() {
  const [aboutUsBoxInfos, setAboutUsBoxInfos] = useState([
    {
      id: 1,
      title: "دوره های اختصاصی",
      desc: "با پشتیبانی و کیفیت بالا ارائه میده !",
      icon: <CopyRightingSVG />,
    },
    {
      id: 2,
      title: "اجازه تدریس",
      desc: "به هر مدرسی رو نمیده. چون کیفیت براش مهمه !",
      icon: <LeafSVG />,
    },
    {
      id: 3,
      title: "دوره پولی و رایگان",
      desc: "براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده",
      icon: <DiamondSVG />,
    },
    {
      id: 4,
      title: "اهمیت به کاربر",
      desc: "اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست !",
      icon: <KingSVG />,
    },
  ]);

  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title={"ما چه کمکی بهتون میکنیم؟"}
          desc={"از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"}
        />
        <div className="container">
          <div className="row">
            {aboutUsBoxInfos.map((info) => ( <AboutUsBox key={info.id} {...info} /> ))}
          </div>
        </div>
      </div>
    </div>
  );
}
