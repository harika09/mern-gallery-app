import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import CardDetails from "./CardDetails";
import Swal from "sweetalert2";
import "./Cards.css";

function Cards({ post, setPost }) {
  const [data, setData] = useState({
    id: "",
    title: "",
    image: "",
    timeStamp: "",
    favorite: "",
  });

  const [click, setClick] = useState(false);

  const showInfo = () => {
    setClick(!click);
  };

  const hideInfo = () => {
    setClick(false);
  };

  const deleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonColor: "#FF6767",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `https://memory-gallery-app.herokuapp.com/post/delete/${id}`
        ).then(
          setPost(
            post.filter((value) => {
              return value._id !== id;
            })
          )
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="gallery-container">
      {post
        .map((posts) => {
          return (
            <div key={posts._id} className="gallery">
              <img
                className="lozad"
                onClick={() => {
                  showInfo();
                  setData({
                    id: posts._id,
                    title: posts.title,
                    image: posts.image,
                    timeStamp: posts.timestamp,
                    favorite: posts.favorite,
                  });
                }}
                src={posts.image}
                alt={posts.title}
              />

              <div className="post-info">
                <div className="post-info-top">
                  <p className="post-title">
                    {posts.title.substring(0, 40)}...
                  </p>
                  <button
                    className="btn-read-more"
                    onClick={() => {
                      showInfo();
                      setData({
                        id: posts._id,
                        title: posts.title,
                        image: posts.image,
                        timeStamp: posts.timestamp,
                        favorite: posts.favorite,
                      });
                    }}
                  >
                    Read More
                  </button>
                </div>
                <div className="lower-post">
                  <div className="time">
                    <span>{moment(posts.timestamp).fromNow()}</span>
                  </div>

                  <div className="post-btn">
                    <Link
                      to={{
                        pathname: `/edit/post/${posts._id}`,
                        state: { posts: posts.title },
                      }}
                    >
                      <button
                        onClick={() => {
                          setData({
                            id: posts._id,
                            title: posts.title,
                            image: posts.image,
                            timeStamp: posts.timestamp,
                            favorite: posts.favorite,
                          });
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        deleteBtn(posts._id);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
        .reverse()}

      {Object.keys(data ?? {}).length > 0 ? (
        <div key={data.id} className={click ? "modal active" : "modal"}>
          <div className="modal-content">
            <span className="close" onClick={hideInfo}>
              <i className="far fa-times-circle"></i>
            </span>
            <CardDetails post={data} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cards;
