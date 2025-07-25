import React from 'react'
import { Link } from 'react-router-dom'

export default function SectionHeader({title , desc , btnTiTle , link}) {
  return (
   <div className="courses-header">
   <div className="courses-header__right">
     <span className="courses-header__title title">{title}</span>
     <span className="courses-header__text">
       {desc}
     </span>
   </div>
   <div className="courses-header__left">
    {btnTiTle && link && <Link to={link} className="courses-header__link">
       {btnTiTle}
       <svg
         className="svg-inline--fa fa-arrow-left courses-header__icon"
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
       {/* <i class="fas fa-arrow-left courses-header__icon"></i> Font Awesome fontawesome.com */}
     </Link>}
   </div>
 </div>
  )
}
