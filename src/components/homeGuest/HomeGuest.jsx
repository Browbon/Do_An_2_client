import React from "react";
import useFetch from "../../hooks/useFetch.js";
import "./homeGuest.css";

const HomeGuest = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="hg">
      {loading
        ? "Loading please wait"
        : data.map((item) => (
            <div className="hgItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="hgImg" />
              <span className="hgTitle">{item.name}</span>
              <span className="hgCity">{item.city}</span>
              <span className="hgPrice">{`Starting from $${item.cheapestPrice}`}</span>
              {item.rating && (
                <div className="hgRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default HomeGuest;
