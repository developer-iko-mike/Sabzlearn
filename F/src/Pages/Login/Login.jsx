import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import { useForm } from "../../Components/hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Components/validators/rules";
import { ToastContainer, toast } from "react-toastify";
import Lock from "../../Components/Form/SVGs/Lock";
import UnLock from "../../Components/Form/SVGs/UnLock";
import headerFetch from "../../Components/Form/headerFetch";
import AuthContext from "../../Components/context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

export default function Login() {
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [mainPasType, setMainPasType] = useState("password");
  const [isNotRobotVarify, setIsNotRobotVarify] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const userLogin = async (event) => {
    event.preventDefault();

    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    await fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then(async (result) => {
        console.log(result);
        const token = result.accessToken;

        if (result.accessToken) {
          localStorage.setItem("user", JSON.stringify({token: result.accessToken})); // ⬅️ اینجا هم اضافه کن
          authContext.login(result.user, result.accessToken);
        }

        // مرحله دوم: دریافت اطلاعات کاربر

        const loadingToast = toast.loading("در حال دریافت اطلاعات کاربر...", {
          position: "bottom-right",
        });

        const userRes = await fetch("http://localhost:4000/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userRes.json();
        toast.dismiss(loadingToast);
        // حالا هم توکن داریم، هم اطلاعات کاربر

        if (token) {
          const decoded = jwtDecode(token);

          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
          }

          Swal.fire({
            title: "ورود با موفقیت انجام شد!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "ورود به پنل",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });

          return authContext.login(userData, token);
        }

        authContext.login(userData, token);

        Swal.fire({
          title: "ورود با موفقیت انجام شد!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "ورود به پنل",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })

      .catch((err) => {
        console.log(`error =>`, err);
        toast.error("همچین کاربری وجود ندارد", {
          position: "bottom-right",
          autoClose: 3000,
        });
      });

    console.log(userData);
  };

  const togglePasswordType = () => setMainPasType("text");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainPasType("password");
    }, 5000);

    return () => clearTimeout(timer);
  }, [mainPasType]);

  return (
    <>
      <ToastContainer />
      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                id="username"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(25),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>

            <div
              className="login-form__password"
              onFocus={togglePasswordType}
              onClick={togglePasswordType}
            >
              <Input
                element="input"
                id="password"
                type={mainPasType}
                className="login-form__password-input"
                placeholder="رمز عبور"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />

              {mainPasType === "password" ? <Lock /> : <UnLock />}
            </div>
            <div className="login-form__username recaptchaParent">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={() => setIsNotRobotVarify(true)}
                style={{ margin: "7px 0px 5px" }}
              />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid && isNotRobotVarify
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={userLogin}
              disabled={!formState.isFormValid || !isNotRobotVarify}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
