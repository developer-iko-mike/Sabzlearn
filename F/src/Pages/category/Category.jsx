import React, { useCallback, useEffect, useState } from "react";
import "./category.css";
import Course from "../../Components/course/Course";
import PagenationNumPage from "../../Components/pagenationNumPage/PagenationNumPage";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PathNotFound from "../404/pathNotFound/PathNotFound";

export default function Category() {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();
  const [category, setCategory] = useState("");
  const [sortStatus, setSortStatus] = useState("مرتب سازی پیش فرض");
  const [searchVal, setSearchVal] = useState("");
  const [displayType , setDisplayType] = useState("") // "" === row

  // آرایه گزینه‌های مرتب‌سازی
  const sortOptions = [
    "مرتب سازی پیش فرض",
    "مرتب سازی بر اساس محبوبیت",
    "مرتب سازی بر اساس امتیاز",
    "مرتب سازی بر اساس آخرین",
    "مرتب سازی بر اساس ارزان ترین",
    "مرتب سازی بر اساس گران ترین",
  ];

  const changeToPersianNameCategory = () => {
    switch (categoryName) {
      case "frontend":
        setCategory("6345cbd132c10de974957632");
        break;
      case "backend":
      case "python":
        setCategory("6345cc0a32c10de974957635");
        break;
      default:
        setCategory("");
    }
  };

  const getCourses = async () => {
    try {
      const response = await fetch(`http://localhost:4000/v1/courses`);
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setAllCourses(data);
    } catch (err) {
      toast.error("خطا در دریافت دوره‌ها");
      setAllCourses([]);
      setFilteredCourses([]);
    } finally {
      setIsLoading(false);
    }
  };


  // تابع برای تغییر روش مرتب‌سازی
  const handleSortChange = (option) => {
    setSortStatus(option);

    let sortedCourses = [...filteredCourses];

    switch (option) {
      case "مرتب سازی بر اساس محبوبیت":
        sortedCourses = allCourses.filter(
          (item) => item.categoryID === category
        );
        break;
      case "مرتب سازی بر اساس امتیاز":
        sortedCourses = allCourses.filter(
          (item) => item.categoryID === category
        );
        break;
      case "مرتب سازی بر اساس آخرین":
        sortedCourses.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "مرتب سازی بر اساس ارزان ترین":
        sortedCourses.sort((a, b) => a.price - b.price);
        break;
      case "مرتب سازی بر اساس گران ترین":
        sortedCourses.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedCourses = allCourses.filter(
          (item) => item.categoryID === category
        );
    }

    setFilteredCourses(sortedCourses);
  };

  useEffect(() => {
    changeToPersianNameCategory();
    getCourses();
  }, [categoryName]);

  useEffect(() => {
    if (category) {
      const filtered = allCourses.filter(
        (item) => item.categoryID === category
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [category, allCourses]);

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setSearchVal(searchValue);

    if (!category) return;

    const filtered =
      searchValue === ""
        ? allCourses.filter((item) => item.categoryID === category)
        : allCourses.filter(
            (item) =>
              item.categoryID === category &&
              item.name.toLowerCase().includes(searchValue.toLowerCase())
          );

    setFilteredCourses(filtered);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="courses">
      <ToastContainer />
      <div className="container">
        {/* نمایش تاپ بار فقط اگر دسته‌بندی معتبر باشد و دوره‌هایی وجود داشته باشد */}
        {categoryName && (
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className={`courses-top-bar__row-btn  ${!displayType ? "courses-top-bar__icon--active" : ""}`} onClick={() => setDisplayType("")}>
                <svg
                  className="svg-inline--fa fa-border-all courses-top-bar__icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="border-all"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 96H256V224H384V96zM384 288H256V416H384V288zM192 224V96H64V224H192zM64 416H192V288H64V416z"
                  ></path>
                </svg>
              </div>
              <div className={`courses-top-bar__column-btn ${displayType === "column" ? "courses-top-bar__icon--active" : ""}`} onClick={() => setDisplayType("column")}>
                <svg
                  className="svg-inline--fa fa-align-left courses-top-bar__icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="align-left"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M256 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H256C273.7 32 288 46.33 288 64C288 81.67 273.7 96 256 96zM256 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H256C273.7 288 288 302.3 288 320C288 337.7 273.7 352 256 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"
                  ></path>
                </svg>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {sortStatus}
                  <svg
                    className="svg-inline--fa fa-angle-down courses-top-bar__selection-icon"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    ></path>
                  </svg>
                </span>
                <ul className="courses-top-bar__selection-list">
                  {sortOptions.map((option, index) => (
                    <li
                      key={index}
                      className={`courses-top-bar__selection-item ${
                        sortStatus === option
                          ? "courses-top-bar__selection-item--active"
                          : ""
                      }`}
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  value={searchVal}
                  onChange={searchHandler}
                />
                <svg
                  className="svg-inline--fa fa-magnifying-glass courses-top-bar__search-icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="magnifying-glass"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                  ></path>
                </svg>
              </form>
            </div>
          </div>
        )}

        {/* بخش اصلی محتوا */}
        {!categoryName ? (
          <div className="alert alert-danger" style={{ margin: "20px 0" }}>
            <span>دسته‌بندی نامعتبر - </span>
            <Link to="/">بازگشت به خانه</Link>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="alert alert-danger" style={{ margin: "20px 0" }}>
            <span>در این دسته‌بندی دوره‌ای ثبت نشده - </span>
            <Link to="/">بازگشت به خانه</Link>
          </div>
        ) : (
          <>
            <div className="courses-content" style={{ marginTop: 32 }}>
              <div className="container">
                <div className="row">
                  {displayedCourses.length ? (
                    displayedCourses.map((course) => (
                      <Course
                        key={course._id}
                        cover={course.cover}
                        title={course.name}
                        link={`/course-info/${course.shortName}`}
                        score={Math.floor(Math.random() * 5) + 1}
                        teacher={"حمید رضا عبادی"}
                        teacherLink={"/"}
                        watchUserCount={course.studentCount}
                        price={course.price || 0}
                      />
                    ))
                  ) : (
                    <div className="alert alert-danger">
                      نتیجه‌ای برای جستجوی شما یافت نشد
                    </div>
                  )}
                </div>
              </div>
            </div>
            <PagenationNumPage
              items={filteredCourses}
              pathName={`category-info/${categoryName}`}
              setDisplayedItems={setDisplayedCourses}
            />
          </>
        )}
      </div>
    </section>
  );
}
