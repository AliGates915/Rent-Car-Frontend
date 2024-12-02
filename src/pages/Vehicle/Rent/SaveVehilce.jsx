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

function SaveVehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [saveVehicle, setSaveVehicles] = useState([]);
    const [currentIndices, setCurrentIndices] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    // Fetch vehicle data once when the component mounts

    // vehicle details
    // useEffect(() => {
    //     const fetchVehicle = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle-details`);
    //             setVehicles(response.data);

    //             // Initialize current index for each vehicle
    //             const initialIndices = {};
    //             response.data.forEach((vehicle) => {
    //                 if (vehicle.photos && vehicle.photos.length > 0) {
    //                     initialIndices[vehicle.id] = 0; // Ensure each vehicle has a unique id and valid photos array
    //                 }
    //             });
    //             setCurrentIndices(initialIndices);
    //         } catch (error) {
    //             console.error("Error fetching vehicles:", error);
    //         } finally {
    //             setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
    //         }
    //     };

    //     fetchVehicle();
    // }, []);

    // Customer details
    // useEffect(() => {
    //     const fetchVehicle = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);
    //             console.log("Data", response.data);
    //             if (Array.isArray(response.data)) {
    //                 setCustomerInfo(response.data);
    //             } else {
    //                 console.error("Data is not an array. Resetting to empty array.");
    //                 setCustomerInfo([]); // Set as empty array if response isn't an array
    //             }
    //             // Initialize current index for each vehicle


    //         } catch (error) {
    //             console.error("Error fetching vehicles:", error);
    //         } finally {
    //             setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
    //         }
    //     };

    //     fetchVehicle();
    // }, []);

    // Rent Vehicle Page (Displaying Booked Vehicles)
    useEffect(() => {
        setIsLoading(true);
        const fetchSaveVehicles = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/vehicle-details/booking`
                );

                console.log("Fetched Vehicles", response.data);

                if (Array.isArray(response.data)) {
                    // Separate available and booked vehicles
                    const bookedVehicles = response.data.filter(
                        (vehicle) => vehicle.isSaved || vehicle.isBooked
                    );

                    setSaveVehicles(bookedVehicles);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setSaveVehicles([]); // Reset to empty array if response isn't an array
                }
            } catch (error) {
                console.error("Error fetching rented vehicles:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
            }
        };

        fetchSaveVehicles();
    }, [vehicles]); // Fetch on component mount



    // Handle rent button click
    const handleSave = async (id) => {
        console.log("id", id);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/vehicle-details/save-vehicle/${id}`
            );

            console.log("After Save", response.data);
            alert("Vehicle returned successfully.");
        } catch (error) {
            console.error("Error returning vehicle:", error.response?.data || error.message);
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



    return (
        <>
            <nav className='flex justify-between my-4 mx-8'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    All Save Vehicles
                </div>

            </nav>
            <hr className='bg-gray-400 mb-4' />

            {/* Cards */}
            <div className="w-full">
                <section className="w-fit mx-auto grid grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-6 mt-10 mb-5">
                    {isLoading ? (
                        <div className="flex justify-center mt-48 min-h-screen">
                            <FadeLoader color="#0fdaee" size={15} margin={5} />
                        </div>
                    ) : (
                        Array.isArray(saveVehicle) && saveVehicle.length > 0 ? (
                            saveVehicle.map((vehicle, index) => {
                                // Render each vehicle card
                                return (
                                    <div
                                        key={index}
                                        className="w-[320px] bg-white shadow-xl shadow-gray-400 rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
                                    >
                                        {/* Image Section */}
                                        {vehicle?.photos?.length > 0 ? (
                                            <img
                                                src={vehicle.photos[currentIndices[vehicle.id] || 0]}
                                                alt={`Slide ${currentIndices[vehicle.id] || 0}`}
                                                className="h-80 w-[22rem] object-cover rounded-t-xl"
                                            />
                                        ) : (
                                            <p className="text-center">No images available</p>
                                        )}

                                        {/* Vehicle Info */}
                                        <div className="px-4 text-center font-sans py-3 w-[20rem]">
                                            <span className="flex justify-center text-[#979ead] uppercase text-sm">
                                                Register No:{" "}
                                                <span className="uppercase font-bold ml-1">
                                                    {vehicle.registrationNo}
                                                </span>
                                            </span>

                                            <div className="ml-2 flex justify-between w-[22rem]">
                                                <p className="text-[#5c6f9d] truncate text-sm block">
                                                    Make:{" "}
                                                    <span className="font-bold mr-2">{vehicle.carMake}</span>
                                                    Model:{" "}
                                                    <span className="font-bold mr-2">{vehicle.carModel}</span>
                                                    Type: <span className="font-bold">{vehicle.carType}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Icon Section */}
                                        <div className="mt-2 ml-10 w-80">
                                            <p className="text-[#c138d9] flex justify-start gap-8">
                                                <IconTooltip
                                                    icon={<TbAirConditioning size={23} />}
                                                    tooltipText="Air Conditioning"
                                                />
                                                <IconTooltip
                                                    icon={<SiAirplayvideo size={20} />}
                                                    tooltipText="Airplay Video"
                                                />
                                                <IconTooltip
                                                    icon={<GiCctvCamera size={20} />}
                                                    tooltipText="CCTV Camera"
                                                />
                                                <IconTooltip
                                                    icon={<GiCarWheel size={20} />}
                                                    tooltipText="Car Wheel"
                                                />
                                                <IconTooltip
                                                    icon={<LuCigarette size={20} />}
                                                    tooltipText="Cigarette"
                                                />
                                            </p>
                                        </div>

                                        {/* Actions Section */}
                                        <div className="flex justify-center mt-3 px-4">
                                            <p className="text-[16px] text-black">
                                                Total Amount:
                                                <span className="ml-1 text-[22px] text-sky-500 font-semibold">
                                                    Rs.{vehicle.ratePerDay || 1000}
                                                </span>
                                            </p>
                                        </div>

                                        {/* Return Vehicle Button */}
                                        <div className="mt-2 mb-4 flex justify-center">
                                            <button
                                                className="bg-[#0096FF] hover:font-extrabold px-8 py-2 rounded-lg transition-all duration-300 text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
                                                onClick={() => handleSave(vehicle._id)}
                                            >
                                                Return to Available
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            // Fallback content when no vehicles are available
                            <div className="w-full">
                                <img
                                    src="https://via.placeholder.com/300x200?text=No+Vehicles+Available"
                                    alt="No Data Available"
                                    className="w-[300px] h-[200px] object-contain mb-5"
                                />
                            </div>
                        )
                    )}
                </section>
            </div>


        </>
    );
}

export default SaveVehicle;
