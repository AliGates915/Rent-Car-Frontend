/* eslint-disable react/react-in-jsx-scope */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">AdminBoard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          
          <Link to="/vechile-type" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Type</span>
          </li>
          </Link>

          <Link to="/vehicle-maintenance" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Maintenace</span>
          </li>
          </Link>

          <Link to="/rent-type" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Rent Type</span>
          </li>
          </Link>
          
          <Link to="/vehicle-details" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Details
            </span>
          </li>
          </Link> 

          <Link to="/owner-details" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Owner Details
            </span>
          </li>
          </Link>
          <Link to="/customer-details" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Customer Details
            </span>
          </li>
          </Link>

          <Link to="/rent-receipt" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Rent Receipt
            </span>
          </li>
          </Link>
          
          <Link to="/rent-vehicle" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Return Vehicles</span>
          </li>
          </Link>
          <Link to="/save-vehicle" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Save Vehicles</span>
          </li>
          </Link>

          
          <Link to="/payment-voucher" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Payment Voucher
            </span>
          </li>
          </Link>
          <Link to="/expense-voucher" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Expense Voucher
            </span>
          </li>
          </Link>
         
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Advance Booking</span>
          </li>
          </Link>
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Handing Over
            </span>
          </li>
          </Link>
          
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Close
            </span>
          </li>
          </Link>
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Cash Receipt Voucher
            </span>
          </li>
          </Link>
         
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>DayBook
            </span>
          </li>
          </Link>
          
          <Link to='/login'style={{ textDecoration: "none" }}>
          <li>
            {/* <ExitToAppIcon className="icon" /> */}
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;