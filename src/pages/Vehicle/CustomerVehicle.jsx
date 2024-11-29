/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function CustomerVehicle() {
   

    // random data
    const [products, setProducts] = useState([
        {
            imgSrc: "https://honda.com.pk/images/landingimages/images/city/city1.2.jpg",
            serialNo: "1",
            registerNo: "ABC-123",
            type: "Sedan",
            make: "Honda",
            model: "City",
            status: "Available",
            price: 149,
            originalPrice: 199,
        },
        {
            imgSrc: "https://cache4.pakwheels.com/system/car_generation_pictures/7314/original/Wagon-R.jpg?1677147187",
            serialNo: "2",
            registerNo: "XYZ-456",
            type: "Hatchback",
            make: "Suzuki",
            model: "Wagon R",
            status: "Sold",
            price: 179,
            originalPrice: 229,
        },
        {
            imgSrc: "https://cache4.pakwheels.com/system/car_generation_pictures/6014/original/Suzuki_Cultus_-_PNG.png?1635945515",
            serialNo: "3",
            registerNo: "LMN-789",
            type: "Hatchback",
            make: "Suzuki",
            model: "Cultus",
            status: "Available",
            price: 120,
            originalPrice: 170,
        },
    ]);

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


    const handleHeadChange = (e) => {
        setHead(e.target.value);
    };


    const fetchCompanyTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies`);
            setCompanyTypes(response.data);
            console.log("Fetched company types:", response.data);
        } catch (error) {
            console.error("Error fetching company types:", error);
        }
    };

    const fetchHead = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/heads`);
            // const response = await axios.get(`https://company-backend-delta.vercel.app/api/heads`);
            setfetchingHeadTypes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching packages types:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };






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

            <div className="text-center">
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 
                md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-6 mt-10 mb-5">
                    {products.map((product) => (
                        <div
                            key={product.serialNo}
                            className="w-[22rem] bg-white shadow-xl shadow-gray-400 rounded-xl duration-500 
                            hover:scale-105 hover:shadow-xl relative"
                        >
                            {/* Image */}
                            <img
                                src={product.imgSrc}
                                alt={product.model}
                                className="h-80 w-[22rem] object-cover rounded-t-xl border-b-2"
                            />

                            {/* Product Info */}
                            <div className="px-4 py-3 w-[22rem]">
                                <span className="text-gray-400 mr-3 uppercase text-xs">
                                    Serial No: {product.serialNo}
                                </span>
                                <p className="text-lg font-bold text-black truncate block capitalize">
                                    {product.make} {product.model}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Register No: {product.registerNo}
                                </p>
                                <p className="text-gray-500 text-sm">Type: {product.type}</p>
                                <p className="text-gray-500 text-sm">Status: {product.status}</p>

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
                                    onClick={() => handleDelete(product.serialNo)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                >
                                    <AiFillDelete size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}

export default CustomerVehicle;
