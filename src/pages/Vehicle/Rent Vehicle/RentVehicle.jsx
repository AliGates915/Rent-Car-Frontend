/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import { FaRegRegistered } from "react-icons/fa6";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function RentVehicle() {
    const [head, setHead] = useState("");
    const [file, setFile] = useState(null);

    const [headCode, setHeadCode] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [headTypes, setHeadTypes] = useState([]);
    const [selectedCompanyType, setSelectedCompanyType] = useState("");
    const [description, setDescription] = useState('');
    const [registrationNo, setRegistrationNo] = useState('');


    const handleSave = async () => {
        if (!selectedCompanyType || !head || !description) {
            alert("Please Enter and Select fields");
            return;
        }

        const dataToSend = {
            companyName: selectedCompanyType,
            companyCode,
            headName: head,
            headCode,
            description,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/heads`, dataToSend);
            setHeadTypes([...headTypes, response.data]);
            setSelectedCompanyType("");
            setHead("");
            setDescription("");
            setCompanyCode("");
            setHeadCode("");
            alert("Data is successfully saved.");
        } catch (error) {
            console.error("Error saving head:", error);
            alert(error);
        }
    };

    const handleEdit = async (id) => {
        const updatedHeadName = prompt("Enter the new head name:");
        if (!updatedHeadName) return;

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/heads/${id}`, {
                head: updatedHeadName,
            });
            setHeadTypes(
                headTypes.map((head) =>
                    head._id === id ? response.data : head
                )
            );
        } catch (error) {
            console.error("Error updating head:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Head ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this head?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/heads/${id}`);
            setHeadTypes(headTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting head:", error);
            }
        }
    };


    return (
        <>
            <nav className='flex justify-between my-4 mx-10'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    RENT RECEIPT
                </div>

                <Link to='/owner-details'>
                    <button className='bg-[#0096FF] font-extrabold px-2 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    >
                        ➡
                    </button>
                </Link>

            </nav>
            <hr className='bg-gray-400 mb-4' />

            <div className="bg-white mx-auto w-[68rem] border my-4 p-6 shadow-xl rounded-md z-50 relative">
                <div className="grid grid-cols-8 gap-3 px-4">
                    {/* Owner Code */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Serial No.</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="012"
                        />
                    </div>

                    {/* Registration Date */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Date</label>
                        <input
                            type="date"
                            className="w-[11.5rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Customer Name */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Customer Name</label>
                        <div
                            className="flex items-center justify-between w-[27rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <select
                                className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                            >
                                <option value="">Select Customer</option>
                                <option value="Petrol">Ali</option>
                                <option value="Diesel">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-8 gap-3 px-4">
                    {/* CINC No. */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">CINC No.</label>
                        <input
                            type="text"
                            className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="35xxx-xxxxxxxx-x"
                        />
                    </div>
                    {/*  Driving License Image */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Driving License Image
                        </label>
                        <input
                            type="text"
                            className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="35xxx-xxxxxxxx-x"
                        />
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-3 px-4">

                    {/* Address */}
                    <div className="col-span-4 ">
                        <label className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input
                            type="text"
                            className="w-[39rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Address"
                        />
                    </div>
                </div>


                {/* City */}
                <div className=" mt-4 col-span-4 px-4">
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                        type="text"
                        className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter City"
                    />
                </div>

                <div className="mt-4 grid grid-cols-8 gap-3 px-4">
                    {/* Mobile No */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Mobile No.</label>
                        <input
                            type="text"
                            className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="04440xxxxxx"
                        />
                    </div>

                    {/* Residence Phone */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                        <input
                            type="text"
                            className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="+923xxxxxxx"
                        />
                    </div>
                </div>

                <div className='my-3 text-2xl px-4 font-extrabold text-[#0096FF] tracking-wide '>
                    Reference Details
                </div>

                <div className="px-4">
                    {/* Reference Name */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Reference Name
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[20rem] border rounded 
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

                    <div className="mt-4 grid grid-cols-8 gap-3">
                        {/* Mobile No */}
                        <div className="col-span-3">
                            <label className="block text-gray-700 font-semibold mb-2">Mobile No.</label>
                            <input
                                type="text"
                                className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="04440xxxxxx"
                            />
                        </div>

                    </div>
                </div>

                <div className='my-3 text-2xl px-4 font-extrabold text-[#0096FF] tracking-wide '>
                    Vehicle Information
                </div>

                <div className="px-4">
                    {/* Registration No. */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Registration No.
                        </label>
                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <select
                                className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                            >
                                <option value="">Select Registration No.</option>
                                <option value="Petrol">0001</option>
                                <option value="Diesel">012</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-4 px-4 grid grid-cols-8 gap-3">
                    {/* car Type */}
                    <div className="col-span-2">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Car Type
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                readOnly
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}

                            />
                        </div>
                    </div>
                    {/* car Make */}
                    <div className="ml-4 col-span-2">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Car Make
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[12rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}

                            />
                        </div>
                    </div>

                    {/* car model */}
                    <div className="ml-7 col-span-3">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Car Model
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[12rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}

                            />
                        </div>
                    </div>
                </div>

                <div className="my-3 px-4 grid grid-cols-4">

                    {/* Transmission type */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Transmission Type
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <select
                                className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                            >
                                {/* Auto Selection from the backend based on the 
                                   register no. */}
                            </select>
                        </div>
                    </div>

                    {/* Engine capacity */}
                    <div className="ml-4">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Engine Capacity
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[12rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* chassis no. */}
                    <div className="ml-8">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Chassis No
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[12rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Engine No */}
                    <div className="ml-8">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Engine No.
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[10rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="flex pl-2 flex-wrap my-3 border-2 px-2 py-2 mr-10 gap-3">
                    {/* Checkbox 1 */}
                    <div className="flex items-center mr-20">
                        <label className="text-gray-800 font-semibold">
                            Air Conditioner
                            <input
                                type="checkbox"
                                className="form-checkbox pt-3 ml-2 h-[18px] w-5 focus:ring"
                            // checked={airConditioner}  // Bind the `checked` attribute to the state
                            // onChange={(e) => setAirConditioner(e.target.checked)}
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
                            // checked={heater}
                            // onChange={(e) => setHeater(e.target.checked)}
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
                            // checked={sunRoof}
                            // onChange={(e) => setSunRoof(e.target.checked)}
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
                            // checked={cdDVD}
                            // onChange={(e) => setCdDVD(e.target.checked)}
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
                            // checked={andriod}
                            // onChange={(e) => setAndriod(e.target.checked)}
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
                            // checked={frontCamera}
                            // onChange={(e) => setFrontCamera(e.target.checked)}
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
                            // checked={rearCamera}
                            // onChange={(e) => setRearCamera(e.target.checked)}
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
                            // checked={cigarette}
                            // onChange={(e) => setCigarette(e.target.checked)}
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
                            // checked={sterring}
                            // onChange={(e) => setSterring(e.target.checked)}
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
                            // checked={wheelCup}
                            // onChange={(e) => setWheelCup(e.target.checked)}
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
                            // checked={spareWheel}
                            // onChange={(e) => setSpareWheel(e.target.checked)}
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
                            // checked={airCompressor}
                            // onChange={(e) => setAirCompressor(e.target.checked)}
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
                            // checked={jackHandle}
                            // onChange={(e) => setJackHandle(e.target.checked)}
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
                            // checked={wheelPanna}
                            // onChange={(e) => setWheelPanna(e.target.checked)}
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
                            // checked={mudFlaps}
                            // onChange={(e) => setMudFlaps(e.target.checked)}
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
                            // checked={floorMat}
                            // onChange={(e) => setFloorMat(e.target.checked)}
                            />
                        </label>
                    </div>
                </div>


                {/* Date to from */}
                <div className="my-3 px-4 grid grid-cols-4">

                    {/* date from */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Date From
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="date" name="dateFrom" id="date"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>

                    {/* date to */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Date To
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="date" name="dateFrom" id="date"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>

                    {/*  Total Days */}
                    <div className="ml-8">
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Total Days
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[12rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input
                                type="number"
                                className="bg-transparent text-gray-800 text-sm outline-none
                    w-full"
                            // value={rentTypes}
                            // onChange={(e) => setRentTypes(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* City to from */}
                <div className="my-3 px-4 grid grid-cols-4">

                    {/*city from */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                From City
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="text"
                                placeholder="Form City"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>

                    {/* To City */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                To City
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="text"
                                placeholder="To City"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Meter Reading */}
                <div className="my-3 px-4 grid grid-cols-4">
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Meter Reading
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="text"
                                placeholder="250km"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Vehicle Out Date */}
                <div className="my-3 px-4 grid grid-cols-4">
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Vehicle Out Date
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="date"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* bill Information  */}
                <div className='my-3 text-2xl px-4 font-extrabold text-[#0096FF] tracking-wide '>
                    Bill Information
                </div>

                <div className="my-3 px-4 grid grid-cols-4">
                    {/* Total Amount */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Total Amount
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                        >
                            <input type="number"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* City to from */}
                <div className="my-3 px-4 grid grid-cols-4">

                    {/* Advance Amount */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                                Advance Amount
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                            px-2 py-2 cursor-pointer"
                        >
                            <input type="number"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                 w-full"
                            />
                        </div>
                    </div>

                    {/* Balance Amount */}
                    <div>
                        <label className="text-gray-800 font-semibold my-4">
                            <div className="flex justify-start gap-1">
                            Balance Amount
                            </div>
                        </label>

                        <div
                            className="flex items-center justify-between w-[13rem] border rounded 
                            px-2 py-2 cursor-pointer"
                        >
                            <input type="number"
                                className="bg-transparent text-gray-800 text-sm outline-none
                                w-full"
                            />
                        </div>
                    </div>
                </div>


                {/* Save */}
                <div className="flex justify-center">
                    <button
                        className="bg-[#0096FF] hover:bg-[#0096FF] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export default RentVehicle;
