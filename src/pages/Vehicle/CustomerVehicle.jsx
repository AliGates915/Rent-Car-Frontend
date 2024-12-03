/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AiFillDelete } from "react-icons/ai";

import ProfileCard from './Customer/ProfileCards'
import axios from "axios";
import IconTooltip from "./Customer/IconTooltip";
import { FaEdit } from "react-icons/fa";
import { PulseLoader } from 'react-spinners';

function CustomerVehicle() {


    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchCustomer = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);
                if (Array.isArray(response.data)) {
                    console.log("Data is an array.");
                    setVehicles(response.data);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setVehicles([]); // Set as empty array if response isn't an array
                }
            } finally {
                setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
            }
        };

        fetchCustomer();
    }, []);


    const handleDelete = async (id) => {
        if (!id) {
            console.error("Head ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this head?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/customer-details/${id}`);
            setHeadTypes(headTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting head:", error);
            }
        }
    };


    useEffect(() => {
        const fetchHeads = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/heads`);
                const heads = response.data;

                const newCodeNumber = heads.length + 1;
                const formattedCode = String(newCodeNumber).padStart(2, '0');
                setHeadCode(formattedCode);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        fetchHeads();
    }, []);


    return (
        <>
            <nav className='flex justify-between my-4 mx-10'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    CUSTOMER DETAILS
                </div>

                <Link to='/new-customer'>
                    <button className='bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    >
                        +
                    </button>
                </Link>

            </nav>
            <hr className='bg-gray-400' />

            {/* New cards */}

            <div className="">
                {isLoading ? (
                    <div className=" flex justify-center mt-48 min-h-screen">
                        <PulseLoader color="#0fdaee" size={15} margin={5} />
                    </div>
                ) : (
                    <div className="min-h-screen p-8">
                        <div className="grid grid-cols-2 gap-6">
                            {vehicles.map((profile, index) => (
                                <ProfileCard
                                    key={index}
                                    name={profile.customerName}
                                    address={profile.referenceName}
                                    avatar={profile.profilePhotoUrl}
                                    company={profile.phone}
                                >
                                    <IconTooltip
                                        icon={profile.totalTransactions || 0}
                                        tooltipText="Total Transactions"
                                    />
                                    <div className="mt-4 flex space-x-2 text-md">
                                        <button className="bg-blue hover:bg-[#005a59]
                                         text-white px-3 py-1 
                                    rounded-full ">
                                            <FaEdit size={20}/>
                                        </button>
                                            <button className="bg-blue 
                                            hover:bg-[#005a59] text-white px-3 py-3 
                                    rounded-full ">
                                                < AiFillDelete size={20} 
                                                    onClick={() => handleDelete(profile._id)}
                                                />
    
                                            </button>
                                        
                                        <button className="bg-green hover:bg-[#005a59]  text-white px-2 py-2  rounded-full ">
                                            Complete Profile
                                        </button>
                                    </div>
                                </ProfileCard>
                            ))}


                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CustomerVehicle;
