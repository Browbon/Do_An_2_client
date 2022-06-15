import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { data, loading, error } = useFetch(
    "/hotels/count/ByCity?cities=HaNoi,HoChiMinh,DaNang"
  );
  const navigate = useNavigate();

  const handleClick = (destination) => {
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem" onClick={() => handleClick("HaNoi")}>
            <img
              src="https://cdn.pixabay.com/photo/2018/08/16/08/45/hanoi-3609871_960_720.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>HaNoi</h2>
              <h3>{data[0]} properties</h3>
            </div>
          </div>
          <div
            className="featuredItem"
            onClick={() => handleClick("HoChiMinh")}
          >
            <img
              src="https://cdn.pixabay.com/photo/2017/06/19/14/12/cathedral-2419454_960_720.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>HoChiMinh</h2>
              <h3>{data[1]} properties</h3>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handleClick("DaNang")}>
            <img
              src="https://cdn.pixabay.com/photo/2020/05/04/17/25/vietnam-5129937_960_720.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>DaNang</h2>
              <h3>{data[2]} properties</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
