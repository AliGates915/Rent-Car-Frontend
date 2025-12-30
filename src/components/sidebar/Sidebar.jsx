/* eslint-disable react/react-in-jsx-scope */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { MdDiscount } from "react-icons/md";


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


          <Link to="/rent-vehicle" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Return Vehicles</span>
            </li>
          </Link>

          <Link to="/promotion" style={{ textDecoration: "none" }}>
            <li>
              <MdDiscount className="icon" />
              <span>Promotion
              </span>
            </li>
          </Link>

          <Link to="/payment-voucher" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Receipt Voucher
              </span>
            </li>
          </Link>
          <Link to="/expense-voucher" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Payment Voucher
              </span>
            </li>
          </Link>

          <Link to="/dayBook" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>DayBook
              </span>
            </li>
          </Link>

          <Link to="/petrol-rate" style={{ textDecoration: "none" }}>
            <li>
              <BsFillFuelPumpDieselFill className="icon" />
              <span>Petrol Rates
              </span>
            </li>
          </Link>

          <Link to="/reports" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Reports
              </span>
            </li>
          </Link>

          <Link to='/' style={{ textDecoration: "none" }}>
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