import React, { useState } from "react";
import { useHistory } from "react-router";
import Axios from "axios";
import Swal from "sweetalert2";
import Camera from "../../image/favicon-32x32.png";
import "./Post.css";

function Post() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    /* Fetch Image */
    /* Should be the same with multer single('image') */
    data.append("image", image);
    data.append("title", title);

    if (!title || !image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fields cannot be empty",
      });
    } else {
      setLoading(true);
      Axios.post(
        "https://memory-gallery-app.herokuapp.com/post/post",
        data
      ).then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to Gallery",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            history.push("/");
          });
        }
      });
    }
  };

  return (
    <div className="post-container">
      <div className="post-wrapper bd-container">
        {isloading ? (
          <div className="loading"></div>
        ) : (
          <div className="form-submit">
            <div className="form-top-qoute">
              <h3>
                <i>
                  “Live life for the moment because everything else is
                  uncertain!”
                </i>
              </h3>
              <span>- Louis Tomlinson</span>
            </div>
            <form onSubmit={submit}>
              {error && <p>{error}</p>}
              <input
                type="text"
                name="title"
                className="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter best thing happen to remember"
              />
              <p className="add-image">Click to upload image</p>
              <label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/jpeg, image/png"
                />
                <img src={Camera} alt="camera-icon" />
              </label>

              <input type="submit" value="Post" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
