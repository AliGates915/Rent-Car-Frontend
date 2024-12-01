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
    const profiles = [
        {
            name: 'Alexander Pierce',
            role: 'Admin',
            company: 'Tech Innovations Inc.',
            address: '795 Folsom Ave, Suite 600 San Francisco',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        },
        {
            name: 'Nadia',
            role: 'Customer',
            company: 'Fashion Hub',
            address: '1234 Elm St, Brooklyn, NY 11201',
            avatar: 'https://images.pexels.com/photos/694556/pexels-photo-694556.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'Jane',
            role: 'Admin',
            company: 'Creative Solutions',
            address: '4567 Oak St, Chicago, IL 60602',
            avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'Nora',
            role: 'Customer',
            company: 'Health First',
            address: '890 Willow Dr, Los Angeles, CA 90015',
            avatar: 'https://images.pexels.com/photos/3764542/pexels-photo-3764542.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'Alexander',
            role: 'Admin',
            company: 'Global Ventures',
            address: '342 Pine St, Miami, FL 33101',
            avatar: 'https://images.pexels.com/photos/6325964/pexels-photo-6325964.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'Sarah',
            role: 'Customer',
            company: 'Eco Systems',
            address: '789 Maple Ave, Austin, TX 73301',
            avatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'Norman',
            role: 'Admin',
            company: 'Tech Titans',
            address: '152 Elm St, Seattle, WA 98104',
            avatar: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            name: 'John',
            role: 'Customer',
            company: 'Foodies Delight',
            address: '987 Cedar Rd, Denver, CO 80201',
            avatar: 'https://images.pexels.com/photos/6829574/pexels-photo-6829574.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
    ];

    const visibleProfiles = profiles.slice(0, 8);
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


    const handleDelete = (serialNo) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter((product) => product.serialNo !== serialNo));
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
                                        icon={profile.totalTransactions}
                                        tooltipText="Total Transactions"
                                    />
                                    <div className="mt-4 flex space-x-2 text-md">
                                        <button className="bg-blue hover:bg-[#005a59]
                                         text-white px-3 py-1 
                                    rounded-full ">
                                            <FaEdit size={20}/>
                                        </button>
                                        <Link to="/">
                                            <button className="bg-blue 
                                            hover:bg-[#005a59] text-white px-3 py-3 
                                    rounded-full ">
                                                < AiFillDelete size={20} />
                                                
                                            </button>
                                        </Link>
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
