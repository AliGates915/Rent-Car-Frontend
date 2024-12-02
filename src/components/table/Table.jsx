/* eslint-disable react/react-in-jsx-scope */
import "./table.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {


  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCustomer = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/vehicle-details/display`);
            if (Array.isArray(response.data)) {
                console.log("Data is an array.", response.data);
                setVehicles(response.data);
            } else {
                console.error("Data is not an array. Resetting to empty array.");
                setVehicles([]); // Set as empty array if response isn't an array
            }
        } finally {
            setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
        }
    };

    fetchCustomer();
}, []);

  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Vehicle Image</TableCell>
            <TableCell className="tableCell">Make</TableCell>
            <TableCell className="tableCell">Model</TableCell>
            <TableCell className="tableCell">YearOfModel</TableCell>
            <TableCell className="tableCell">Color</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row?.photos[0]} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.carMake}</TableCell>
              <TableCell className="tableCell">{row.carModel}</TableCell>
              <TableCell className="tableCell">{row.yearOfModel}</TableCell>
              <TableCell className="tableCell">{row.color}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
