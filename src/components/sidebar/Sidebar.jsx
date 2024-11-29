/* eslint-disable react/react-in-jsx-scope */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StoreIcon from "@mui/icons-material/Store";
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TourIcon from '@mui/icons-material/Tour';
import PlaceIcon from '@mui/icons-material/Place';
import FlightIcon from '@mui/icons-material/Flight';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">AdminBoard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
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
          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Owner Details
            </span>
          </li>
          </Link>

          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Vehicle Schedule
            </span>
          </li>
          </Link>

          <Link to="/package-list" style={{ textDecoration: "none" }}>
          <li>
            <ListAltIcon className="icon" />
            <span>Customer Details
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
            <span>Rent Receipt and Agreement
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
            <span>Expense Voucher
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
            <ExitToAppIcon className="icon" />
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