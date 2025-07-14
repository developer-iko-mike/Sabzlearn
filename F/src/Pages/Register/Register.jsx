import React, { useState, useContext, useEffect } from "react";
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
import AuthContext from "../../Components/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Lock from "../../Components/Form/SVGs/Lock";
import UnLock from "../../Components/Form/SVGs/UnLock";
import headerFetch from "../../Components/Form/headerFetch";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const authContext = useContext(AuthContext);
  const [mainPasType, setMainPasType] = useState("password");
  const [isNotRobotVarify ,setIsNotRobotVarify] = useState(false)

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const registerNewUser = (event) => {
    event.preventDefault();

    if (
      formState.inputs.confirmPassword.value === formState.inputs.password.value
    ) {
      const newUserInfos = {
        name: formState.inputs.name.value,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.confirmPassword.value,
      };

      fetch(`http://localhost:4000/v1/auth/register`, {
        method: "POST",
        headers: headerFetch,
        body: JSON.stringify(newUserInfos),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          if (result.accessToken) {
            Swal.fire({
              title: "ثبت نام با موفقیت انجام شد!",
              icon: "success",
              showCancelButton: false,
              confirmButtonText: "ورود به پنل",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
            authContext.login(result.user, result.accessToken);
          }
        });
    } else {
      toast.error(`تکرار رمز عبور با رمز عبور طتابق ندارد`, {
        position: "bottom-right",
        autoClose: 3000, // in ms
        draggable: true,
      });
    }
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
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="login-form__username-input"
                element="input"
                id="name"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                type="text"
                placeholder="نام کاربری"
                className="login-form__username-input"
                element="input"
                id="username"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="text"
                placeholder="آدرس ایمیل"
                className="login-form__username-input"
                element="input"
                id="email"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  maxValidator(25),
                  emailValidator(),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="password"
                placeholder="رمز عبور"
                className="login-form__password-input"
                element="input"
                id="password"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
              />
              <Lock />
            </div>

            <div
              className="login-form__password"
              onFocus={togglePasswordType}
              onClick={togglePasswordType}
            >
              <Input
                type={mainPasType}
                placeholder="تکرار رمز عبور"
                className="login-form__password-input"
                element="input"
                id="confirmPassword"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
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
              onClick={registerNewUser}
              disabled={!formState.isFormValid || !isNotRobotVarify}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
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
