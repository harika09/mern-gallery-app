import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import "./EditPost.css";

function EditPost() {
  const history = useHistory();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState("");

  const getData = async () => {
    const result = await Axios.get(
      `http://localhost:4000/post/details/${params.id}`
    );
    setData(result.data);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const data = new FormData();
    /* Fetch Image */
    /* Should be the same with multer single('image') */
    data.append("image", image);
    data.append("title", title);

    Axios.post(`http://localhost:4000/post/edit/${params.id}`, data);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update Success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="edit-post-container">
      <div className="edit-post-content bd-container">
        <div className="edit-form">
          <form onSubmit={updateData}>
            <input
              type="text"
              name="title"
              className="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder={data.title}
            />
            <p className="add-image">Click to update the image</p>
            <label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/jpeg, image/png"
              />
              <i className="fas fa-plus-circle"></i>
            </label>

            <input type="submit" value="Post" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
