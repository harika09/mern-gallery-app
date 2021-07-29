import React, { useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import Camera from "../../Assets/image/favicon-32x32.png";
import "./EditPost.css";

function EditPost() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const [title, setTitle] = useState(
    location.state.posts
  ); /* location.state.post data  */
  const [image, setImage] = useState("");
  const [isloading, setLoading] = useState(false);

  const updateData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    /* Fetch Image */
    /* Should be the same with multer single('image') */
    data.append("image", image);
    data.append("title", title);

    if (!title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fields cannot be empty",
      });
      setLoading(false);
    } else {
      Axios.post(
        `https://memory-gallery-app.herokuapp.com/post/edit/${params.id}`,
        data
      ).then((response) => {
        if (response.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.error,
          });
          setLoading(false);
        }
        if (response.data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.success,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setLoading(false);
            history.push("/");
          });
        }
      });
    }
  };

  return (
    <div className="edit-post-container">
      <div className="edit-post-content bd-container">
        {isloading ? (
          <div className="loading"></div>
        ) : (
          <div className="edit-form">
            <form onSubmit={updateData}>
              <label htmlFor="Title">Edit Momories</label>
              <input
                type="text"
                name="title"
                className="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <p className="add-image">Click to update the image</p>
              <label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/jpeg, image/png"
                />
                <img src={Camera} alt="camera-icon" />
              </label>

              <input type="submit" value="Update" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPost;
