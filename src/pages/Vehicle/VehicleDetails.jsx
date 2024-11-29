/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { TbAirConditioning } from "react-icons/tb";
import { SiAirplayvideo } from "react-icons/si";
import { GiCctvCamera } from "react-icons/gi";
import { GiCarWheel } from "react-icons/gi";
import { LuCigarette } from "react-icons/lu";
import IconTooltip from './IconTooltip';



import axios from "axios";

function VehicleDetails() {
    const [vehicles, setVehicles] = useState([]);
    const [currentIndices, setCurrentIndices] = useState({}); // Store indices per vehicle
  
    // Fetch vehicle data once when the component mounts
    useEffect(() => {
      const fetchVehicle = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle-details`);
          setVehicles(response.data);
  
          // Initialize current index for each vehicle
          const initialIndices = {};
          response.data.forEach((vehicle) => {
            initialIndices[vehicle.id] = 0; // Ensure each vehicle has a unique id
          });
          setCurrentIndices(initialIndices);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };
  
      fetchVehicle();
    }, []);
  
    // Automatic Image Slide every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndices((prevIndices) => {
          const newIndices = { ...prevIndices };
  
          vehicles.forEach((vehicle) => {
            const currentIndex = prevIndices[vehicle.id] || 0;
            const nextIndex = (currentIndex + 1) % (vehicle.photos?.length || 1); // Loop around
            newIndices[vehicle.id] = nextIndex;
          });
  
          return newIndices;
        });
      }, 3000); // Change image every 5 seconds
  
      return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [vehicles]);
    console.log("Fetched vehicles:", vehicles);



    return (
        <>
            <nav className='flex justify-between my-4 mx-8'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    All Vehicle Details
                </div>
                <Link to='/new-vehicle'>
                    <button className='bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    >
                        +
                    </button>
                </Link>
            </nav>
            <hr className='bg-gray-400 mb-4' />

            {/* Cards */}
            <div className="">
                <section className="w-fit mx-auto  grid grid-cols-1 lg:grid-cols-3 
                md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-6 
                mt-10 mb-5">
                    {Array.isArray(vehicles) && vehicles.length > 0 ? (
                        vehicles.map((product, index) => (
                            <div
                                key={index + 1}
                                className="w-[22rem] bg-white shadow-xl shadow-gray-400 rounded-xl duration-500 
                                    hover:scale-105 hover:shadow-xl relative"
                            >
                                {/* Image */}
                                {product?.photos?.length > 0 ? (
                                    <img
                                        src={product.photos[currentIndices[product.id] || 0]} // Fallback to 0
                                        alt={`Slide ${currentIndices[product.id] || 0}`}
                                        className="h-80 w-[22rem] object-cover rounded-t-xl"
                                    />
                                ) : (
                                    <p className="text-center">No images available</p>
                                )}

                                {/* Navigation Buttons
                                {product.photos?.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => prevSlide(product.id, product.photos.length)}
                                            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black/50 px-2 py-1 rounded-full"
                                        >
                                            ❮
                                        </button>
                                        <button
                                            onClick={() => nextSlide(product.id, product.photos.length)}
                                            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black/50 px-2 py-1 rounded-full"
                                        >
                                            ❯
                                        </button>
                                    </>
                                )} */}
                                {/* Product Info */}
                                <div className="px-4 text-center font-sans py-3 w-[22rem]">
                                    <span className="flex justify-center text-[#979ead] 
                                    mr-3 uppercase text-sm">
                                        Register No: <span className="uppercase font-bold"> {product.registrationNo}</span>
                                    </span>

                                    <div className=" ml-4 flex justify-between w-[22rem]">
                                        <p className=" text-[#5c6f9d] truncate text-sm block">
                                            Make: <span className=" font-bold mr-2 ">{product.carMake}</span>
                                            Model: <span className=" font-bold mr-2">{product.carModel}</span>
                                            Type:  <span className=" font-bold">{product.carType}</span>
                                        </p>
                                        <p className="text-gray-800 text-sm "></p>
                                    </div>
                                    <div className="flex justify-between w-80">
                                        <p className="text-green text-[0.98rem] block">
                                            Transmission Type: <span className=" font-bold mr-1 ">{product.transmissionType}</span>
                                            Fuel Type:  <span className=" font-bold ">{product.fuelType}</span>
                                        </p>
                                    </div>
                                    <div className="ml-4 flex justify-between w-80">
                                        <p className="text-[#3f568c] text-[0.98rem] block">
                                            Max Speed: <span className=" font-bold mr-1 text-[#3f568c]">{product.maxSpeed}</span>
                                            Seating Capacity:  <span className=" font-bold text-[#3f568c]">{product.seatingCapacity}</span>
                                        </p>
                                    </div>
                                    <div className="ml-4 flex justify-between w-80">
                                        <p className="text-[#ef730f] text-[0.98rem] block">
                                            Color: <span className=" font-bold mr-1 ">{product.color}</span>
                                            Location:  <span className=" font-bold ">{product.location}</span>
                                        </p>
                                    </div>


                                    <div className="mt-2 ml-10 w-80">
                                        <p className="text-[#c138d9] flex justify-start gap-8">
                                            <IconTooltip icon={<TbAirConditioning size={23} />} tooltipText="Air Conditioning" />
                                            <IconTooltip icon={<SiAirplayvideo size={20} />} tooltipText="Andriod Player" />
                                            <IconTooltip icon={<GiCctvCamera size={20} />} tooltipText="CCTV Camera" />
                                            <IconTooltip icon={<GiCarWheel size={20} />} tooltipText="Car Wheel" />
                                            <IconTooltip icon={<LuCigarette size={20} />} tooltipText="Cigarette" />
                                        </p>
                                    </div>

                                    <div className="flex items-center mt-3">
                                        <p className="text-lg font-semibold text-black">
                                            ${product.price}
                                        </p>
                                        <del className="ml-2 text-sm text-gray-600">
                                            ${product.originalPrice}
                                        </del>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        // onClick={() => handleDelete(product.serialNo)}
                                        className="absolute top-4 right-4 text-gray-900 hover:text-red"
                                    >
                                        <AiFillDelete size={24} />
                                    </button>
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
