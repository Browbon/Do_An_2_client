import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js";
import useFetch from "../../hooks/useFetch.js";
import "./propertyType.css";

const PropertyType = () => {
  const { data, loading, error } = useFetch("/hotels/count/ByType");
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  const handleClick = (type) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { type, destination, dates, options } });
  };

  return (
    <div className="pType">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div
                className="pTypeItem"
                key={i}
                onClick={() => handleClick(data[i]?.type)}
              >
                <img src={img} alt="" className="pTypeImg" />
                <h3 className="pTypeTitle">{data[i]?.type}s</h3>
                <span className="pTypeDesc">
                  {data[i]?.count} {data[i]?.type}s
                </span>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyType;
