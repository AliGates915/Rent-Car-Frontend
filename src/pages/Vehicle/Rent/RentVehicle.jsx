/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import {
  FadeLoader
} from 'react-spinners';


import axios from "axios";

function RentVehicle() {
  const [details, setDetails] = useState([]);
  const [customers, setCustomer] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  // Fetch vehicle data once when the component mounts


  useEffect(() => {
    const fetchSaveVehicles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/vehicle-details/return-vehicle`
        );

        if (Array.isArray(response.data)) {
          setDetails(response.data);
        } else {
          console.error("Data is not an array. Resetting to empty array.");
          setDetails([]); // Reset to empty array if response isn't an array
        }
      } catch (error) {
        console.error("Error fetching rented vehicles:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
      }
    };

    fetchSaveVehicles();
  }, []);

  // customer Info
  useEffect(() => {
    const fetchSaveVehicles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/rent-receipt`
        );

        if (Array.isArray(response.data)) {
          setCustomer(response.data);
        } else {
          console.error("Data is not an array. Resetting to empty array.");
          setCustomer([]); // Reset to empty array if response isn't an array
        }
      } catch (error) {
        console.error("Error fetching rented vehicles:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
      }
    };

    fetchSaveVehicles();
  }, []);
  console.log("Fetched Vehicles", details);

  // totalDays details
  useEffect(() => {
    //     const fetchAmount = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/rent-details`);
    //             if (Array.isArray(response.data)) {
    //             setAmount(response.data.totalAmount);
    //             }
    //             console.log("Data amount", response.data);

    //         } catch (error) {
    //             console.error("Error fetching vehicles:", error);
    //         } finally {
    //             setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
    //         }
    //     };

    //     fetchAmount();
  }, []);


  // Handle rent button click

  const handleReturn = async (id) => {
    try {
      navigate(`/save-form/${id}`)
    } catch (error) {
      console.error('Error returning vehicle:', error.response?.data || error.message);
    }
  };

  // date format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing date
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' for DD/MM/YYYY format
  };


  return (
    <>
      <nav className='flex justify-between my-4 mx-8'>
        <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
          All Return Vehicles
        </div>
        <Link to='/new-vehicle'>
          <button className='bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center
                 hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
          >
            +
          </button>
        </Link>
      </nav>
      <hr className='bg-gray-400 mb-4' />

      {/* Cards */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-5 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FadeLoader color="#0fdaee" size={15} margin={5} />
          </div>
        ) : (
          Array.isArray(details) && details.length > 0 ? (
            details.map((vehicle, index) => {
              // Find a related customer matching the vehicle's registrationNo
              const relatedCustomer = customers.find(
                (customer) =>
                 
                  customer?.vehicleInfo?.registrationNo === vehicle?.registrationNo
              );

              // Only display the card if a related customer exists
              if (!relatedCustomer) return null;

              return (
                <div
                  key={index}
                  className="w-[320px] bg-white shadow-lg rounded-xl duration-300 hover:scale-105 hover:shadow-2xl transition-all"
                >
                  {/* Image Section */}
                  {Array.isArray(vehicle?.photos) && vehicle?.photos.length > 0 ? (
                    <img
                      src={vehicle?.photos[0] || "https://via.placeholder.com/300x200?text=No+Image+Available"}
                      alt="Vehicle"
                      className="h-64 w-full rounded-t-xl object-cover"
                    />
                  ) : (
                    <p className="text-center text-gray-500 py-8">No images available</p>
                  )}

                  {/* Vehicle Information */}
                  <div className="px-4 py-2">
                    <div className="text-center">
                      <span className="text-gray-500 text-sm uppercase">
                        {" "}
                        <span className="font-semibold text-gray-700">{vehicle?.registrationNo || "N/A"}</span>
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 text-base">
                        <span className="font-bold">{vehicle?.carMake || "N/A"}</span>{" "}
                        <span className="font-bold">{vehicle?.carModel || "N/A"}</span> -{" "}
                        <span className="font-bold">{vehicle?.yearOfModel || "N/A"}</span>
                      </p>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="px-4">
                    <div className="text-center text-[#ab32e4] text-lg font-medium">
                      {relatedCustomer?.customerInfo?.customerName || "N/A"}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        From:{" "}
                        <span className="font-bold text-gray-700">
                          {formatDate(relatedCustomer?.rentalInfo?.dateFrom) || "N/A"}
                        </span>
                      </span>
                      <span>
                        To:{" "}
                        <span className="font-bold text-gray-700">
                          {formatDate(relatedCustomer?.rentalInfo?.dateTo) || "N/A"}
                        </span>
                      </span>
                    </div>
                    <div className="text-center mt-3 text-teal-500 text-base font-semibold">
                      Total Amount:{" "}
                      <span className="text-lg font-bold">
                        Rs.{relatedCustomer?.rentalInfo?.totalAmount || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-center my-3">
                      <button
                        className="bg-[#0096FF] px-6 py-2 text-white font-medium text-base rounded-lg hover:bg-[#4a32b3] hover:shadow-lg transition-all duration-300"
                        onClick={() => handleReturn(vehicle._id)}
                      >
                        Return Vehicle
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center mt-20">
              <img
                src="https://via.placeholder.com/300x200?text=No+Details+Available"
                alt="No Data Available"
                className="w-80 h-48 object-contain mb-4"
              />
              <p className="text-lg text-gray-500">No details available at the moment.</p>
            </div>
          )
        )}
      </section>



    </>
  );
}

export default RentVehicle;
