import React , {useState , useEffect} from "react";
import "./popular.css";
import SectionHeader from "../../../../Components/sectionHeader/SectionHeader";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ScoreCountStars from "../../../../Components/scoreCountStars/ScoreCountStars";
import CourseInfo from "../../../../Components/course/Course";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPresell = async () => {
    await fetch(`http://localhost:4000/v1/courses`)
      .then((res) => {
        if (!res.ok) {
          throw "پیش فروش ها پیدا نشد";
        }
        return res.json();
      })
      .then((presell) => setPopular(presell))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPresell();
  }, []);

  return (
    <>
      {popular && popular.length ? (
        <div className="popular">
          <div className="container">
            <SectionHeader
              title={"محبوب ترین دوره ها"}
              desc={"دوره های محبوب بر اساس امتیاز دانشجو ها "}
            />

            <div className="popular__slider">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {popular.map((course) => (
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
      ) : null}
    </>
  );
}
