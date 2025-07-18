import React, { useContext, useEffect, useState } from "react";
import "./navBar.css";
import ArrowDownSVG from "./SVGs/ArrowDownSVG";
import Search from "./SVGs/Search";
import Basket from "./SVGs/Basket";
import AuthContext from "../../../Components/context/authContext";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

export default function NavBar() {
  let authContext = useContext(AuthContext);

  const [allMenus, setAllMenus] = useState([]);
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((menus) => setAllMenus(menus));
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div
            className="main-header__midd w5 h5 bsdl br10 dnone jcc aic cp"
            onClick={() => setIsShowBurgerMenu(true)}
          >
            <span className="main-header__midd__burgerMenu"></span>
            <div>
              <ul
                className="main-header__menu____mobile dnone ps"
                style={{ right: isShowBurgerMenu ? 0 : -400 }}
              >
                <li
                  className="main-header__menu____mobile_____logo tc"
                  style={{ height: "6rem" }}
                >
                  <img
                    src="/logo/Logo.png"
                    className="main-header__logo"
                    alt="لوگوی سبزلرن"
                  />
                </li>
                <li className="main-header__item main-header__item____mobile fs1-5">
                  <Link to="/" className="main-header__link">
                    صفحه اصلی
                  </Link>
                </li>

                {allMenus.length &&
                  allMenus.map((menu) =>
                    menu.submenus.length ? (
                      <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0" className="accordion">
                          <Accordion.Header className="main-header__menu____mobile____burger______headerAccordion">
                            {menu.title}
                          </Accordion.Header>
                          {menu.submenus.map((subMenu) => (
                            <Accordion.Body className="accordion-body introduction__accordion-body">
                              <Link
                                to={subMenu.href}
                                className="main-header__link"
                              >
                                {subMenu.title}
                              </Link>
                            </Accordion.Body>
                          ))}
                        </Accordion.Item>
                      </Accordion>
                    ) : (
                      <li className="main-header__item main-header__item____mobile fs1-5">
                        <Link to="/" className="main-header__link">
                          {menu.title}
                        </Link>
                      </li>
                    )
                  )}
                <li className="df w100">
                  <Link to="/" className="main-header__search-btn fg">
                    <Search />
                  </Link>
                  <Link to="/" className="main-header__cart-btn fg">
                    <Basket />
                  </Link>
                </li>
                <li>
                  {authContext.userInfos.name ? (
                    <Link to="/" className="main-header__profile">
                      <span className="main-header__profile-text">
                        {authContext.userInfos.name}
                      </span>
                    </Link>
                  ) : (
                    <Link to="/register" className="main-header__profile">
                      <span className="main-header__profile-text">
                        ورود / ثبت نام
                      </span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="main-header__right">
            <img
              src="/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

              {allMenus.length &&
                allMenus.map((menu) => (
                  <li className="main-header__item" key={menu._id}>
                    <div className="main-header__link-wrapper">
                      <Link to={`${menu.href}/1`} className="main-header__link">
                        {menu.title}
                      </Link>
                      {menu.submenus.length ? (
                        <>
                          <ArrowDownSVG />
                          <ul className="main-header__dropdown">
                            {menu.submenus.map((subMenu) => (
                              <li
                                className="main-header__dropdown-item"
                                key={subMenu._id}
                              >
                                <Link
                                  to={subMenu.href}
                                  className="main-header__dropdown-link"
                                >
                                  {subMenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="main-header__left">
            <Link to="/" className="main-header__search-btn">
              <Search />
              {/* <!-- <i className="fas fa-search main-header__search-icon"></i> Font Awesome fontawesome.com --> */}
            </Link>
            <Link to="/" className="main-header__cart-btn">
              <Basket />
              {/* <!-- <i className="fas fa-shopping-cart main-header__cart-icon"></i> Font Awesome fontawesome.com --> */}
            </Link>

            {authContext.userInfos.name ? (
              <Link to="/" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/register" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
