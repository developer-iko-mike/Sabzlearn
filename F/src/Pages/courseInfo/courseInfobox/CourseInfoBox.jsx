import React from "react";
import "./courseInfoBox.css";

export default function CourseInfoBox({ title, subTiTle, icon }) {
  return (
    <div className="col-4">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right">{icon}</div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{title} :</span>
          <span className="course-boxes__box-left--subtitle">{subTiTle}</span>
        </div>
      </div>
    </div>
  );
}
