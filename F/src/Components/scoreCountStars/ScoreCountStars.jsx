import React from "react";
import "./scoreCountStars.css";

export default function ScoreCountStars({ ScoreCount }) {
  const renderStars = (starCount) => {
    return Array.from({ length: 5 }, (_, i) => (
      <React.Fragment key={i}>
        {i < starCount ? (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="18"
            height="18"
            viewBox="0 0 15 13"
          >
            <path
              id="Shape_1_copy_2"
              fill="#f9a134"
              d="m14.285 4.966-4.476-.881L7.607 0 5.406 4.085l-4.477.881 3.116 3.405L3.479 13l4.128-1.981L11.734 13l-.565-4.629z"
            ></path>
          </svg>
        ) : (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="18"
            height="18"
            viewBox="0 0 15 13"
          >
            <g
              id="Shape_1_copy_2"
              fill="none"
              stroke="#f9a134"
              strokeMiterlimit="10"
            >
              <path d="m7.607 10.464-3.521 1.69.483-3.951-2.671-2.918 3.836-.755 1.873-3.476L9.48 4.53l3.835.755-2.67 2.918.482 3.951z"></path>
              <path d="m7.607 10.464-3.521 1.69.483-3.951-2.671-2.918 3.836-.755 1.873-3.476L9.48 4.53l3.835.755-2.67 2.918.482 3.951z"></path>
            </g>
          </svg>
        )}
      </React.Fragment>
    ));
  };

  return ( <> { ScoreCount ? (<div className="course-box__rating">{renderStars(ScoreCount)}</div>) : null } </> );
}
