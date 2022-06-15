import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch.js";
import "./hotelDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthConext";
import Reserve from "../../components/reserve/Reserve";

const HotelDetail = () => {
  const [sliderNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/${id}`);

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  console.log(dates);

  const MILLISERCONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISERCONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const navigate = useNavigate();

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true);
  };

  const handleArrow = (direction) => {
    if (direction === "left" && sliderNumber >= 1)
      setSliderNumber(sliderNumber - 1);
    else {
      if (direction === "right" && sliderNumber < data.photos.length - 1)
        setSliderNumber(sliderNumber + 1);
    }
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header page="hotels" />
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="hdContainer">
          {open && (
            <div className="slider">
              <div className="sliderWrapper">
                <FontAwesomeIcon
                  className="close"
                  icon={faCircleXmark}
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  className="arrow"
                  icon={faCircleArrowLeft}
                  onClick={() => handleArrow("left")}
                />
                <img
                  className="sliderImg"
                  src={data.photos[sliderNumber]}
                  alt=""
                />
                <FontAwesomeIcon
                  className="arrow"
                  icon={faCircleArrowRight}
                  onClick={() => handleArrow("right")}
                />
              </div>
            </div>
          )}
          <div className="hdWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hdTitle">{data.name}</h1>
            <div className="hdAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hdDistance">
              Excellent location - {data.distance}m from centter
            </span>
            <span className="hdPriceHightLight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hdImages">
              {data.photos?.map((photo, i) => (
                <div className="hdImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hdImg"
                  />
                </div>
              ))}
            </div>
            <div className="hdContents">
              <div className="hdTexts">
                <h1 className="hdTitle">{data.title}</h1>
                <p className="hdDesc">{data.desc}</p>
              </div>
              <div className="hdPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          hotelId={id}
          hotelName={data.name}
          key={id}
        />
      )}
    </div>
  );
};

export default HotelDetail;
