/* eslint-disable react/react-in-jsx-scope */
import "./widget.scss";
import { Link } from 'react-router-dom';
import {  MdCarRental,MdOutlinePayment    } from 'react-icons/md';
import { FcBusinessman } from "react-icons/fc";
import { TbCashRegister } from "react-icons/tb";


import { FaCar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(0);
  let data;

  // Fetch data based on type
  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        switch (type) {
          case "total vehicles":
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details/display`);
            break;
          case "owner details":
            response = await fetch(`${process.env.REACT_APP_API_URL}/owner-details`);
            break;
          case "rent":
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details/return-vehicle`);
            // console.log(response.data);
            break;
          case "cash receipt":
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details`);
            // console.log(response.data);
            break;
          case "cash payments":
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details`);
            // console.log(response.data);
            break;
          default:
            return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        setDataCount(result.length);
        
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [type]);

  switch (type) {
    case "total vehicles":
      data = {
        title: "TOTAL VEHICLES",
        link: "All Vehicles",
        route: "/vehicle-list",
        icon: (
          <FaCar
              size={40} 
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgb(151,158,173)",
            }}
          />
        ),
      };
      break;
      case "rent":
      data = {
        title: "ON RENT",
        link: "All Rent Vehicles",
        route: "/rent-list",
        icon: (
          <MdCarRental
          size={40}
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "#4463ab",
            }}
          />
        ),
      };
      break;
      case "owner details":
      data = {
        title: "OWNER DETAILS",
        link: "All Owner Details",
        route: "/owner-list",
        icon: (
          <FcBusinessman
          size={40}
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "cash receipt":
      data = {
        title: "CASH RECEIPT",
        link: "Cash Receipt History",
        route: "/cash-list",
        icon: (
          <TbCashRegister
            size={40}
            className="icon"
            style={{
              
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "cash payments":
      data = {
        title: "CASH PAYMENT",
        link: "Cash Payment History",
        route: "/cash-list",
        icon: (
          <MdOutlinePayment
            size={40}
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgb(66,225,66)",
            }}
          />
        ),
      };
      break;
    
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{dataCount}</span>
        <Link to={data?.route}
        >
          <span className="no-underline text-[#979ead] hover:font-bold transition-all">{data?.link}</span>
        </Link>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
