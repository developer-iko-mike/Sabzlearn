import React from "react";

import "./CommentsTextArea.css";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CommentsTextArea({ courseShortName }) {
  const authContext = useContext(AuthContext);

  const [commentBody, setCommentBody] = useState("");

  const submitComment = async () => {
    const userToken = JSON.parse(localStorage.getItem("user"));

    await fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken.token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        toast.error("ثبت کامنت با شکست مواجه شد", {
          position: "bottom-center",
          autoClose: 3000,
          draggable: true,
        });
        throw "ثبت کامنت با شکست مواجه شد"
      } else {
        toast.success("کامنت با موفقیت ثبت شد", {
          position: "bottom-center",
          autoClose: 3000,
          draggable: true,
        });
        setCommentBody("");
      }
    }).catch(error => {
             toast.error(error || "خطا در ثبت کامنت", {
          position: "bottom-center",
          autoClose: 3000,
          draggable: true,
        })
    })
  };

  return (
    <>
      {authContext.isLoggedIn ? (
        <div className="comments" style={{ marginTop: 32 }}>
          <span className="comments__title">دیدگاهتان را بنویسید</span>
          <span className="comments__text">
            <a href="#">با عنوان {authContext.userInfos.name} وارد شده اید.</a>
            <button onClick={() => authContext.logout()} className="logoutBTN">
              {" "}
              خارج میشوید ?{" "}
            </button>{" "}
            بخش های موردنیاز علامت گذاری شده اند *
          </span>
          <div className="comments_content">
            <span className="comments__content-title">دیدگاه *</span>
            <textarea
              className="comments__content-textarea"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="comments__button"
            onClick={submitComment}
            disabled={commentBody.length > 4 ? false : true}
          >
            فرستادن دیدگاه
          </button>
        </div>
      ) : (
        <div className="alert alert-danger mt2">
          برای گذاشتن کامنت اول
          <Link to={"/login"} className="linkblueColornone">
            {" "}
            لاگین{" "}
          </Link>
          یا
          <Link to={"/register"} className="linkblueColornone">
            {" "}
            ثبت نام{" "}
          </Link>
          کنید
        </div>
      )}
    </>
  );
}
