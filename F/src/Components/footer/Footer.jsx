import React from "react";
import "./footer.css";
import FooterItem from "./FooterItem";
import { Link } from "react-router-dom";
import Input from "../../Components/Form/Input";
import { emailValidator } from "../validators/rules";
import { useForm } from "../../Components/hooks/useForm";
import headerFetch from "../Form/headerFetch";
import swai from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Footer() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  const navigate = useNavigate();

    const addEmailToNewsLatter = async (e) => {
    e.preventDefault();
    
    // ابتدا بررسی کنید که inputs وجود دارد
    if (!formState || !formState.inputs || !formState.inputs.email) {
      toast.error("خطا در فرم، لطفاً صفحه را مجدداً بارگذاری کنید", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const { value, isValid } = formState.inputs.email;
    
    if (value && isValid) {
      try {
        const response = await fetch("https://localhost:4000/v1/newsLetters", {
          method: "POST",
          headers: headerFetch,
          body: JSON.stringify({ email: value }),
        });

        if (!response.ok) {
          throw new Error("خطا در ارسال اطلاعات");
        }

        await swai({
          title: "عملیات با موفقیت انجام شد شما در لیست اخبار هستید",
          icon: "success",
          buttons: "ورود به پنل",
        });
        navigate("/");
      } catch (error) {
        toast.error("همچین کاربری وجود ندارد", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("لطفا یک ایمیل معتبر وارد کنید", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <footer className="footer">
      <ToastContainer />
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title={"درباره ما"}>
              <p className="footer-widgets__text">
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای
                پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد
                هستند که هوای کاربر های عزیز رو داشته باشند !
              </p>
            </FooterItem>
            <FooterItem title={"آخرین مطالب"}>
              <div className="footer-widgets__links">
                <a href="#" className="footer-widgets__link">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="#" className="footer-widgets__link">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                  پایتون
                </a>
                <a href="#" className="footer-widgets__link">
                  آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                  گام و تصویری
                </a>
                <a href="#" className="footer-widgets__link">
                  بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                  معایب و مزایا
                </a>
                <a href="#" className="footer-widgets__link">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                  رایگان
                </a>
              </div>
            </FooterItem>
            <FooterItem title={"دسترسی سریع"}>
              <div className="row">
                <Link to="/contact-us" style={{ marginBottom: 12 }}>
                  تماس با ما
                </Link>
                <div className="col-6">
                  <Link to="/course-info/html" className="footer-widgets__link">
                    آموزش HTML
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/course-info/css-course"
                    className="footer-widgets__link"
                  >
                    آموزش CSS
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/course-info/js-expert"
                    className="footer-widgets__link"
                  >
                    آموزش جاوا اسکریپت
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/course-info/bootstrap"
                    className="footer-widgets__link"
                  >
                    آموزش بوت استرپ
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/course-info/react_expert"
                    className="footer-widgets__link"
                  >
                    آموزش ریکت
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to="/course-info/py-expert"
                    className="footer-widgets__link"
                  >
                    آموزش پایتون
                  </Link>
                </div>
                <div className="col-12">
                  <span className="footer-widgets__title">
                    اشتراک در خبرنامه
                  </span>
                  <span className="footer-widgets__text text-center d-block">
                    جهت اطلاع از اخرین اخبار و تخفیف ها عضو شوید
                  </span>
                  <form
                    bindsubmit="#"
                    className="footer-widgets__form footerNewsLatterForm"
                    onSubmit={addEmailToNewsLatter}
                  >
                    <Input
                      element="input"
                      type="text"
                      className="footer-widgets__input"
                      id="email" // این آی دی باید با نام فیلد در initialState یکسان باشد
                      placeholder="ایمیل خود را وارد کنید"
                      onInputHandler={onInputHandler} // نام پراپ باید دقیقاً همین باشد
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      className="footer-widgets__btn"
                      onSubmit={addEmailToNewsLatter}
                    >
                      عضویت
                    </button>
                  </form>
                </div>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <span className="footer__copyright-text">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
        </span>
      </div>
    </footer>
  );
}
