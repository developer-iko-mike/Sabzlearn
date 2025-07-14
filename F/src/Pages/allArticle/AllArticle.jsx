import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import PagenationNumPage from "../../Components/pagenationNumPage/PagenationNumPage";
import ArticleBox from "../home/Components/articles/articleBox/ArticleBox";
import PathNotFound from "../404/pathNotFound/PathNotFound";
import { toast, ToastContainer } from "react-toastify";

export default function AllArticle() {
  const [allArticle, setAllArticle] = useState([]);
  const [displayedArticle, setDisplayedArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllArticles = async () => {
      await fetch(`http://localhost:4000/v1/articles`)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              return <PathNotFound />;
            }
            throw new Error("خطا در دریافت ارتیکل");
          }
          return res.json();
        })
        .then((articleData) => {
          setAllArticle(articleData);
        })
        .catch((err) => {
          toast.error(err, {
            position: "bottom-center",
          });
        })
        .finally(() => setIsLoading(false));
    };

    getAllArticles();
  }, []);

  function truncateDescription(desc, maxLength = 125) {
    if (desc.length <= maxLength) return desc;
    return desc.substr(0, desc.lastIndexOf(" ", maxLength)) + " ...";
  }

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
      {allArticle && allArticle.length ? (
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
                    {displayedArticle.map((article) => (
                      <ArticleBox
                        key={article._id}
                        title={article.title}
                        desc={truncateDescription(article.description)}
                        cover={article.cover}
                        link={`/article-info/${article.shortName}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <PagenationNumPage
            items={allArticle}
            pathName={"allArticles"}
            setDisplayedItems={setDisplayedArticle}
          />
        </>
      ) : (
        <div className="alert alert-danger">مقلات پیدا نشد</div>
      )}
    </>
  );
}
