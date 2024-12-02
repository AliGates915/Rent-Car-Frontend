/* eslint-disable react/react-in-jsx-scope */
import "./widget.scss";
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { MdBusinessCenter } from 'react-icons/md';

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
          case "customers":
            response = await fetch(`${process.env.REACT_APP_API_URL}/customer-details`);
            break;
          case "owners":
            response = await fetch(`${process.env.REACT_APP_API_URL}/owner-details`);
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
        link: "See all Vehicles",
        route: "/vehicle-details",
        icon: (
          <FaCar
              size={40} 
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
      case "owners":
      data = {
        title: "ON RENT",
        link: "View all Rent Vehicles",
        route: "/rent-vehicle",
        icon: (
          <MdBusinessCenter
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
    case "customers":
      data = {
        title: "CUSTOMERS",
        link: "View all customers",
        route: "/customer-details",
        icon: (
          <FiUsers
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
          <span className="no-underline text-[#dc143c] hover:font-bold">{data?.link}</span>
        </Link>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
