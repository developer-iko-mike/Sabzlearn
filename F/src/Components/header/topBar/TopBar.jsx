import React, { memo, useEffect, useState } from "react";
import "./topBar.css";
import MailSVG from "./SVGs/MailSVG";
import PhoneSVG from "./SVGs/PhoneSVG";
import { Link } from "react-router-dom";

export default memo(function TopBar() {
  const [allItemTopBar, setAllItemTopBar] = useState([]);
  const [countItem, setCountItem] = useState(3);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/topbar")
      .then((res) => res.json())
      .then((data) => setAllItemTopBar(data));
  }, []);

  // useEffect(() => { getRandomItemFromTopBarItem(allItemTopBar,5) } , [allItemTopBar])

  const getRandomItemFromTopBarItem = (arr, countItem) => {
    const itemStatic = [...arr].sort(() => 0.5 - Math.random() * 5);
    return itemStatic.slice(0, countItem);
  };

  useEffect(() => {
    const width = window.innerWidth;

    switch (true) {
      case width < 576:
        setCountItem(0)
        break;
      case width >= 576 && width < 768:
        setCountItem(1)
        break;
      case width >= 768 && width < 992:
        setCountItem(2)
        break;
      case width >= 992 && width < 1200:
        setCountItem(3)
        break;
      case width >= 1200 && width < 1400:
        setCountItem(4)
        break;
      case width >= 1400:
        setCountItem(5)
        break;
      default:
        setCountItem(3)
    }
  }, []);

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {allItemTopBar &&
                getRandomItemFromTopBarItem(allItemTopBar, countItem).map(
                  (topbarItem) => (
                    <li className="top-bar__item" key={topbarItem._id}>
                      <Link to={topbarItem.href} className="top-bar__link">
                        {topbarItem.title}
                      </Link>
                    </li>
                  )
                )}
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
});
