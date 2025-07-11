import React, { useEffect, useState } from "react";
import "./courses.css";
import SectionHeader from "../../../../Components/sectionHeader/SectionHeader";
import Course from "../../../../Components/course/Course";
import { toast, ToastContainer } from "react-toastify";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getNewCourses = async () => {
      await fetch("http://localhost:4000/v1/courses")
        .then((res) => {
          if (!res.ok) {
            throw "خطای نا مشخص";
          } else {
            return res.json();
          }
        })
        .then((resCourses) => setCourses(resCourses))
        .catch((err) => {
          toast.error(err + "صفحه مورد نظر پیدا نشد یا پاک شده", {
            position: "bottom-center",
            autoClose: 4000,
            draggable: true,
          });
        });
    };
    getNewCourses();
  }, []);

  return (
    <div className="courses">
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
              {courses.length
                ? courses
                    .splice(0, 6)
                    .map((course) => (
                      <Course
                        key={course._id}
                        cover={course.cover}
                        title={course.name}
                        link={`/course-info/${course.shortName}`}
                        score={4}
                        teacher={"حمید رضا عبادی"}
                        teacherLink={"/"}
                        watchUserCount={course.studentCount}
                        price={course.price < 10_000 ? "رایگان" : course.price}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
