import React, { useEffect, useState } from "react";
import "../popular/popular.css";
import SectionHeader from "../../../../Components/sectionHeader/SectionHeader";
import ScoreCountStars from "../../../../Components/scoreCountStars/ScoreCountStars";
import CourseInfo from "../../../../Components/course/Course";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
export default function Presell() {
  const [presells, setPresells] = useState([]);

  const getPresell = async () => {
    await fetch(`http://localhost:4000/v1/courses`)
      .then((res) => {
        if (!res.ok) {
          throw "پیش فروش ها پیدا نشد";
        }
        return res.json();
      })
      .then((presell) => setPresells(presell))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPresell();
  }, []);

  return (
    <>
      {presells && presells.length ? (
        <div className="popular">
          <div className="container">
            <SectionHeader
              title="دوره های در حال پیش فروش"
              desc="متن تستی برای توضیحات دوره های پیش فروش"
            />

            <div className="courses-content">
              <div className="container">
                <div className="row">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    className="mySwiper"
                  >
                    {presells.map((course) => (
                      <SwiperSlide key={course._id}>
                        <CourseInfo
                          {...course}
                          title={course.name}
                          link={`course-info/${course.shortName}`}
                          teacher={"محمد امین سعیدی راد"}
                          teacherLink={"/"}
                          watchUserCount={course.view}
                          score={Math.floor(Math.random() * 5) + 1}
                          isSlider={true}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
