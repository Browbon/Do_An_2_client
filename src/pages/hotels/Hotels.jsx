import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch.js";
import "./hotels.css";

const List = () => {
  const location = useLocation();
  const [path, setPath] = useState(undefined);
  const [destination, setDestination] = useState(location.state.destination);
  const [type, setType] = useState(location.state.type);
  const [dates, setDates] = useState(location.state.dates || []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options || {});
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(path);
  const { dispatch } = useContext(SearchContext);

  useEffect(() => {
    const getData = () => {
      if (destination && type) {
        setPath(
          `/hotels?city=${destination}&type=${type}&min=${min || 1}&max=${
            max || 999
          }`
        );
      } else {
        if (!destination && type) {
          setPath(
            `/hotels?type=${type}&min=${min || 1}&max=${max || 999}&limit=10`
          );
        } else if (destination && !type) {
          setPath(
            `/hotels?city=${destination}&min=${min || 1}&max=${
              max || 999
            }&limit=10`
          );
        }
      }
    };
    getData();
  }, [destination, max, min, type]);

  useEffect(() => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
  }, [dates, destination, dispatch, options]);

  return (
    <div>
      <Navbar />
      <Header page="hotels" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <div className="hotelSearch">
            <h1 className="hsTitle">Search</h1>
            <div className="hsItem">
              <label htmlFor="destination">Destination</label>
              <input
                placeholder={destination}
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="hsItem">
              <label htmlFor="destination">Type</label>
              <input
                placeholder={type}
                id="destination"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="hsItem">
              <label htmlFor="date">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0]?.startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0]?.endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="hsItem">
              <label htmlFor="">Options</label>
              <div className="hsOptions">
                <div className="hsOptionItem">
                  <span className="hsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMin(e.target.value);
                    }}
                    className="hsOptionInput"
                  />
                </div>
                <div className="hsOptionItem">
                  <span className="hsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setMax(e.target.value);
                    }}
                    className="hsOptionInput"
                  />
                </div>
                <div className="hsOptionItem">
                  <span className="hsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="hsOptionInput"
                    placeholder={options?.adult}
                  />
                </div>
                <div className="hsOptionItem">
                  <span className="hsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="hsOptionInput"
                    placeholder={options?.children}
                  />
                </div>
                <div className="hsOptionItem">
                  <span className="hsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="hsOptionInput"
                    placeholder={options?.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="hotelResult">
            {loading
              ? "Loading please wait"
              : data.length === 0
              ? "No Services Found !!!!"
              : data.map((item) => <SearchItem item={item} key={item._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
