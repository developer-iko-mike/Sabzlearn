import React, { useEffect, useState } from "react";
import "./allCourses.css";
import "../../Components/pagenationNumPage/pagenationNumPage.css";
import PathNotFound from "../404/pathNotFound/PathNotFound";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Course from "../../Components/course/Course";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PagenationNumPage from "../../Components/pagenationNumPage/PagenationNumPage";

export default function AllCourses() {
  const [allCourses, setAllCourses] = useState([]); // تمام دوره‌ها
  const [displayedCourses, setDisplayedCourses] = useState([]); // دوره‌های نمایش داده شده
  const [isLoading, setIsLoading] = useState(true);

  const getNewCateCourses = async () => {
    try {
      const response = await fetch(`http://localhost:4000/v1/courses`);

      if (!response.ok) {
        if (response.status === 404) {
          return <PathNotFound />;
        }
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setAllCourses(data);
    } catch (err) {
      toast.error("خطا در دریافت دسته بندی", {
        position: "bottom-center",
        autoClose: 2000,
        draggable: true,
      });
      setAllCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewCateCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <span className="loading-spinnerText">Loading</span>
      </div>
    );
  }
  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "تمامی دوره ها",
            to: "allCourse/1",
          },
        ]}
      />

      <section className="courses">
        <ToastContainer />
        <div className="container">
          <div className="courses-content" style={{ marginTop: 32 }}>
            <div className="container">
              <div className="row">
                {displayedCourses.map((course) => (
                  <Course
                    key={course._id}
                    cover={course.cover}
                    title={course.name}
                    link={`/course-info/${course.shortName}`}
                    score={Math.floor(Math.random() * 5) + 1}
                    teacher={"حمید رضا عبادی"}
                    teacherLink={"/"}
                    watchUserCount={course.studentCount}
                    price={course.price}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="courses-pagination">
        <PagenationNumPage
          items={allCourses}
          itemsInPage={9}
          pathName={"allCourse"}
          setDisplayedItems={setDisplayedCourses} // تغییر از setItems به setDisplayedItems
        />
      </div>
    </>
  );
}
