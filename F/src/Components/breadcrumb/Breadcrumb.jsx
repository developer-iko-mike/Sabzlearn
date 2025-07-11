import React from 'react'
import './breadcrumb.css'
import { Link } from 'react-router-dom'

export default function Breadcrumb({links}) {
  return (
   <section className="breadcrumb">
   <div className="container">
     <div className="breadcrumb__content">
       <Link to={'/'} className="breadcrumb__home-content-icon">
         <svg className="svg-inline--fa fa-house breadcrumb__home-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"></path></svg>
         {/* <!-- <i className="fas fa-home breadcrumb__home-icon"></i> Font Awesome fontawesome.com --> */}
       </Link>
       <ul className="breadcrumb__list">
         <li className="breadcrumb__item">
           <Link to="/" className="breadcrumb__link">
             خانه
             <svg className="svg-inline--fa fa-angle-left breadcrumb__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"></path></svg>
             {/* <!-- <i className="fas fa-angle-left breadcrumb__icon"></i> Font Awesome fontawesome.com --> */}
           </Link>
         </li>
         {links.map(link => (
           <li className="breadcrumb__item" key={link.id}>
           <Link to={`/${link.to}`} className="breadcrumb__link">
             {link.title}
             {
              link.id !== links.length ? (
               <svg className="svg-inline--fa fa-angle-left breadcrumb__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"></path></svg>
              ) : null
             }             
           </Link>
         </li>
         ))}
         {/* <!-- <i className="fas fa-angle-left breadcrumb__icon"></i> Font Awesome fontawesome.com --> */}
       </ul>
     </div>
   </div>
 </section>
  )
}
