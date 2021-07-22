import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cards from "../Cards/Cards";

import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

  const loadImages = async () => {
    const result = await Axios.get(
      "https://memory-gallery-app.herokuapp.com/post/"
    );
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div className="home-container ">
      <div className="home-wrapper bd-container">
        <h1>
          <i>"Things end but memories last forever."</i>
        </h1>
        {isloading ? (
          <div className="loading"></div>
        ) : (
          /* Passing the data from another components */
          <Cards post={data} setPost={setData} />
        )}
      </div>
    </div>
  );
}

export default Home;
