import React, { useState } from "react";
import moment from "moment";
import Axios from "axios";
import "./CardDetails.css";

function CardDetails({ post }) {
  return (
    <div className="card-details-conatiner">
      <img src={post.image} alt={post.title} />
      <div className="card-details-info">
        <p>{post.title}</p>
        <p>{post.favorite}</p>
        <span>{moment(post.timeStamp).fromNow()}</span>
      </div>
    </div>
  );
}

export default CardDetails;
