import React from "react";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeGuest from "../../components/homeGuest/HomeGuest";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyType from "../../components/propertyType/PropertyType";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyType />
        <h1 className="homeTitle">Homes guests love</h1>
        <HomeGuest />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
