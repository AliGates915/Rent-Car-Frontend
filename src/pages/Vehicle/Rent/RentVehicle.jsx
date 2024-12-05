/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { TbAirConditioning } from "react-icons/tb";
import { SiAirplayvideo } from "react-icons/si";
import { GiCctvCamera } from "react-icons/gi";
import { GiCarWheel } from "react-icons/gi";
import { LuCigarette } from "react-icons/lu";
import IconTooltip from '../IconTooltip';


import {
    FadeLoader
} from 'react-spinners';


import axios from "axios";

function RentVehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [images, setImages] = useState([]);
    const [currentIndices, setCurrentIndices] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    // Fetch vehicle data once when the component mounts

    // vehicle details
    useEffect(() => {
        const fetchVehicle = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`
                    ${process.env.REACT_APP_API_URL}/rent-receipt`);
                if (Array.isArray(response.data)) {
                    console.log("Data is an array.", response.data);
                    setVehicles(response.data);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setVehicles([]); // Set as empty array if response isn't an array
                }

                // Initialize current index for each vehicle
                const initialIndices = {};
                response.data.forEach((vehicle) => {
                    if (vehicle.photos && vehicle.photos.length > 0) {
                        initialIndices[vehicle.id] = 0; // Ensure each vehicle has a unique id and valid photos array
                    }
                });
                setCurrentIndices(initialIndices);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
            }
        };

        fetchVehicle();
    }, []);

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
    // useEffect(() => {
    //     const fetchVehicle = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);
    //             console.log("Customer Data:", response.data);
    //             if (Array.isArray(response.data)) {
    //                 setCustomerInfo(response.data);
    //             } else {
    //                 setCustomerInfo([]);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching customer details:", error);
    //         } finally {
    //             setTimeout(() => setIsLoading(false), 2000);
    //         }
    //     };
    //     fetchVehicle();
    // }, []);

    // display images
    useEffect(() => {
        const fetchVehicle = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle-details/return-vehicle`);
                if (Array.isArray(response.data)) {
                    console.log("Vehicle Data", response.data);
                    setImages(response.data);

                    // Initialize current index for each vehicle if photos array exists
                    const initialIndices = {};
                    response.data.forEach((photo) => {
                        if (photo.photos && photo.photos.length > 0) {
                            initialIndices[photo._id] = 0; // Using _id for uniqueness
                        }
                    });
                    setCurrentIndices(initialIndices);
                } else {
                    console.error("Data is not an array.");
                    setImages([]);
                }
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicle();
    }, []);


    // Handle rent button click

    const handleReturn = async (id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/vehicle-details/save-return-vehicle/${id}`);
            alert("Vehicle Returned Successfully")
            console.log('Vehicle returned:', response.data);
            setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== id));

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

    // Automatic Image Slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndices((prevIndices) => {
                const newIndices = { ...prevIndices };

                vehicles.forEach((vehicle) => {
                    if (vehicle.photos && vehicle.photos.length > 0) {
                        const currentIndex = prevIndices[vehicle.id] || 0;
                        const nextIndex = (currentIndex + 1) % vehicle.photos.length; // Loop within available images
                        newIndices[vehicle.id] = nextIndex;
                    }
                });

                return newIndices;
            });
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [vehicles]);

    // Delete item


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
            <section className="w-fit mx-auto grid grid-cols-3 justify-items-center gap-y-20 gap-x-6 mt-10 mb-5">
                {isLoading ? (
                    <div className="flex justify-center mt-48 min-h-screen">
                        <FadeLoader color="#0fdaee" size={15} margin={5} />
                    </div>
                ) : Array.isArray(images) && Array.isArray(vehicles) && images.length > 0 && vehicles.length > 0 ? (
                    images.map((vehicle, index) => (
                        <div
                            key={index}
                            className="w-[320px] bg-white shadow-xl rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                        >
                            {/* Image Section */}
                            {Array.isArray(vehicle.photos) && vehicle.photos.length > 0 ? (
                                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                <img
                                    src={
                                        vehicle.photos[0] || // Display the first image or fallback image
                                        "https://via.placeholder.com/300x200?text=No+Image+Available"
                                    }
                                    alt={`Vehicle Image`}
                                    className="h-80 w-80 rounded-t-xl object-cover"
                                />
                            ) : (
                                <p className="text-center">No images available</p>
                            )}

                            {/* Vehicle Information Section */}
                            <div className="px-4 text-center font-sans py-3 w-[20rem]">
                                <span className="flex justify-center text-[#979ead] uppercase text-sm">
                                    Register No: <span className="uppercase font-bold">
                                        {vehicles[index]?.vehicleInfo?.registrationNo || "N/A"}</span>
                                </span>

                                <div className="ml-2 flex justify-between w-[22rem]">
                                    <p className="text-[#5c6f9d] truncate text-[16px] block">
                                        Make: <span className="font-bold mr-2">
                                            {vehicles[index]?.vehicleInfo?.carMake || "N/A"}</span>
                                        Model: <span className="font-bold mr-2">
                                            {vehicles[index]?.vehicleInfo?.carModel || "N/A"}</span>
                                        Year: <span className="font-bold">
                                            {vehicle.yearOfModel}</span>
                                    </p>
                                </div>

                                <div className="flex justify-center w-80">
                                    <p className="text-[#ab32e4] font-medium text-[1rem] block">
                                        CustomerName: <span className="font-bold mr-1">
                                            {vehicles[index]?.customerInfo?.customerName || "N/A"}</span>
                                    </p>
                                </div>
                                <div className="flex justify-around w-80">
                                    <p className="text-[#30e145] text-[0.98rem] block">
                                    From: <span className="font-bold mr-2">
                                            {formatDate(vehicles[index]?.rentalInfo?.dateFrom)}</span>
                                    To: <span className=" font-bold">
                                            {formatDate(vehicles[index]?.rentalInfo?.dateTo)}</span>
                                    </p>
                                </div>

                                <div className="mt-2 ml-10 w-80">
                                    <p className="text-[#c138d9] flex justify-start gap-8">
                                        <IconTooltip icon={<TbAirConditioning size={23} />} tooltipText="Air Conditioning" />
                                        <IconTooltip icon={<SiAirplayvideo size={20} />} tooltipText="Airplay Video" />
                                        <IconTooltip icon={<GiCctvCamera size={20} />} tooltipText="CCTV Camera" />
                                        <IconTooltip icon={<GiCarWheel size={20} />} tooltipText="Car Wheel" />
                                        <IconTooltip icon={<LuCigarette size={20} />} tooltipText="Cigarette" />
                                    </p>
                                </div>

                                <div className="flex justify-center mt-3">
                                    {/* Text Section */}
                                    <p className="text-[16px] font-bold text-teal-500">
                                        Total Amount:
                                        <span className="ml-2 text-[20px]  font-semibold">
                                            Rs.{vehicles[index]?.rentalInfo?.totalAmount || "N/A"}
                                        </span>
                                    </p>
                                </div>
                                <div className="my-2 flex justify-center">
                                    <button className="bg-[#0096FF] hover:font-extrabold px-8 py-2 
                                            rounded-lg transition-all duration-300 
                                                text-xl text-white tracking-wide flex items-center justify-center
                                         hover:bg-[#4a32b3] 
                                            hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
                                        onClick={() => handleReturn(vehicle._id)}
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <img
                            src="https://via.placeholder.com/300x200?text=No+Vehicles+Available"
                            alt="No Data Available"
                            className="w-[300px] h-[200px] object-contain mb-5"
                        />
                        <p className="text-lg text-gray-500">No vehicles available at the moment.</p>
                    </div>
                )}
            </section>





        </>
    );
}

export default RentVehicle;
