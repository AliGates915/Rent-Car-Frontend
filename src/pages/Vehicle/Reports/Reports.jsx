/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";

import { RotateLoader } from "react-spinners";
import "./reports.scss";
import Widget from "./widget/Widget";
const Reports = () => {
  
const [isLoading, setIsLoading] = useState(true);

      setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
 

  return (
    <div className="home1">
      {isLoading ? (
        <div className="ml-[40rem] mt-48 min-h-screen">
          <RotateLoader color="#0fdaee" size={15} margin={5} />
        </div>
      ) :(
      <div className="homeContainer1">
        {/* <Navbar /> */}
        <div className="widgets1">
          <Widget type="total vehicles" />
          <Widget type="rent" />
          <Widget type="owner details" />
          <Widget type="cash receipt" />
          <Widget type="cash payments" />
          {/* <Widget type="total" /> */}
        </div>
       
      </div>
       )}
    </div>
  )
};

export default Reports;
