/* eslint-disable react/react-in-jsx-scope */
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home1">
      <Sidebar />
      <div className="homeContainer1">
        <Navbar />
        <div className="widgets1">
          <Widget type="total vehicles" />
          <Widget type="available" />
          <Widget type="rent" />
          <Widget type="customers" />
          {/* <Widget type="total" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer1">
          <div className="listTitle1">Latest Vehicle Status</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
