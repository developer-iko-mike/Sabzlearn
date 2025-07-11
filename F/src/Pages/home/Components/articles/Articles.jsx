import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../Components/sectionHeader/SectionHeader";
import ArticleBox from "./articleBox/ArticleBox";
import { toast, ToastContainer } from "react-toastify";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => {
        if (!res.ok) {
          throw "خطا در دریافت ارتیکل";
        }
        return res.json();
      })
      .then((articleData) => {
        setArticles(articleData);
      })
      .catch((err) => {
        toast.error(err, {
          position: "bottom-center",
        });
      });
  }, []);

  function truncateDescription(desc, maxLength = 133) {
    if (desc.length <= maxLength) return desc;
    return desc.substr(0, desc.lastIndexOf(" ", maxLength)) + " ...";
  }

  return (
    <section className="articles">
      <ToastContainer/>
      <div className="container">
        <SectionHeader
          title={"جدیدترین مقاله ها"}
          desc={"پیش به سوی ارتقای دانش"}
          btnTiTle={"تمامی مقاله ها"}
          link={"/allArticles/1"}
        />

        <div className="articles__content">
          <div className="row">
            {articles.length ? (
              articles
                .slice(0, 3)
                .map((article) => (
                  <ArticleBox
                    key={article._id}
                    title={article.title}
                    desc={truncateDescription(article.description)}
                    cover={article.cover}
                    link={`/article-info/${article.shortName}`}
                  />
                ))
            ) : (
              <div className="alert alert-danger mt2">
                دریافت مقالات از دیتا بیس با شکست مواجه شد
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
