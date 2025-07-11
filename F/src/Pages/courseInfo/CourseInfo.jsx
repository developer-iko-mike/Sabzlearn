import React, { useEffect, useState } from "react";
import "./courseInfo.css";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import StudentsSVG from "./SVGs/StudentsSVG";
import ClockSVG from "./SVGs/ClockSVG";
import CalendarSVG from "./SVGs/CalendarSVG";
import UserSVG from "./SVGs/UserSVG";
import PlaySVG from "./SVGs/PlaySVG";
import CourseInfoBox from "./courseInfobox/CourseInfoBox";
import CommentArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { data, Link, useParams } from "react-router-dom";
import useFormattedJalaliDate from "../../Components/hooks/useFormattedJalaliDate";
import { toast, ToastContainer } from "react-toastify";
import usePriceCalculator from "../../Components/hooks/usePriceCalculator";
import PathNotFound from "../404/pathNotFound/PathNotFound";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";

export default function CourseInfo() {
  
  const { courseName } = useParams();
  const [course, setCourse] = useState({});
  const [courseCate, setCourseCate] = useState({});
  const [courseComm, setCourseComm] = useState(null);
  const [courseSezn, setCourseSez] = useState(null);
  const [courseMont, setCourseMont] = useState("");
  const [courseTchr, setCourseTchr] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const createdAt = useFormattedJalaliDate(courseMont || "");
  const finalPrice = usePriceCalculator(course.price || 0, course.off || 0);

  useEffect(() => {
    const getCourseInfo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `http://localhost:4000/v1/courses/${courseName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user ? user.token : null}`,
            },
          }
        );

        if (!response.ok) {
          setCourse("notFounded");
          throw new Error("دوره مورد نظر یافت نشد");
        }

        const data = await response.json();
        console.log("دیتای دریافتی:", data);
        // بررسی وجود داده قبل از تنظیم stateها
        if (data) {
          setCourse(data);
          setCourseCate(data.categoryID || {});
          setCourseComm(data.comments || []);
          setCourseSez(data.sessions || []);
          setCourseMont(data.createdAt);
          setCourseTchr(data.creator)
        } else {
          setCourse("notFounded");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "خطا در دریافت اطلاعات دوره");
      } finally {
        setIsLoading(false);
      }
    };

    getCourseInfo();
  }, [courseName]); // فقط به تغییرات courseName واکنش نشان می‌دهد

  useEffect(() => {}, [course]);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error || course === "notFounded") {
    return <PathNotFound title="دوره مورد نظر پیدا نشد یا پاک شده!" />;
  }

  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: courseCate?.title || "دسته‌بندی نامشخص",
            to: courseCate?.shortName
              ? `category-info/${courseCate.shortName}`
              : "#",
          },
          {
            id: 2,
            title: course?.name || "عنوان دوره",
            to: course?.shortName ? `course-info/${course.shortName}` : "#",
          },
        ]}
      />
      <section className="course-info">
        <ToastContainer />
        <div className="container">
          <div className="row" style={{ marginBottom: 32 }}>
            <div className="col-6">
              <Link to="/front-end" className="course-info__link link">
                {courseCate.title}
              </Link>
              <h1 className="course-info__title">{course.name}</h1>
              <p className="course-info__text">{course.description}</p>
              <div className="course-info__social-media">
                <Link to="#" className="course-info__social-media-item">
                  <svg
                    className="svg-inline--fa fa-telegram course-info__icon"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="telegram"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z"
                    ></path>
                  </svg>
                  {/* <!-- <i className="fab fa-telegram-plane course-info__icon"></i> Font Awesome fontawesome.com --> */}
                </Link>
                <Link to="#" className="course-info__social-media-item">
                  <svg
                    className="svg-inline--fa fa-twitter course-info__icon"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                    ></path>
                  </svg>
                  {/* <!-- <i className="fab fa-twitter course-info__icon"></i> Font Awesome fontawesome.com --> */}
                </Link>
                <Link to="#" className="course-info__social-media-item">
                  <svg
                    className="svg-inline--fa fa-facebook-f course-info__icon"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook-f"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                    ></path>
                  </svg>
                  {/* <!-- <i className="fab fa-facebook-f course-info__icon"></i> Font Awesome fontawesome.com --> */}
                </Link>
              </div>

              <div className="flex justify-center xl:items-center lg:justify-between flex-wrap-reverse gap-y-4 gap-x-6">
                <button
                  id="register-in-course"
                  // onClick="sthe_add_item_to_cart(40 , `918d04e770`)"
                  className="buyBtn"
                  style={{
                    width: "fit-content",
                    minWidth: "150px",
                    padding: "0.5rem 1.5rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* <svg className="w-6 h-6">
                        <use href="#academic-cap"></use>
                      </svg> */}
                  افزودن به سبد خرید
                  {course?.off ? ` با ${course.off}% تخفیف` : ``}
                </button>
                <div className="flex items-end gap-x-2">
                  <span className="text-slate-500 fffantasy dark:text-white/70 text-xl line-through">
                    {course?.off ? course.price.toLocaleString() : null}
                  </span>
                  {course.price && finalPrice > 10000 ? (
                    <span className="flex font-danaBold text-2xl g-08">
                      {(Math.round(finalPrice / 1000) * 1000).toLocaleString()}
                      <span className="font-danaMedium text-lg">تومان</span>
                    </span>
                  ) : (
                    <span className="font-danaMedium text-lg">رایگان !</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-6">
              <video
                src="/courses/courseVideo/01-Introduction-video.mp4"
                poster={`${course.cover}`}
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
          <main className="main">
            <div className="container">
              <div className="row">
                <div className="col-8">
                  <div className="course">
                    {/* Start Course Boxes */}
                    <div className="course-boxes">
                      <div className="row">
                        <CourseInfoBox
                          title={"وضعیت دوره"}
                          subTiTle={
                            course.isComplated
                              ? "به اتمام رسیده"
                              : "درحال برگذاری"
                          }
                          icon={<StudentsSVG />}
                        />
                        <CourseInfoBox
                          title={"مدت زمان دوره"}
                          subTiTle={`${course.courseTime} ساعت`}
                          icon={<ClockSVG />}
                        />
                        <CourseInfoBox
                          title={"آخرین بروزرسانی"}
                          subTiTle={`${createdAt}`}
                          icon={<CalendarSVG />}
                        />
                        <CourseInfoBox
                          title={"روش پشتیبانی"}
                          subTiTle={`${course.supportProcess || "ندارد"}`}
                          icon={<UserSVG />}
                        />
                        <CourseInfoBox
                          title={"پیش نیاز"}
                          subTiTle={course.courseRequire || "ندارد"}
                          icon={<StudentsSVG />}
                        />
                        <CourseInfoBox
                          title={"نوع مشاهده"}
                          subTiTle={course.courseViewType}
                          icon={<PlaySVG />}
                        />
                      </div>
                    </div>
                    {/* Finish Course Boxes */}
                    {/* Start Course Progress */}
                    <div className="course-progress">
                      <div className="course-progress__header">
                        <svg
                          className="svg-inline--fa fa-chart-line course-progress__icon"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="chart-line"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z"
                          />
                        </svg>
                        {/* <i className="fas fa-chart-line course-progress__icon"></i> Font Awesome fontawesome.com */}
                        <span className="course-progress__title">
                          درصد پیشرفت دوره: 75%
                        </span>
                      </div>
                      <div className="progress course-progress__bar">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-label="Animated striped example"
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>
                    {/* Finish Course Progress */}
                    {/* Start Introduction */}
                    <div className="introduction" style={{ marginBottom: 32 }}>
                      <div className="introduction__item">
                        <span className="introduction__title title">
                          آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                        </span>
                        <img
                          src="/courses/info/1.gif"
                          alt="course info image"
                          className="introduction__img img-fluid"
                        />
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود
                          دارد و سالانه چندین کتابخانه جدید نیز به این لیست
                          اضافه می شود که در بازار کار به شدت از آن ها استفاده
                          می شود و اگر بدون بلد بودن این کتابخانه ها وارد بازار
                          کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید
                          شوید!
                        </p>
                        <p className="introduction__text">
                          در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                          کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما
                          عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به
                          بازار کار نداشته باشید
                        </p>
                      </div>
                      <div className="introduction__item">
                        <span className="introduction__title title">
                          هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و
                          کسب درآمد)
                        </span>
                        <img
                          src="/courses/info/2.jpg"
                          alt="course info image"
                          className="introduction__img img-fluid"
                        />
                        <p className="introduction__text">
                          وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی
                          شدم، از کتابخانه هایی به اسم Lodash و Formik استفاده
                          می شد، در حالی که من اولین بارم بود اسم Formik را می
                          شنیدم و تا اون موقع از این کتابخانه ها استفاده نکرده
                          بودم.
                        </p>
                        <p className="introduction__text">
                          همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی
                          از مهم ترین مباحثی هستند که هر برنامه نویس وب برای
                          ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید
                          با آن ها کار کرده باشد{" "}
                        </p>
                        <p className="introduction__text">
                          همان طور که از اسم این دوره مشخص است، هدف از این دوره
                          آموزش 20 مورد از کاربردی ترین و پر استفاده ترین
                          کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از
                          این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه
                          نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر
                          یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد
                          کنید.
                        </p>
                        <p className="introduction__text">
                          شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه
                          خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک
                          کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه
                          جدید ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟!
                          قطعا نه.
                        </p>
                        <p className="introduction__text">
                          در این دوره سعی کردیم علاوه بر آموزش مستقیم هر
                          کتابخانه، نحوه یادگیری یک کتابخانه جدید را نیز به شما
                          عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته
                          هیچ دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به
                          دنیای جاوا اسکریپت و وب اضافه شد، به راحتی بتوانید آن
                          را یاد بگیرید.
                        </p>
                      </div>
                      <div className="introduction__btns">
                        <Link to="#" className="introduction__btns-item">
                          دانلود همگانی ویدیوها
                        </Link>
                        <Link to="#" className="introduction__btns-item">
                          دانلود همگانی پیوست‌ها
                        </Link>
                      </div>
                      <div className="introduction__topic">
                          {courseSezn.length  ? courseSezn.map((session, index) => (
                        <Accordion defaultActiveKey="0" key={session._id}>
                                <Accordion.Item
                                  eventKey="0"
                                  className="accordion"
                                >
                                  <Accordion.Header>
                                    معرفی دوره
                                  </Accordion.Header>
                                  <Accordion.Body className="accordion-body introduction__accordion-body">
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">
                                        {index + 1}
                                      </span>
                                      <svg
                                        className="svg-inline--fa fa-youtube introduction__accordion-icon"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="youtube"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        data-fa-i2svg=""
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"
                                        />
                                      </svg>
                                      {/* <i className="fab fa-youtube introduction__accordion-icon"></i> Font Awesome fontawesome.com */}
                                      <Link
                                        href="#"
                                        className="introduction__accordion-link"
                                      >
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                      </span>
                                    </div>
                                  </Accordion.Body>
                                </Accordion.Item>
                        </Accordion>
                              ))
                            : null}
                      </div>
                    </div>
                    {/* Finish Introduction */}
                    {/* Start Teacher Details */}
                    <div className="techer-details">
                      <div className="techer-details__header">
                        <div className="techer-details__header-right">
                          <img
                            src="/courses/info/teacher.jfif"
                            alt="Teacher Profile"
                            className="techer-details__header-img"
                          />
                          <div className="techer-details__header-titles">
                            <Link
                              to="#"
                              className="techer-details__header-link"
                            >
                              {/* {courseTchr.name} */}
                              محمدامین سعیدی راد
                            </Link>
                            <span className="techer-details__header-skill">
                              Front End &amp; Back End Developer
                            </span>
                          </div>
                        </div>
                        <div className="techer-details__header-left">
                          <svg
                            className="svg-inline--fa fa-chalkboard-user techer-details__header-icon"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chalkboard-user"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            data-fa-i2svg=""
                          >
                            <path
                              fill="currentColor"
                              d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"
                            />
                          </svg>
                          {/* <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i> Font Awesome fontawesome.com */}
                          <span className="techer-details__header-name">
                            {/* {courseTchr.role} */}
                            ادمین
                          </span>
                        </div>
                      </div>
                      <p className="techer-details__footer">
                        اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به
                        2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم
                        در زمینه وب فعالیت داشته باشم.و..
                      </p>
                    </div>
                    {/* Finish Teacher Details */}
                    <CommentArea courseShortName={courseName} />
                  </div>
                </div>
                <div className="col-4">
                  <div className="courses-info">
                    <div className="course-info">
                      <div className="course-info__register">
                        {/* {isUserBuyingCourse ? ( */}
                        <span className="course-info__register-title flex items-center justify-center">
                          <svg
                            className="svg-inline--fa fa-graduation-cap course-info__register-icon"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="graduation-cap"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            data-fa-i2svg=""
                            style={{ marginLeft: 12 }}
                          >
                            <path
                              fill="currentColor"
                              d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z"
                            />
                          </svg>
                          {/* <i className="fas fa-graduation-cap course-info__register-icon"></i> Font Awesome fontawesome.com */}
                          <span>دانشجوی دوره هستید</span>
                        </span>
                        {/* ) : ( */}
                        {/* <span className="course-info__register-title">
                                ثبت نام در دوره
                              </span> */}
                        {/* )} */}
                      </div>
                    </div>
                    <div className="course-info">
                      <div className="course-info__total">
                        <div className="course-info__top">
                          <div className="course-info__total-sale">
                            <svg
                              className="svg-inline--fa fa-user-graduate course-info__total-sale-icon"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="user-graduate"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z"
                              />
                            </svg>
                            {/* <i className="fas fa-user-graduate course-info__total-sale-icon"></i> Font Awesome fontawesome.com */}
                            <span className="course-info__total-sale-text">
                              تعداد دانشجو :
                            </span>
                            <span className="course-info__total-sale-number">
                              {course.studentCount.toLocaleString() ||
                                "هنوز دانشجویی شرکت نکرده"}
                            </span>
                          </div>
                        </div>
                        <div className="course-info__bottom">
                          <div className="course-info__total-comment">
                            <svg
                              className="svg-inline--fa fa-comments course-info__total-comment-icon"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="comments"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z"
                              />
                            </svg>
                            {/* <i className="far fa-comments course-info__total-comment-icon"></i> Font Awesome fontawesome.com */}
                            <span className="course-info__total-comment-text">
                              {courseComm.length} دیدگاه
                            </span>
                          </div>
                          <div className="course-info__total-view">
                            <svg
                              className="svg-inline--fa fa-eye course-info__total-view-icon"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="eye"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"
                              />
                            </svg>
                            {/* <i className="far fa-eye course-info__total-view-icon"></i> Font Awesome fontawesome.com */}
                            <span className="course-info__total-view-text">
                              {course.view.toLocaleString()} بازدید
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="course-info"
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        navigator.clipboard
                          .writeText(
                            `https://sabzlearn.ir/?p=${course.shortLink}`
                          )
                          .then(() => {
                            toast.success(`لینک با موفقیت کپی شد`, {
                              position: "bottom-right",
                              autoClose: 2000, // in ms
                              draggable: true,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            toast.error(`کپی لینک با شکست مواجه شد`, {
                              position: "bottom-right",
                              autoClose: 2000, // in ms
                              draggable: true,
                            });
                          });
                      }}
                    >
                      <div className="course-info__header-short-url">
                        <svg
                          className="svg-inline--fa fa-link course-info__short-url-icon"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="link"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"
                          />
                        </svg>
                        {/* <i className="fas fa-link course-info__short-url-icon"></i> Font Awesome fontawesome.com */}
                        <span className="course-info__short-url-text">
                          لینک کوتاه
                        </span>
                      </div>
                      <span
                        className="course-info__short-url"
                        style={{
                          textAlign: "left",
                          fontSize: 18,
                        }}
                      >
                        sabzlearn.ir/?p={course.shortLink}
                      </span>
                    </div>
                    <div className="course-info">
                      <span className="course-info__topic-title">
                        سرفصل های دوره
                      </span>
                      <span className="course-info__topic-text">
                        برای مشاهده و یا دانلود دوره روی کلمه
                        <Link
                          to="#"
                          style={{ color: "blue", fontWeight: "bold" }}
                        >
                          {" "}
                          لینک{" "}
                        </Link>
                        کلیک کنید
                      </span>
                    </div>
                    <div className="course-info">
                      <span className="course-info__courses-title">
                        دوره های مرتبط
                      </span>
                      <ul className="course-info__courses-list">
                        <li className="course-info__courses-list-item">
                          <Link
                            to="/course-info/js-projects"
                            className="course-info__courses-link"
                          >
                            <img
                              src="/courses/js-projects.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              پروژه های تخصصی با جاوا اسکریپت
                            </span>
                          </Link>
                        </li>
                        <li className="course-info__courses-list-item">
                          <Link
                            to="/course-info/js-expert"
                            className="course-info__courses-link"
                          >
                            <img
                              src="/courses/js_master.webp"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              اموزش جاوا اسکریپت از صفر تا پیشرفته
                            </span>
                          </Link>
                        </li>
                        <li className="course-info__courses-list-item">
                          <Link
                            to="/course-info/node_expert"
                            className="course-info__courses-link"
                          >
                            <img
                              src="/courses/node-advanced.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              دوره Api نویسی
                            </span>
                          </Link>
                        </li>
                        <li className="course-info__courses-list-item">
                          <Link
                            to="/course-info/django-pro"
                            className="course-info__courses-link"
                          >
                            <img
                              src="/courses/django-pro.png"
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              متخصص جنگو
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
