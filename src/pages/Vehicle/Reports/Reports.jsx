/* eslint-disable react/react-in-jsx-scope */
import "./reports.scss";
import Widget from "./widget/Widget";
const Reports = () => {
  return (
    <div className="home1">
      {/* <Sidebar /> */}
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
    </div>
  );
};

export default Reports;
