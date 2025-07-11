import React, { useEffect, useState } from "react";
import "./search.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Course from "../../Components/course/Course";
import SectionHeader from "../../Components/sectionHeader/SectionHeader";
import ArticleBox from "../home/Components/articles/articleBox/ArticleBox";
import PathNotFound from "../404/pathNotFound/PathNotFound";
import { toast, ToastContainer } from "react-toastify";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const [is404, setIs404] = useState(false);

  const { value } = useParams();
  const navigate = useNavigate();

  function truncateDescription(desc, maxLength = 133) {
    if (desc.length <= maxLength) return desc;
    return desc.substr(0, desc.lastIndexOf(" ", maxLength)) + " ...";
  }

  useEffect(() => {
    if (courses.length === 0 && articles.length === 0) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [courses, articles, navigate]);

  useEffect(() => {
    // const getSearchResult = async () => {
    //   await fetch(`http://localhost:4000/v1/search/${value}`)
    //     .then((res) => {
    //      if (!res.ok) {
    //         if (res.status === 404) {
    //           setIs404(true)
    //         }
    //         // toast.error("خطا در دریافت اطلاعات");
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setArticles(data.allResultArticles || []);
    //       setCourses(data.allResultCourses || []);
    //     })
    // };
    const getSearchCourseResult = async () => {
      await fetch("http://localhost:4000/v1/courses")
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              return setIs404(true);
            }
            throw "خطایی رخ داد لطفا بعدا دوباره تلاش کنید";
          }
          return res.json();
        })
        .then((coursesData) => {
          console.log(coursesData);
          const filteredDataWithParam = coursesData.filter((course) =>
            course.name.toLowerCase().includes(value.toLowerCase())
          );
          setCourses(filteredDataWithParam);
        });
    };
    const getSearchArticleResult = async () => {
      await fetch("http://localhost:4000/v1/articles")
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              return setIs404(true);
            }
            throw "خطایی رخ داد لطفا بعدا دوباره تلاش کنید";
          }
          return res.json();
        })
        .then((articleData) => {
          console.log(articleData);
          const filteredDataWithParam = articleData.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase())
          );
          setArticles(filteredDataWithParam);
        });
    };
    getSearchCourseResult();
    getSearchArticleResult();
  }, [value]);

  if (is404) {
    return (
      <PathNotFound
        title="خطایی سمت سرور رخ داد"
        caption="لظفا بعدا دوباره امتحان کنید"
      />
    );
  }

  if (!courses.length && !articles.length) {
    return (
      <div className="container">
        <div className="alert alert-warning mt-3 mb2">
          برای جستجو شما نتیجه پیدا نشد
          <Link to={"/"}> بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {courses.length ? (
        <>
          <ToastContainer />
          <div className="container">
            <SectionHeader
              title={"جدیدترین دوره ها"}
              desc={"سکوی پرتاپ شما به سمت موفقیت"}
              btnTiTle={"تمامی دوره ها"}
              link={"/allCourse/1"}
            />
            <div className="courses-content mt2">
              <div className="container">
                <div className="row">
                  {courses.map((course) => (
                    <Course
                      key={course._id}
                      cover={course.cover}
                      title={course.name}
                      link={`/course-info/${course.shortName}`}
                      score={4}
                      teacher={"حمید رضا عبادی"}
                      teacherLink={"/"}
                      watchUserCount={course.studentCount}
                      price={course.price < 10_000 ? "" : course.price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="alert alert-warning mt-3 mb2">
            هیچ دوره ای مطابق با سرچ شما پیدا نشد
            <Link to={"/"}> بازگشت به صفحه اصلی</Link>
          </div>
        </div>
      )}

      {articles.length ? (
        <>
          <div className="container">
            <SectionHeader
              title={"مقاله های مرتبط با سرچ شما"}
              desc={"پیش به سوی ارتقای دانش"}
              btnTiTle={"تمامی مقاله ها"}
              link={"/allArticles/1"}
            />
            <div className="articles__content">
              <div className="row">
                {articles.map((article) => (
                  <ArticleBox
                    key={article._id}
                    title={article.title}
                    desc={truncateDescription(article.description)}
                    cover={article.cover}
                    link={`/article-info/${article.shortName}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="alert alert-warning mt-3 mb2">
            هیچ مقاله ای مطابق با سرچ شما پیدا نشد
            <Link to={"/"}> بازگشت به صفحه اصلی</Link>
          </div>
        </div>
      )}
    </>
  );
}
