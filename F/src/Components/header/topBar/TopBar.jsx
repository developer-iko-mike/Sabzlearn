import React, { memo, useEffect, useState } from "react";
import "./topBar.css";
import MailSVG from "./SVGs/MailSVG";
import PhoneSVG from "./SVGs/PhoneSVG";
import { Link } from "react-router-dom";

export default memo( function TopBar() {

  const [allItemTopBar , setAllItemTopBar] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/topbar")
      .then(res => res.json())
          .then(data => setAllItemTopBar(data));
  }, [])

  // useEffect(() => { getRandomItemFromTopBarItem(allItemTopBar,5) } , [allItemTopBar])

  const getRandomItemFromTopBarItem = (arr , countItem) => {
    const itemStatic = [...arr].sort(() => 0.5 - Math.random() * 5)
    return itemStatic.slice(0 , countItem)
  }
  
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {
                allItemTopBar && getRandomItemFromTopBarItem(allItemTopBar , 5).map(topbarItem => (                  
              <li className="top-bar__item" key={topbarItem._id}>
                <Link to={topbarItem.href} className="top-bar__link">
                  {topbarItem.title}
                </Link>
              </li>
                ))
              }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="/" className="top-bar__email-text top-bar__link">
                sabzlearn@gmail.com
              </a>
              <MailSVG />
              {/* <i className="fas fa-envelope top-bar__email-icon"></i> */}
            </div>
            <div className="top-bar__phone">
              <a href="/" className="top-bar__phone-text top-bar__link">
                09921558293
              </a>
              <PhoneSVG />
              {/* <!-- <i className="fas fa-phone top-bar__phone-icon"></i> Font Awesome fontawesome.com --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
)