import React from "react";
import "./contactUS.css";
import "../Register/Register.css";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "../../Components/hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../Components/validators/rules";
import { ToastContainer, toast } from "react-toastify";
import headerFetch from "../../Components/Form/headerFetch";

export default function ContactUS() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "mohammad",
        isValid: false,
      },
      email: {
        value: "miko",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [isNotRobotVarify, setIsNotRobotVarify] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.isFormValid || !isNotRobotVarify) {
      toast.error(
        "لطفا تمام فیلدها را به درستی پر کنید و تیک ربات نبودن را بزنید",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const feedback = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      body: formState.inputs.message.value,
    };

    await fetch(`http://localhost:4000/v1/contact`, {
      method: "POST",
      headers: headerFetch,
      body: JSON.stringify(feedback),
    }).then((res) => {
      if (res.ok) {
        toast.success("پیام شما با موفقیت ارسال شد!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error("ارسال پیام شما با شکست مواجه شد!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      console.log(res);
    });

    // در اینجا می‌توانید منطق ارسال فرم به سرور را اضافه کنید
    console.log("Form data:", {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      message: formState.inputs.message.value,
    });
  };

  return (
    <>
      <ToastContainer />
      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">تماس با ما</span>
          <span className="login__subtitle">
            نظرات و پیشنهادات خود را با ما در میان بگذارید
          </span>
          <form action="#" className="login-form" onSubmit={handleSubmit}>
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
                  minValidator(3),
                  maxValidator(30),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>

            <div className="login-form__username">
              <Input
                type="text"
                placeholder="آدرس ایمیل"
                className="login-form__username-input"
                element="input"
                id="email"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  emailValidator(),
                  maxValidator(40),
                ]}
              />
              <i className="login-form__username-icon fa fa-envelope"></i>
            </div>

            <div className="login-form__username">
              <Input
                type="text"
                placeholder="شماره تماس"
                className="login-form__username-input"
                element="input"
                id="phone"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  phoneValidator(),
                  minValidator(11),
                  maxValidator(11),
                ]}
              />
              <i className="login-form__username-icon fa fa-phone"></i>
            </div>

            <div className="login-form__username">
              <Input
                type="text"
                placeholder="متن پیام"
                className="login-form__username-input login-form__username-textarea"
                element="textarea"
                id="message"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(10),
                  maxValidator(500),
                ]}
              />
              <i
                className="login-form__username-icon fa fa-comment"
                style={{ fill: "#ccc" }}
              ></i>
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
              disabled={!formState.isFormValid || !isNotRobotVarify}
            >
              <i className="login-form__btn-icon fa fa-paper-plane"></i>
              <span className="login-form__btn-text">ارسال پیام</span>
            </Button>
          </form>

          <div className="login__des">
            <span className="login__des-title">راه های ارتباطی دیگر:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                آدرس: تهران، خیابان آزادی، دانشگاه صنعتی شریف
              </li>
              <li className="login__des-item">تلفن تماس: ۰۲۱-۶۶۱۶۶۱۶۶</li>
              <li className="login__des-item">ایمیل: info@example.com</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
