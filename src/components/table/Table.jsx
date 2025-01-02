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
import {
  FadeLoader
} from 'react-spinners';

const List = () => {


  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // fetch vehicle data
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/vehicle-details`);
            if (Array.isArray(response.data)) {
                console.log("Data is an array.", response.data);
                setVehicles(response.data);
            } else {
                console.error("Data is not an array. Resetting to empty array.");
                setVehicles([]); // Set as empty array if response isn't an array
            }
        } 
        catch(e){
          console.log(e);
          
        }finally {
          setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
      }
    };

    fetchCustomer();
}, []);
  return (
    <>
    {isLoading ? (
                <div className="flex justify-center mt-48 min-h-screen">
                    <FadeLoader
                        color="#0fdaee" size={15} margin={5} />
                </div>
            ) : (
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
                  <img src={row?.photos[0]} alt="" className="image"  loading="lazy"/>
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
     )}
    </>
  );
};

export default List;
