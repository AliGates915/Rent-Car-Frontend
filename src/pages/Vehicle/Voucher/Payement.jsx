/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import {
    FadeLoader
} from 'react-spinners';


function Payment() {
    const [rentTypes, setRentTypes] = useState("");
    const [fetchCustomer, setFetchCustomer] = useState([]);
    const [openHead, setOpenHead] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState('');

    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [fetchRentTypes, setFetchRentTypes] = useState([
        {
            _id: "1",
            voucherNo: "0001",
            date: "2024-12-01",
            customer: "John Doe",
            amount: "5000",
            carRegNo: "ABC-123",
        },
        {
            _id: "2",
            voucherNo: "0002",
            date: "2024-12-02",
            customer: "Jane Smith",
            amount: "7500",
            carRegNo: "XYZ-456",
        },
        {
            _id: "3",
            voucherNo: "0003",
            date: "2024-12-03",
            customer: "Michael Johnson",
            amount: "6200",
            carRegNo: "LMN-789",
        },
    ]);


    // current date 
    useEffect(() => {
        // Current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    // useEffect(() => {
    //     setIsLoading(true);
    //     const fetchVehicleTypes = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/rentType`);

    //             console.log("Response Data:", response.data); // Log the response data

    //             if (Array.isArray(response.data)) {
    //                 console.log("Data is an array.");
    //                 setFetchRentTypes(response.data);
    //             } else {
    //                 console.error("Data is not an array. Resetting to empty array.");
    //                 setFetchRentTypes([]); // Set as empty array if response isn't an array
    //             }
    //         } catch (error) {
    //             console.error("Error fetching vehicle types:", error.message);
    //             setFetchRentTypes([]); // Fallback to prevent error
    //         } finally {
    //             setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
    //         }
    //     };

    //     fetchVehicleTypes();


    // }, [rentTypes]);

    // customer data
    useEffect(() => {
        setIsLoading(true);
        const fetchVehicleTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);

                console.log("Response Data:", response.data); // Log the response data

                if (Array.isArray(response.data)) {
                    console.log("Data is an array.");
                    setFetchCustomer(response.data);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setFetchCustomer([]); // Set as empty array if response isn't an array
                }
            } catch (error) {
                console.error("Error fetching vehicle types:", error.message);
                setFetchCustomer([]); // Fallback to prevent error
            } finally {
                setTimeout(() => setIsLoading(false), 2000); // Stop loading after 2 seconds
            }
        };

        fetchVehicleTypes();


    }, [rentTypes]);

    const handleCustomerSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedCustomer(selectedValue);

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
            // alert("Data is successfully saved.");
        } catch (error) {
            console.error("Error data:", error);
            alert(error);
        }
    };

    const handleEdit = async (id) => {
        const updatedVehicle = prompt("Enter the new Vehicle name:");
        if (!updatedVehicle) return;

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/rentType/${id}`,
                { vehicleTypes: updatedVehicle }
            );

            if (response.status === 200) {
                // Update the specific item in the list
                setFetchRentTypes((prevList) =>
                    prevList.map((vehicle) =>
                        vehicle._id === id
                            ? { ...vehicle, vehicleTypes: updatedVehicle }
                            : vehicle
                    )
                );
                alert("Vehicle updated successfully.");
            }
        } catch (error) {
            console.error("Error updating vehicle type:", error);
        }
    };


    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this vehicle type?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/rentType/${id}`);
            setFetchRentTypes((prevList) =>
                prevList.filter((vehicle) => vehicle._id !== id)
            );
        } catch (error) {
            console.error("Error deleting vehicle type:", error);
        }
    };

    return (
        <>
            <nav className='flex justify-between my-4 mx-10'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    Payment Voucher
                </div>

                <button className='bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80'
                    onClick={() => setOpenHead(true)}
                >
                    +
                </button>

            </nav>
            <hr className='bg-gray-400 mb-4' />

            {openHead && (
                <div className="bg-white mx-auto w-[24rem] border my-4 p-4 shadow-xl rounded-md z-50 relative">
                    <button onClick={() => setOpenHead(false)} className="absolute top-2 
                    right-4 text-[#0096FF] text-xl hover:text-red font-extrabold">
                        X
                    </button>

                    <div className="mb-4 flex justify-between">
                        <div className="">
                            <label className="text-gray-800 font-semibold mb-2 block">
                                Voucher No
                            </label>
                            <input
                                type="text"
                                name="voucherNo"
                                // value={formData.voucherNo}
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-transparent text-gray-800 text-sm outline-none"
                                placeholder="Enter Voucher No"
                            />
                        </div>

                        {/* Date */}
                        <div className="">
                            <label className="text-gray-800 font-semibold mb-2 block">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 bg-transparent text-gray-800 text-sm outline-none"
                            />
                        </div>
                    </div>


                    <div className="mb-4">
                        {/* Customer */}
                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold mb-2 block">
                                Customer
                            </label>
                            <div className="flex items-center justify-between w-[22rem] border rounded px-2 py-2">
                                <select
                                    className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                    value={selectedCustomer}
                                    required
                                    onChange={handleCustomerSelect}
                                >
                                    <option value="" disabled>
                                        Customer Name
                                    </option>
                                    {fetchCustomer.length > 0 ? (
                                        fetchCustomer.map((customer, index) => (
                                            <option key={index} value={customer.customerName}>
                                                {customer.customerName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No registration numbers available</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        

                        {/* Car Registration No */}
                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold mb-2 block">
                                Car Registration No
                            </label>
                            <div className="flex items-center justify-between w-[22rem] border rounded px-2 py-2">
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none w-full"
                                    placeholder="Enter Car Registration No"
                                />
                            </div>
                        </div>
                        {/* Amount */}
                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold mb-2 block">
                                Amount
                            </label>
                            <div className="flex items-center justify-between w-[22rem] border rounded px-2 py-2">
                                <input
                                    type="number"
                                    className="bg-transparent text-gray-800 text-sm outline-none w-full"
                                    placeholder="Enter Amount"
                                />
                            </div>
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
                </div >
            )
            }
            {
                isLoading ? (
                    <div className="flex justify-center mt-48 min-h-screen">
                        <FadeLoader
                            color="#0fdaee" size={15} margin={5} />
                    </div>
                ) : (
                    <div className=" max-w-full mx-10">
                        <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                            <thead className="text-sm bg-[#0096FF] text-gray-50">
                                <tr>
                                    <th className="border w-14 px-1 py-1">SR.#</th>
                                    <th className="border px-1 py-1">VOUCHER NO.</th>
                                    <th className="border px-1 py-1">DATE</th>
                                    <th className="border px-1 py-1">CUSTOMER</th>
                                    <th className="border px-1 py-1">AMOUNT</th>
                                    <th className="border px-1 py-1">CAR REGISTRATION NO.</th>
                                    <th className="border w-40 px-2 py-2">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {Array.isArray(fetchRentTypes) && fetchRentTypes.length > 0 ? (
                                    fetchRentTypes.map((vehicle, index) => (
                                        <tr key={vehicle._id}>
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{vehicle.voucherNo}</td>
                                            <td className="border px-4 py-2">{vehicle.date}</td>
                                            <td className="border px-4 py-2">{vehicle.customer}</td>
                                            <td className="border px-4 py-2">{vehicle.amount}</td>
                                            <td className="border px-4 py-2">{vehicle.carRegNo}</td>
                                            <td className="border px-4 py-3 flex justify-center space-x-4">
                                                <FaEdit
                                                    className="text-blue-600 cursor-pointer"
                                                    onClick={() => handleEdit(vehicle._id)}
                                                    aria-label={`Edit Voucher No. ${vehicle.voucherNo}`}
                                                />
                                                <FaTrashAlt
                                                    className="text-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(vehicle._id)}
                                                    aria-label={`Delete Voucher No. ${vehicle.voucherNo}`}
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
                )
            }
        </>
    );
}

export default Payment;
