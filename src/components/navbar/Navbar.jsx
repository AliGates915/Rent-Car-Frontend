/* eslint-disable react/react-in-jsx-scope */
import "./navbar.scss";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { CurrencyContext } from "../../context/CurrencyContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="navbar1">
      <div className="wrapper1">
        <div className="items1 ml-[46rem]">
          {/* Currency Selector */}
          <div className="item1">
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="currency-dropdown"
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div className="item1">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>

          <div className="item1">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>

          <div className="item1">
            <p>Admin</p>
          </div>

          <div>
            <img
              src={"https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
              className="mt-[1px] rounded-full w-11 h-11 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
