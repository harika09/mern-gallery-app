import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import Axios from "axios";
import Cards from "../Cards/Cards";
import "./Home.css";

function Home() {
  let PAGE_NUMBER = 0;
  let [page, setPage] = useState(PAGE_NUMBER);
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState("");

  const pagination = async () => {
    const results = await Axios.get(
      `https://memory-gallery-app.herokuapp.com/post/data?page=${page}`
    );
    setData((prev) => [...prev, ...results.data.post]);
    setMaxPage(results.data.totalPage);
    setLoading(false);
  };

  useEffect(() => {
    pagination();

    window.onscroll = infiniteScroll;

    // This variable is used to remember if the function was executed.
    let isExecuted = false;

    function infiniteScroll() {
      // Inside the "if" statement the "isExecuted" variable is negated to allow initial code execution.
      if (
        window.scrollY > document.body.offsetHeight - window.outerHeight &&
        !isExecuted
      ) {
        // Set "isExecuted" to "true" to prevent further execution
        isExecuted = true;
        if (page === maxPage) {
          setLoading(false);
        } else {
          setLoading(true);
          setTimeout(() => {
            setPage(page + 1);
          }, 1500);
        }

        // After 1 second the "isExecuted" will be set to "false" to allow the code inside the "if" statement to be executed again
      }
    }
    // loadImages();
  }, [page]);

  return (
    <div className="home-container ">
      <div className="home-wrapper bd-container">
        <h1>
          <i>"Things end but memories last forever."</i>
        </h1>

        <Cards post={data} setPost={setData} />
        {isloading && <BeatLoader loading color="#e98580" />}
      </div>
    </div>
  );
}

export default Home;
