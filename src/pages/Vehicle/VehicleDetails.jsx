/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaTachometerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { GiPathDistance, GiGearStickPattern, GiSettingsKnobs, GiHeatHaze  } from "react-icons/gi";
import { MdOutlineConfirmationNumber, MdLocationOn, MdOutlineCameraRear, MdPhotoCameraFront
    ,MdPropaneTank, MdAirlineSeatReclineNormal,   
  } from "react-icons/md";
  import { SiMake } from "react-icons/si";
import {Link} from 'react-router-dom';
  import { ImPower } from "react-icons/im";

import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoColorPaletteOutline, IoImageOutline, IoSpeedometerOutline  } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiSunFill } from "react-icons/ri";
import { IoLogoModelS } from "react-icons/io";

import { TbAirConditioning } from "react-icons/tb";
import { GrMultimedia } from "react-icons/gr";
import { FaRegRegistered, FaCity } from "react-icons/fa6";




import { IoPersonOutline } from "react-icons/io5";

import axios from "axios";

function VehicleDetails() {
    const [rentTypes, setRentTypes] = useState("");
    const [fetchRentTypes, setFetchRentTypes] = useState([]);
    const [openHead, setOpenHead] = useState(false)
    const [pictures, setPictures] = useState([]);

    useEffect(() => {

        fetchRentType();
    }, []);

    const fetchRentType = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/rentType`);
            setFetchRentTypes(response.data);
            console.log("Fetched Rent types:", response.data);
        } catch (error) {
            console.error("Error fetching Rent types:", error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && pictures.length < 10) {
            setPictures([...pictures, selectedFile]); // Add selected file to the array
        }
    };

    // Function to trigger the hidden file input when the button is clicked
    const triggerFileInput = () => {
        if (pictures.length < 10) {
            document.getElementById("fileInput").click();
        }
    };

    const handleSave = async () => {
        if (!rentTypes) {
            alert("Enter Rent types");
            return;
        }

        const dataToSend = {
            rentTypes,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/rentType`, dataToSend);
            setRentTypes([...rentTypes, response.data]);
            setRentTypes('')
            alert("Data is successfully saved.");
        } catch (error) {
            console.error("Error data:", error);
            alert(error);
        }
    };

    const handleEdit = async (id) => {
        const updatedVehicle = prompt("Enter the update Vehicle Maintenance");
        if (!updatedVehicle) return;

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/rentType/${id}`, {
                vehicleTypes: updatedVehicle,
            });

        } catch (error) {
            console.error("Error updating Rent Type:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Rent ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this Rent Type?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/rentType/${id}`);
            setRentTypes(rentTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting Rent Type:", error);
            }
        }
    };

    return (
        <>
            <nav className='flex justify-between my-4 mx-8'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    Vehicle Details
                </div>
                <Link to='/new-vehicle'>                
                <button className='bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    onClick={() => setOpenHead(true)}
                >
                    +
                </button>
                </Link>


            </nav>
            <hr className='bg-gray-400 mb-4' />

            {openHead && (
                <div className="bg-white mx-auto w-[68rem] border my-4 p-5  shadow-xl rounded-md z-50 relative">
                    <button onClick={() => setOpenHead(false)} className="absolute top-2 
                    right-4 text-[#0096FF] text-xl hover:text-red font-extrabold">
                        X
                    </button>
                    <div className='text-2xl font-extrabold text-[#0096FF] '>
                        Car Details
                    </div>

                    <div className="my-3 grid grid-cols-4">
                        {/* customer name */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoPersonOutline className="mt-[0.5px] font-bold items-center" />
                                    Customer/Dealer Name
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Engine capacity */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <FaTachometerAlt className="mt-[0.5px] items-center" />
                                    Engine Capacity
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* MileAge */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GiPathDistance className="mt-[0.5px] text-black items-center" />
                                    Mileage
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* vehicle type */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GiGearStickPattern className="mt-[0.5px] text-black items-center" />
                                    Transmission Type
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <select
                                    className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                >
                                    <option value="Petrol">Manual</option>
                                    <option value="Diesel">Auto</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="my-3 grid grid-cols-4">
                        {/* date */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <FaRegCalendarAlt className="mt-[0.5px] font-bold items-center" />
                                    Inspection Date
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="date"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* chassis no. */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdOutlineConfirmationNumber className="mt-[0.5px] text-black items-center" />
                                    Chassis No
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Engine Type */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GiSettingsKnobs className="mt-[0.5px] text-black items-center" />
                                    Engine Type
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Registration No */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <FaRegRegistered className="mt-[1px] font-bold items-center" />
                                    Registration No
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        {/* fuel */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <BsFillFuelPumpDieselFill className="mt-[0.5px] font-bold items-center" />
                                    Fuel Type
                                </div>
                            </label>
                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                px-2 py-2 cursor-pointer bg-white"
                            >
                                <select
                                    className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                >
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="CNG">CNG</option>
                                </select>
                            </div>

                        </div>
                        {/* color */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoColorPaletteOutline className="mt-[0.5px] text-black items-center" />
                                    Color
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Location */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdLocationOn className="mt-[0.5px]  items-center" />
                                    Location
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Registered City */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <FaCity className="mt-[0.5px] font-bold items-center" />
                                    Registered City
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-2xl my-2 font-extrabold text-[#0096FF] '>
                        Vehicle Information
                    </div>


                    <div className="mb-4 grid grid-cols-4">
                        {/* car make */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <SiMake className="mt-[0.5px] font-bold items-center" />
                                    Car Make
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="date"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* car model */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoLogoModelS  className="mt-[0.5px] font-bold items-center" />
                                    Car Model
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Engine Power */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <ImPower className="mt-[0.5px] font-bold items-center" />
                                    Engine Power
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Engine No */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdOutlineConfirmationNumber  className="mt-[0.5px] font-bold items-center" />
                                    Engine No
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="my-4 grid grid-cols-4">
                        {/* Seating Capacity */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdAirlineSeatReclineNormal  className="mt-[0.5px] font-bold items-center" />
                                    Seating Capacity
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="date"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Max Speed */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoSpeedometerOutline  className="mt-[0.5px] font-bold items-center" />
                                    Max Speed
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Fuel Tank Capacity */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdPropaneTank  className="mt-[0.5px] font-bold items-center" />
                                    Fuel Tank Capacity
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Sun Roof */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <RiSunFill className="mt-[0.5px] font-bold items-center" />
                                    Sun Roof
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-4 grid grid-cols-4">
                        {/* Multimedia Type */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GrMultimedia className="mt-[0.5px] font-bold items-center" />
                                    Car Make
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <select
                                    className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                >
                                    <option value="CD Player">CD Player</option>
                                    <option value="DVD Player">DVD Player</option>
                                    <option value="Andriod LCD">Andriod LCD</option>
                                </select>
                            </div>
                        </div>
                        {/* Air Conditioner */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <TbAirConditioning className="mt-[0.5px] font-bold items-center" />
                                    Air Conditioner
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Heater */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GiHeatHaze className="mt-[0.5px] font-bold items-center" />
                                    Heater
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Front Camera */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdPhotoCameraFront className="mt-[0.5px] font-bold items-center" />
                                    Front Camera
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4">
                        {/* Rear Camera */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdOutlineCameraRear className="mt-[0.5px] font-bold items-center" />
                                    Rear Camera
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={rentTypes}
                                    onChange={(e) => setRentTypes(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Pictures (Max 10) */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1 items-center">
                                    <IoImageOutline className="mt-[1px]" />
                                    Pictures (Max 10)
                                </div>
                            </label>

                            {/* Display selected picture filenames */}
                            {pictures.map((picture, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between w-[14rem] border rounded px-2 py-2 mb-2"
                                >
                                    <span className="text-gray-800 text-sm truncate">{picture.name}</span>
                                </div>
                            ))}

                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* Add New Picture Button */}
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="flex items-center gap-1 text-blue-600 font-semibold mt-2"
                                disabled={pictures.length >= 10}
                            >
                                <AiOutlinePlus />
                                Add Picture
                            </button>
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-[#0096FF] hover:bg-[#0096FF] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className=" max-w-full mx-10">
                <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                    <thead className="text-sm bg-[#0096FF] text-gray-50">
                        <tr>
                            <th className="border px-1 py-1">SR.#</th>
                            <th className="border px-1 py-1">RENT TYPE</th>
                            <th className="border px-2 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.isArray(fetchRentTypes) && fetchRentTypes.length > 0 ? (
                            fetchRentTypes.map((vehicle, index) => (
                                <tr key={vehicle._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{vehicle.rentType}</td>
                                    <td className="border px-4 py-3 flex justify-center space-x-4">
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(vehicle._id)}
                                            aria-label={`Edit ${vehicle.vehicle}`}
                                        />
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(vehicle._id)}
                                            aria-label={`Delete ${vehicle.vehicle}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border px-4 font-semibold py-2 text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default VehicleDetails;
