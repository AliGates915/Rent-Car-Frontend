
/* eslint-disable react/react-in-jsx-scope */
import "./widget.scss";
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { MdBusinessCenter,MdEventAvailable  } from 'react-icons/md';

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
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details`);
            break;
          case "customers":
            response = await fetch(`${process.env.REACT_APP_API_URL}/customer-details`);
            break;
          case "rent":
            response = await fetch(`${process.env.REACT_APP_API_URL}/vehicle-details/return-vehicle`);
            // console.log(response.data);
            break;
          case "available":
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type.length]);

  switch (type) {
    case "total vehicles":
      data = {
        title: "TOTAL VEHICLES",
        link: "All Vehicles",
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
      case "rent":
      data = {
        title: "ON RENT",
        link: "All Rent Vehicles",
        route: "/rent-vehicle",
        icon: (
          <MdBusinessCenter
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
      case "available":
      data = {
        title: "ON AVAILABLE",
        link: "All Available Vehicles",
        route: "/vehicle-details",
        icon: (
          <MdEventAvailable
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
        link: "All customers",
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

