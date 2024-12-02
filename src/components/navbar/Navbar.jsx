/* eslint-disable react/react-in-jsx-scope */
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  console.log("Username", user)

  return (
    <div className="navbar1 ">
      <div className="wrapper1">
        {/* <div className="search1">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items1 ml-[49rem]">
          <div className="mr-4 font-bold">
            {/* <Link to='/user-panel'>
              User Panel
            </Link> */}
            
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
            {/* {user?user.username :(
              <p>Admin</p>
            )} */}
            <p>Admin</p>
    
          </div>
          <div className="">
            <img
             src={"https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="" className='mt-[1px] rounded-full w-11 h-11 object-cover'
            size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
