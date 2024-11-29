/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useRef } from "react";
import { FaTachometerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { GiPathDistance, GiGearStickPattern } from "react-icons/gi";
import {
    MdOutlineConfirmationNumber, MdLocationOn
    , MdPropaneTank, MdAirlineSeatReclineNormal,
} from "react-icons/md";
import { SiMake } from "react-icons/si";
import { Link } from 'react-router-dom';

import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoColorPaletteOutline, IoImageOutline, IoSpeedometerOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { IoLogoModelS } from "react-icons/io";

import { FaRegRegistered, FaCity } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import axios from "axios";

function NewVehicle() {
    const [pictures, setPictures] = useState([]);
    const [files, setFiles] = useState("");
    const [registrationNo, setRegistrationNo] = useState('');
    const [registeredCity, setRegisteredCity] = useState('');
    const [carType, setCarType] = useState('');
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('');
    const [color, setColor] = useState('');
    const [transmissionType, setTransmissionType] = useState('');
    const [engineCapacity, setEngineCapacity] = useState('');
    const [chassisNo, setChassisNo] = useState('');
    const [engineNo, setEngineNo] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [fuelTankCapacity, setFuelTankCapacity] = useState('');
    const [maxSpeed, setMaxSpeed] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState('');
    const [inspectionDate, setInspectionDate] = useState('');
    const [inspectionMileage, setInspectionMileage] = useState('');
    const [airConditioner, setAirConditioner] = useState(false)
    const [heater, setHeater] = useState(false)
    const [sunRoof, setSunRoof] = useState(false)
    const [cdDVD, setCdDVD] = useState(false)
    const [andriod, setAndriod] = useState(false)
    const [frontCamera, setFrontCamera] = useState(false)
    const [rearCamera, setRearCamera] = useState(false)
    const [cigarette, setCigarette] = useState(false)
    const [sterring, setSterring] = useState(false)
    const [wheelCup, setWheelCup] = useState(false)
    const [spareWheel, setSpareWheel] = useState(false)
    const [airCompressor, setAirCompressor] = useState(false)
    const [jackHandle, setJackHandle] = useState(false)
    const [location, setLocation] = useState(false);
    const [wheelPanna, setWheelPanna] = useState(false)
    const [mudFlaps, setMudFlaps] = useState(false)
    const [floorMat, setFloorMat] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef(null);    // Handle file input change

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            registrationNo,
            registeredCity,
            carType,
            carMake,
            carModel,
            color,
            transmissionType,
            engineCapacity,
            chassisNo,
            engineNo,
            fuelType,
            fuelTankCapacity,
            maxSpeed,
            seatingCapacity,
            inspectionDate,
            inspectionMileage,
            location,
            airConditioner,
            heater,
            sunRoof,
            cdDVD,
            andriod,
            frontCamera,
            rearCamera,
            cigarette,
            sterring,
            wheelCup,
            spareWheel,
            airCompressor,
            jackHandle,
            wheelPanna,
            mudFlaps,
            floorMat,
            photos: pictures.map((picture) => picture.url), // Pass only the URLs
        };
    console.log(formData);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/vehicle-details`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Vehicle data submitted successfully:', response.data);
            alert("Vehicle data submitted successfully");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message); alert(error.message);
        }
    };



    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + pictures.length > 10) {
            alert("You can only select up to 10 images.");
        } else {
            setFiles(selectedFiles);
        }
    };

    // Upload Images to Cloudinary
    const handleClick = async (e) => {
        e.preventDefault();
        if (!files || files.length === 0) return;
        setIsLoading(true);

        try {
            const list = await Promise.all(
                files.map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");

                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/daexycwc7/image/upload",
                        data
                    );

                    return uploadRes.data.secure_url; // Get the URL
                })
            );

            setPictures((prevPictures) => [...prevPictures, ...list.map((url) => ({ url }))]);
            setFiles([]); // Reset the files after upload
        } catch (err) {
            console.error("Error uploading images", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete Image
    const handleDelete = (url) => {
        setPictures(pictures.filter((pic) => pic.url !== url));
    };

    // Save function
    const handleSave = async () => {
        try {
            // Implement any save logic here
            console.log("Saving images...");
        } catch (error) {
            console.error("Error saving images:", error);
        }
    };

    return (
        <>
            <nav className='flex justify-between my-4 mx-8'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    New Vehicle
                </div>
                <Link to='/vehicle-details'>
                    <button className='bg-[#0096FF] font-extrabold px-2 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    >
                        ➡
                    </button>
                </Link>


            </nav>
            <hr className='bg-gray-400 mb-4' />


            <div className="bg-white mx-auto w-[68rem] border my-4 p-5  shadow-xl rounded-md z-50 relative">
                <div className='text-2xl font-extrabold text-[#0096FF] '>
                    Vehicle Information
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-3 gap-4 mr-[33rem] grid grid-cols-2">

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
                                    value={registrationNo}
                                    onChange={(e) => setRegistrationNo(e.target.value)}

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
                                    value={registeredCity}
                                    onChange={(e) => setRegisteredCity(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>
                    {/* 1 to 4 */}
                    <div className="mb-4 grid grid-cols-4">
                        {/* car type */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <SiMake className="mt-[0.5px] font-bold items-center" />
                                    Car Type
                                </div>
                            </label>

                            <div
                                className="flex items-center justify-between w-[14rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <select
                                    className="w-full border rounded px-2 py-2"
                                    value={carType}
                                    onChange={(e) => setCarType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>
                        </div>

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
                                <select
                                    className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                    value={carMake}
                                    onChange={(e) => setCarMake(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Petrol">Manual</option>
                                    <option value="Diesel">Auto</option>
                                </select>
                            </div>
                        </div>

                        {/* car model */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoLogoModelS className="mt-[0.5px] font-bold items-center" />
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
                                    value={carModel}
                                    onChange={(e) => setCarModel(e.target.value)}

                                />
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
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>
                    {/* 1 to 4 */}
                    <div className="my-3 grid grid-cols-4">
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
                                    value={transmissionType}
                                    onChange={(e) => setTransmissionType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Petrol">Manual</option>
                                    <option value="Diesel">Auto</option>
                                </select>
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
                                    value={engineCapacity}
                                    onChange={(e) => setEngineCapacity(e.target.value)}

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
                                    value={chassisNo}
                                    onChange={(e) => setChassisNo(e.target.value)}

                                />
                            </div>
                        </div>

                        {/* Engine No */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdOutlineConfirmationNumber className="mt-[0.5px] font-bold items-center" />
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
                                    value={engineNo}
                                    onChange={(e) => setEngineNo(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>


                    <div className='text-2xl my-2 font-extrabold text-[#0096FF] '>
                        Vehicle Details
                    </div>
                    {/* 1 to 4 */}
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
                                    value={fuelType}
                                    required
                                    onChange={(e) => setFuelType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="CNG">CNG</option>
                                </select>
                            </div>
                        </div>

                        {/* Fuel Tank Capacity */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdPropaneTank className="mt-[0.5px] font-bold items-center" />
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
                                    value={fuelTankCapacity}
                                    onChange={(e) => setFuelTankCapacity(e.target.value)}

                                />
                            </div>
                        </div>

                        {/* Max Speed */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <IoSpeedometerOutline className="mt-[0.5px] font-bold items-center" />
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
                                    value={maxSpeed}
                                    onChange={(e) => setMaxSpeed(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* Seating Capacity */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdAirlineSeatReclineNormal className="mt-[0.5px] font-bold items-center" />
                                    Seating Capacity
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
                                    value={seatingCapacity}
                                    onChange={(e) => setSeatingCapacity(e.target.value)}

                                />
                            </div>
                        </div>

                    </div>

                    {/* 1 to 4 */}
                    <div className="my-4 grid  grid-cols-4">
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
                                    value={inspectionDate}
                                    onChange={(e) => setInspectionDate(e.target.value)}

                                />
                            </div>
                        </div>
                        {/* MileAge */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <GiPathDistance className="mt-[0.5px] text-black items-center" />
                                    Inspection on Mileage
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
                                    value={inspectionMileage}
                                    onChange={(e) => setInspectionMileage(e.target.value)}

                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                <div className="flex justify-start gap-1">
                                    <MdLocationOn className="mt-[0.5px]  items-center" />
                                    Inspection Location
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
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap my-3 border-2 px-2 py-2 mr-10 gap-3">
                        {/* Checkbox 1 */}
                        <div className="flex items-center mr-20">
                            <label className="text-gray-800 font-semibold">
                                Air Conditioner
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={airConditioner}  // Bind the `checked` attribute to the state
                                    onChange={(e) => setAirConditioner(e.target.checked)}
                                />
                            </label>
                        </div>

                        {/* Checkbox 2 */}
                        <div className="flex items-center mx-20">
                            <label className="text-gray-800 font-semibold">
                                Heater
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-4 h-[18px] w-5 focus:ring"
                                    checked={heater}
                                    onChange={(e) => setHeater(e.target.checked)}
                                />
                            </label>
                        </div>

                        {/* Checkbox 3 */}
                        <div className="flex items-center mx-20">
                            <label className="text-gray-800 font-semibold">
                                Sun Roof
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={sunRoof}
                                    onChange={(e) => setSunRoof(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 4 */}
                        <div className="flex items-center ml-20">
                            <label className="text-gray-800 font-semibold">
                                CD/DVD Player
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={cdDVD}
                                    onChange={(e) => setCdDVD(e.target.checked)}
                                />
                            </label>
                        </div>

                        {/* Checkbox 5 */}
                        <div className="flex items-center mr-20">
                            <label className="text-gray-800 font-semibold">
                                Andriod Player
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={andriod}
                                    onChange={(e) => setAndriod(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 6*/}
                        <div className="flex items-center mx-10">
                            <label className="text-gray-800 font-semibold">
                                Front Camera
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={frontCamera}
                                    onChange={(e) => setFrontCamera(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 7 */}
                        <div className="flex items-center mx-20">
                            <label className="text-gray-800 font-semibold">
                                Rear Camera
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-[20px] h-[18px] w-5 focus:ring"
                                    checked={rearCamera}
                                    onChange={(e) => setRearCamera(e.target.checked)}
                                />
                            </label>
                        </div>

                        {/* Checkbox 8 */}
                        <div className="flex items-center ml-[70px]">
                            <label className="text-gray-800 font-semibold">
                                Cigarette Lighter
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={cigarette}
                                    onChange={(e) => setCigarette(e.target.checked)}
                                />
                            </label>
                        </div>

                        {/* Checkbox 9 */}
                        <div className="flex items-center mr-20">
                            <label className="text-gray-800 font-semibold">
                                Sterring Lock
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-5 h-[18px] w-5 focus:ring"
                                    checked={sterring}
                                    onChange={(e) => setSterring(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 10 */}
                        <div className="flex items-center mx-12">
                            <label className="text-gray-800 font-semibold">
                                Wheel Cups
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={wheelCup}
                                    onChange={(e) => setWheelCup(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 11 */}
                        <div className="flex items-center mx-20">
                            <label className="text-gray-800 font-semibold">
                                Spare Wheel
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-3 h-[18px] w-5 focus:ring"
                                    checked={spareWheel}
                                    onChange={(e) => setSpareWheel(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 12 */}
                        <div className="flex items-center ml-20">
                            <label className="text-gray-800 font-semibold">
                                Air Compressor
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={airCompressor}
                                    onChange={(e) => setAirCompressor(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 13 */}
                        <div className="flex items-center mr-20">
                            <label className="text-gray-800 font-semibold">
                                Jack & Handle
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-3 h-[18px] w-5 focus:ring"
                                    checked={jackHandle}
                                    onChange={(e) => setJackHandle(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 14 */}
                        <div className="flex items-center mx-10">
                            <label className="text-gray-800 font-semibold">
                                Wheel Panna
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-[10px] h-[18px] w-5 focus:ring"
                                    checked={wheelPanna}
                                    onChange={(e) => setWheelPanna(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 15 */}
                        <div className="flex items-center mx-28">
                            <label className="text-gray-800 font-semibold">
                                Mud Flaps
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={mudFlaps}
                                    onChange={(e) => setMudFlaps(e.target.checked)}
                                />
                            </label>
                        </div>
                        {/* Checkbox 16 */}
                        <div className="flex items-center ml-20">
                            <label className="text-gray-800 font-semibold">
                                Floor Mats
                                <input
                                    type="checkbox"
                                    className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                                    checked={floorMat}
                                    onChange={(e) => setFloorMat(e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>


                    {/* Pictures Section */}
                    <div>
                        <label htmlFor="file" className="text-gray-800 font-semibold my-4 ">
                            <div className="flex justify-start gap-1 cursor-pointer items-center">
                                <IoImageOutline className="mt-[1px]" />
                                Pictures  <AiOutlinePlus /> (Max 10)
                            </div>
                        </label>

                        <input
                            type="file"
                            id="file"
                            multiple
                            disabled={pictures.length >= 10}
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />


                    </div>

                    {/* Image Upload Button */}
                    <div className="flex justify-center">
                        <button
                            className="bg-[#0096FF] hover:bg-[#0096FF] hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white text-md font-bold w-40 py-2 mt-2 rounded-full"
                            onClick={handleClick}
                        >
                            {isLoading ? (
                                <span className="loader"></span> // Show loader when loading
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </div>

                    {/* Loading Spinner CSS */}
                    <style jsx>{`
        .loader {
          border: 4px solid transparent;
          border-top: 4px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>


                    <div className="my-4">
                        {/* Custom Buttons for Navigation */}
                        <div className="flex justify-between mb-4">
                            <button
                                className="bg-blue-500 text-white p-2 rounded-full"
                                onClick={() => swiperRef.current.swiper.slidePrev()} // Navigate to previous slide
                            >
                                Prev
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded-full"
                                onClick={() => swiperRef.current.swiper.slideNext()} // Navigate to next slide
                            >
                                Next
                            </button>
                        </div>

                        {/* Swiper Component */}
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            ref={swiperRef}
                        >
                            {pictures.map((picture, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <img src={picture.url} alt="Uploaded" className="w-full h-40 object-cover rounded-lg" />
                                        <button
                                            className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
                                            onClick={() => handleDelete(picture.url)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                </form>
            </div>

        </>
    );
}

export default NewVehicle;
