/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TbAirConditioning } from "react-icons/tb";
import { SiAirplayvideo } from "react-icons/si";
import { GiCctvCamera } from "react-icons/gi";
import { GiCarWheel } from "react-icons/gi";
import { LuCigarette } from "react-icons/lu";
import IconTooltip from './IconTooltip';

import {
    FadeLoader
} from 'react-spinners';


import axios from "axios";

function VehicleDetails() {
    const [vehicles, setVehicles] = useState([]);
    const [currentIndices, setCurrentIndices] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch vehicle data once when the component mounts
    useEffect(() => {
        const fetchVehicle = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle-details`);
                setVehicles(response.data);

                // Initialize current index for each vehicle
                const initialIndices = {};
                response.data.forEach((vehicle) => {
                    if (vehicle.photos && vehicle.photos.length > 0) {
                        initialIndices[vehicle.id] = 0;
                        // Ensure each vehicle has a unique id and valid photos array
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


    const handleBook = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/vehicle-details/book-vehicle/${id}`);
            console.log('Vehicle booked:', response.data);
            // Remove booked vehicle from list
            setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        } catch (error) {
            console.error('Error booking vehicle:', error.response?.data || error.message);
        }
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
    const handleDelete = async (id) => {
        if (!id) {
            console.error("Vehicle ID is undefined.");
            return;
        }

        // Confirm with the user before proceeding with the delete
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            console.log("Deleting vehicle with id:", id); // Log ID to ensure it's correct
            await axios.delete(`${process.env.REACT_APP_API_URL}/vehicle-details/${id}`);
            setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    return (
        <>
            <nav className='flex justify-between my-4 mx-8'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    All Vehicle Details
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
            <div className="">
                <section className="w-fit mx-auto  grid grid-cols-3 
                 justify-items-center justify-center gap-y-20 gap-x-6 
                mt-10 mb-5">
                    {isLoading ? (
                        <div className=" ml-[40rem] mt-28 min-h-screen">
                            <FadeLoader
                                color="#26d7d7" size={30} margin={4} />
                        </div>
                    ) : Array.isArray(vehicles) && vehicles.length > 0 ? (
                        vehicles.map((product, index) => (
                            <div
                                key={index}
                                className="w-[320px] bg-white shadow-xl shadow-gray-400 
                                rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
                            >
                                {/* Image */}
                                {product?.photos?.length > 0 ? (
                                    <img
                                        src={product.photos[currentIndices[product.id] || 0]} // Properly access the current index for this vehicle
                                        alt={`Slide ${currentIndices[product.id] || 0}`}
                                        className="h-80 w-[22rem] object-cover rounded-t-xl"
                                    />
                                ) : (
                                    <p className="text-center">No images available</p>
                                )}

                                {/* Product Info */}
                                <div className="px-4 text-center font-sans py-3 w-[20rem]">
                                    <span className="flex justify-center text-[#979ead] uppercase text-sm">
                                        Register No: <span className="uppercase font-bold"> {product.registrationNo}</span>
                                    </span>

                                    <div className="ml-2 flex justify-between w-[22rem]">
                                        <p className="text-[#5c6f9d] truncate text-sm block">
                                            Make: <span className="font-bold mr-2">{product.carMake}</span>
                                            Model: <span className="font-bold mr-2">{product.carModel}</span>
                                            Type: <span className="font-bold">{product.carType}</span>
                                        </p>
                                    </div>


                                    <div className="ml-6 flex justify-between w-80">
                                        <p className="text-[#ef730f] text-[0.98rem] block">
                                            Color: <span className="font-bold mr-1">{product.color}</span>
                                            Location: <span className="font-bold">{product.location || "Lahore"}</span>
                                        </p>
                                    </div>
                                    <div className="ml-4 flex justify-between w-80">
                                        <p className="text-[#76d930] text-[0.79rem] block">
                                            VehicleCompany: <span className="font-bold mr-1">{product.carMake}</span>
                                            ModelOfYear: <span className="font-bold">{product.yearOfModel || 2012}</span>
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

                                    <div className="flex justify-between mt-3">
                                        {/* Text Section */}
                                        <p className="text-[14px] text-black">
                                            Per Day Charge:
                                            <span className="ml-2 text-[20px] text-sky-500 font-semibold">
                                                Rs.{product.ratePerDay || 1000}
                                            </span>
                                        </p>

                                        {/* Icon Section */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                // onClick={() => handleEdit(product._id)}
                                                className="text-gray-900 hover:text-green"
                                            >
                                                <FaEdit size={24} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="text-gray-900 hover:text-red"
                                            >
                                                <AiFillDelete size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="my-2 flex justify-center">
                                        <button className="bg-[#0096FF] hover:font-extrabold px-8 py-2 
                                        rounded-lg transition-all duration-300 
                                        text-xl text-white tracking-wide flex items-center justify-center
                                        hover:bg-[#4a32b3] 
                                        hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
                                            onClick={() => handleBook(product._id)}
                                        >
                                            Book
                                        </button>
                                    </div>


                                    {/* Delete Button */}

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No vehicles available</p>
                    )}

                </section>
            </div>

        </>
    );
}

export default VehicleDetails;
