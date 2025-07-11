import Home from "../Pages/home/Home";
import CourseInfo from "../Pages/courseInfo/CourseInfo";
import Category from "../Pages/category/Category";
import ArticleInfo from "../Pages/articleInfo/ArticleInfo";
import Login from "../Pages/Login/Login";
import AllCourse from "../Pages/allCourses/AllCourses";
import Register from "../Pages/Register/Register";
import NotFound from "../Pages/404/NotFound";
import AllArticle from "../Pages/allArticle/AllArticle";
import ContactUS from "../Pages/contactUS/ContactUS";
import Search from "../Pages/search/Search";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/allCourse/:page", element: <AllCourse /> },
  { path: "/allArticles/:page", element: <AllArticle /> },
  { path: "/course-info/:courseName", element: <CourseInfo />,
  },
  { path: "/category-info/:categoryName/:page?", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact-us", element: <ContactUS /> },
  { path: "/search/:value", element: <Search /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
