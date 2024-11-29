/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import { FaRegRegistered } from "react-icons/fa6";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function NewCustomer() {
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
                    CUSTOMER INFO
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

            <div className="bg-white mx-auto w-[44rem] border my-4 p-6 shadow-xl rounded-md z-50 relative">
                <div className="grid grid-cols-8 gap-3">
                    {/* Owner Code */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Customer Code</label>
                        <input
                            type="text"
                            className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Customer Code"
                        />
                    </div>

                    {/* Registration Date */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Reg. Date</label>
                        <input
                            type="date"
                            className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    {/* Profile Image */}
                    <div className="col-span-2">
                        <label htmlFor="file" className="flex items-center gap-2 cursor-pointer text-gray-800 font-semibold">
                            Profile Photo
                            <DriveFolderUploadOutlinedIcon />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />

                        {/* Image Preview */}
                        <div className="absolute mt-4">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt="Profile Preview"
                                className="w-32 h-32 object-cover rounded-full border border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Owner Name */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Customer Name</label>
                        <input
                            type="text"
                            className="w-[27rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Customer Name"
                        />
                    </div>

                </div>
                <div className="mt-4 grid grid-cols-8 gap-3">
                    {/* Father Name */}

                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Father Name</label>
                        <input
                            type="text"
                            className="w-[27rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Father Name"
                        />
                    </div>


                </div>

                <div className="mt-4 grid grid-cols-5 gap-3">

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
                <div className=" mt-4 col-span-4">
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                        type="text"
                        className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter City"
                    />
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

                    {/* Residence Phone */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                        <input
                            type="text"
                            className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="+923xxxxxxx"
                        />
                    </div>
                    {/* Front and back cnic */}
                    <div className="mt-6 col-span-2">
                        <label htmlFor="file" className="flex items-center  cursor-pointer text-gray-800 font-semibold">
                            Front & Back CNIC Images
                            <DriveFolderUploadOutlinedIcon />
                        </label>
                        <input
                            type="file"
                            id="file"

                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-8 gap-3">
                    {/* Profession */}
                    <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">Profession</label>
                        <input
                            type="text"
                            className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter Profession"
                        />
                    </div>

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
                    <div className="mt-6 col-span-2">
                        <label htmlFor="file" className="flex items-center  cursor-pointer text-gray-800 font-semibold">
                            Add Driving License Image
                            <DriveFolderUploadOutlinedIcon />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>


                <div className='my-3 text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    Reference Details
                </div>

                <div>
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
                    <div className="my-4 grid grid-cols-5 gap-3">

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
                <div className=" mt-4 col-span-4">
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                        type="text"
                        className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter City"
                    />
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
                 {/* CINC No. */}
                 <div className="col-span-3">
                        <label className="block text-gray-700 font-semibold mb-2">CINC No.</label>
                        <input
                            type="text"
                            className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="35xxx-xxxxxxx-x"
                        />
                    </div>


                </div>
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

export default NewCustomer;