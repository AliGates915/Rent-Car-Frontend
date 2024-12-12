/* eslint-disable react/react-in-jsx-scope */
import "./cash.scss";
import axios from "axios";
import { Link } from 'react-router-dom'
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

const CashList = () => {


  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // fetch vehicle data
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/rent-receipt`);
        if (Array.isArray(response.data)) {
          console.log("Data is an array.", response.data);
          setVehicles(response.data);
        } else {
          console.error("Data is not an array. Resetting to empty array.");
          setVehicles([]); // Set as empty array if response isn't an array
        }
      }
      catch (e) {
        console.log(e);

      } finally {
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
        <div>
          <nav className='flex justify-between my-4 mx-8'>
            <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
              All Vehicle Details
            </div>
            <Link to='/reports'>
              <button className='bg-[#0096FF] font-extrabold px-2 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
              >
                ➡
              </button>
            </Link>


          </nav>
          <hr className='bg-gray-400 mb-4' />
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold' }}>
                <TableRow>
                  <TableCell className="tableHeadCell">ID</TableCell>
                  <TableCell className="tableHeadCell">Vehicle Image</TableCell>
                  <TableCell className="tableHeadCell">Make</TableCell>
                  <TableCell className="tableHeadCell">Model</TableCell>
                  <TableCell className="tableHeadCell">YearOfModel</TableCell>
                  <TableCell className="tableHeadCell">Color</TableCell>
                  <TableCell className="tableHeadCell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.length > 0 ? (
                  vehicles.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell">{index + 1}</TableCell>
                      <TableCell className="tableCell">
                        <div className="cellWrapper">
                          {row?.photos?.length > 0 ? (
                            <img src={row.photos[0]} alt="" className="image" loading="lazy" />
                          ) : (
                            <span>No Image</span>
                          )}
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
                  ))
                ) : (
                  <p>Vehicles are not on the Rent.</p>
                )}


              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default CashList;
