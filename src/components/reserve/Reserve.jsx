import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthConext";

const Reserve = ({ setOpen, hotelId, hotelName }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [amount, setAmount] = useState(0);
  const [roomName, setRoomName] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const roomId = e.target.value.split(",")[0];
    const price = parseInt(e.target.value.split(",")[1]);
    setSelectedRooms(
      checked
        ? [...selectedRooms, roomId]
        : selectedRooms.filter((item) => item !== roomId)
    );
    setAmount(checked ? amount + price : amount - price);
  };

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setRoomName(
      checked ? [...roomName, value] : roomName.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      const transaction = {
        hotelName: hotelName,
        customerId: user._id,
        amount: amount,
        roomName: roomName,
      };
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      console.log(transaction);
      await axios.post("/transactions", transaction);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your room:</span>
        {data.map((item) => (
          <div className="rItem">
            <input type="checkbox" value={item.title} onChange={handleChange} />
            <div className="roomMenu">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">Price: ${item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((room) => (
                  <div className="room">
                    <label>{room.number}</label>
                    <input
                      type="checkbox"
                      value={`${room._id},${item.price}`}
                      onChange={handleSelect}
                      disabled={!isAvailable(room)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
