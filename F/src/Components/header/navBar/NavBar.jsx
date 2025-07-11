import React, { useContext, useEffect, useState } from "react";
import "./navBar.css";
import ArrowDownSVG from "./SVGs/ArrowDownSVG";
import Search from "./SVGs/Search";
import Basket from "./SVGs/Basket";
import AuthContext from "../../../Components/context/authContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  let authContext = useContext(AuthContext);

  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((menus) => setAllMenus(menus));
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
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
