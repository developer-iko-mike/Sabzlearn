import React, { useEffect, useState , useLayoutEffect } from "react";
import "./articleInfo.css";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import ScoreCountStars from "../../Components/scoreCountStars/ScoreCountStars";
import CommentArea from "../../Components/CommentsTextArea/CommentsTextArea";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ArticleInfo() {
  const { articleName } = useParams();

  const [article, setArticle] = useState({});
  const [articleCategory, setArticleCategory] = useState({});

  const getAllArticle = async () => {
    await fetch(`http://localhost:4000/v1/articles`)
      .then((res) => {
        if (!res.ok) {
          throw "خطا در دریافت ارتیکل";
        }
        return res.json();
      })
      .then((articleData) => {
        if (articleData && articleData.length) {
          const mainArticle = articleData.filter(
            (articl) => articl.shortName === articleName
          );
          setArticle(mainArticle);
          console.log("filter all article and use Parametar: " + mainArticle);
        } else {
          console.log("false");
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: "bottom-center",
        });
      });
  };

  useEffect(() => {
    const getArticle = async () => {
      await fetch(`http://localhost:4000/v1/articles/${articleName}`)
        .then((res) => {
          if (!res.ok) {
            throw "خطا در دریافت مقاله";
          }
          return res.json();
        })
        .then((resArticle) => {
          if (resArticle && resArticle.title) {
            console.log("trueValue: ", resArticle);
            setArticle(resArticle);
            setArticleCategory(resArticle.categoryID);
          } else {
            getAllArticle();
          }
        })
        .catch((err) => toast.error(err, { position: "bottom-center" }));
    };

    getArticle();
  }, []);

    useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(article);

  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "مقاله ها",
            to: "article-info",
          },
          {
            id: 2,
            title: "ویو در مقابل ریاکت",
            to: "article-info/vue-vs-react",
          },
        ]}
      />
      <main className="main">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article__title">
                    {article.title}
                </h1>
                <div className="article__header">
                  <div className="article-header__category article-header__item">
                    <svg
                      className="svg-inline--fa fa-folder article-header__icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="folder"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"
                      />
                    </svg>
                    {/* <i className="far fa-folder article-header__icon"></i> Font Awesome fontawesome.com */}
                    <a href="#" className="article-header__text">
                      {articleCategory.title || "برای این مقاله ثبت نشده دسته بندی"}
                    </a>
                  </div>
                  <div className="article-header__category article-header__item">
                    <svg
                      className="svg-inline--fa fa-user article-header__icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="user"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"
                      />
                    </svg>
                    {/* <i className="far fa-user article-header__icon"></i> Font Awesome fontawesome.com */}
                    <span className="article-header__text">
                      {" "}
                      ارسال شده توسط قدیر
                    </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <svg
                      className="svg-inline--fa fa-clock article-header__icon"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="clock"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"
                      />
                    </svg>
                    {/* <i className="far fa-clock article-header__icon"></i> Font Awesome fontawesome.com */}
                    <span className="article-header__text">
                      {" "}
                      ارسال شده توسط قدیر
                    </span>
                  </div>
                  <div className="article-header__category article-header__item">
                    <svg
                      className="svg-inline--fa fa-eye article-header__icon"
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
                    {/* <i className="far fa-eye article-header__icon"></i> Font Awesome fontawesome.com */}
                    <span className="article-header__text"> 2.14k بازدید</span>
                  </div>
                </div>
                <img
                  src={article.cover}
                  alt="Article Cover"
                  className="article__banner"
                  style={{
                    width: "100%",
                  }}
                />
                <div className="article__score">
                  <ScoreCountStars ScoreCount={0} />
                  <span className="article__score-text">
                    {article.rating}/5 - ({Math.round(article.rating)} امتیاز)
                  </span>
                </div>
                <p className="article__paragraph paragraph">
{article.description}
                </p>
                <div className="article-read">
                  <span className="article-read__title">
                    آنچه در این مقاله خواهید خواند
                  </span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                      </a>
                    </li>
                    <li className="article-read__item">
                      <a href="#" className="article-read__link">
                        ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                      </a>
                    </li>
                  </ul>
                </div>
                <img
                  src="/blog/2.jpg"
                  alt="Article Image"
                  className="article__seconadary-banner"
                />
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/blog/4.png"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/blog/3.jpg"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>
                <div className="article-social-media">
                  <span className="article-social-media__text">
                    اشتراک گذاری :
                  </span>
                  <a href="#" className="article-social-media__link">
                    <svg
                      className="svg-inline--fa fa-telegram article-social-media__icon"
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
                      />
                    </svg>
                    {/* <i className="fab fa-telegram-plane article-social-media__icon"></i> Font Awesome fontawesome.com */}
                  </a>
                  <a href="#" className="article-social-media__link">
                    <svg
                      className="svg-inline--fa fa-twitter article-social-media__icon"
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
                      />
                    </svg>
                    {/* <i className="fab fa-twitter article-social-media__icon"></i> Font Awesome fontawesome.com */}
                  </a>
                  <a href="#" className="article-social-media__link">
                    <svg
                      className="svg-inline--fa fa-facebook-f article-social-media__icon"
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
                      />
                    </svg>
                    {/* <i className="fab fa-facebook-f article-social-media__icon"></i> Font Awesome fontawesome.com */}
                  </a>
                </div>
              </div>

              <div className="suggestion-articles">
                <div className="row">
                  <div className="col-6">
                    <div className="suggestion-articles__right suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <svg
                          className="svg-inline--fa fa-arrow-right suggestion-articles__icon"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="arrow-right"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
                          />
                        </svg>
                        {/* <i className="fas fa-arrow-right suggestion-articles__icon"></i> Font Awesome fontawesome.com */}
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="suggestion-articles__left suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <svg
                          className="svg-inline--fa fa-arrow-left suggestion-articles__icon"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="arrow-left"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"
                          />
                        </svg>
                        {/* <i className="fas fa-arrow-left suggestion-articles__icon"></i> Font Awesome fontawesome.com */}
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <CommentArea userName={"محمد امین سعیدی راد"} />
            </div>
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <span className="course-info__courses-title">
                    پر امتیازترین دوره ها
                  </span>
                  <ul className="course-info__courses-list">
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/courses/js-projects.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/courses/fareelancer.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          تعیین قیمت پروژه های فریلنسری
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/courses/node-advanced.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          دوره Api نویسی
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-list-item">
                      <a href="#" className="course-info__courses-link">
                        <img
                          src="/courses/django-pro.png"
                          alt="Course Cover"
                          className="course-info__courses-img"
                        />
                        <span className="course-info__courses-text">
                          متخصص جنگو
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    دسترسی سریع
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <Link to="/" className="sidebar-articles__link">
                        صفحه اصلی
                      </Link>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <Link
                        to="/category-info/frontend/1"
                        className="sidebar-articles__link"
                      >
                        فرانت اند
                      </Link>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <Link
                        to="/category-info/security/1"
                        className="sidebar-articles__link"
                      >
                        امنیت
                      </Link>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <Link
                        to="/category-info/python/1"
                        className="sidebar-articles__link"
                      >
                        پایتون
                      </Link>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <Link
                        to="/category-info/softskills/1"
                        className="sidebar-articles__link"
                      >
                        مهارت های نرم
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    مقاله های جدید
                  </span>
                  <ul className="last-articles__list">
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="last-articles__item">
                      <a href="#" className="last-articles__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    دسته بندی مقالات
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        صفحه اصلی
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        فرانت اند
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        امنیت
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        پایتون
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        مهارت های نرم
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="course-info">
                  <span className="course-info__courses-title">
                    دوره های جدید
                  </span>
                  <ul className="sidebar-articles__list">
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        صفحه اصلی
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        فرانت اند
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        امنیت
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        پایتون
                      </a>
                    </li>
                    <li className="sidebar-articles__item">
                      <svg
                        className="svg-inline--fa fa-angle-left sidebar-articles__icon"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="angle-left"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                        />
                      </svg>
                      {/* <i className="fas fa-angle-left sidebar-articles__icon"></i> Font Awesome fontawesome.com */}
                      <a href="#" className="sidebar-articles__link">
                        مهارت های نرم
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
