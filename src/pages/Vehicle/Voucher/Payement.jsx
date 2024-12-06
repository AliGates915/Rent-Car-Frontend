/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import {
    FadeLoader
} from 'react-spinners';


function Payment() {
    const [paymentTypes, setPaymentTypes] = useState("");
    const [fetchCustomer, setFetchCustomer] = useState([]);
    const [openHead, setOpenHead] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [voucherNo, setVoucher] = useState('');
    const [carRegNo, setCarRegNo] = useState('');


    const [selectedCustomer, setSelectedCustomer] = useState("");
  
  // Customer Data fetch
  useEffect(() => {
    const fetchDataForCustomer = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);
            console.log("Response ", response.data)
            if (Array.isArray(response.data)) {
                setFetchCustomer(response.data); // Update the vehicleInfo state
            }
        } catch (error) {
            console.error("Error fetching vehicle data:", error.message);
        }
    };

    fetchDataForCustomer();
}, []);
    // current date 
    useEffect(() => {
        // Current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);


    const handleCustomerSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedCustomer(selectedValue);

    };
    const handleSave = async () => {
        setIsLoading(true)

        const dataToSend = {
            voucherNo,
            date,
            customerName: selectedCustomer,
            carRegNo,
            amount,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/paymentVoucher`,
                 dataToSend, 
                 { headers: { 'Content-Type': 'application/json' } }
             );
            console.log(response.data);
            
            // alert("Data is successfully saved.");
        } catch (error) {
            console.error("Error data:", error);
            alert(error);
        }finally{
            setTimeout(() => {
                setIsLoading(false);
                // alert('Data saved successfully!');
                resetForm()
            }, 2000);
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
                setPaymentTypes((prevList) =>
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
    // Rest form
    const resetForm = () => {
        setVoucher('')
        setAmount('')
        setCarRegNo('')
        setDate('')
        setSelectedCustomer('')
    }
      // date format
      const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Handle missing date
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // 'en-GB' for DD/MM/YYYY format
    };

    // voucher No.
    useEffect(() => {
        const fetchSerialNo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/paymentVoucher`);
                console.log("Response:", response.data);
    
                if (Array.isArray(response.data)) {
                    setPaymentTypes(response.data);
                }
    
                if (!response.data || response.data.length === 0) {
                    setVoucher(1); // Start from 1 if no data exists
                } else {
                    // Find the latest voucherNo from the backend data
                    const lastSerial = response.data.reduce((max, item) => {
                        if (item.voucherNo != null) {
                            const serialNumber = Number(item.voucherNo);
                            return serialNumber > max ? serialNumber : max;
                        }
                        return max;
                    }, 0);
    
                    setVoucher(lastSerial + 1); // Set the next voucherNo
                    console.log("Next Voucher No (Frontend):", lastSerial + 1);
                }
            } catch (error) {
                console.error("Error fetching serial number:", error);
                setVoucher(1); // Default to 1 in case of error
            } finally {
                setIsLoading(false); // Stop loading indicator
            }
        };
    
        fetchSerialNo();
    }, [paymentTypes]); // Run on component mount only
    
    

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this vehicle type?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/rentType/${id}`);
            setPaymentTypes((prevList) =>
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
                         {/* Voucher No. */}
                        <div className="">
                           
                            <label className="text-gray-800 font-semibold mb-2 block">
                                Voucher No
                            </label>
                            <input
                                type="text"
                                name="voucherNo"
                                value={voucherNo}
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
                                onChange={(e) => setDate(e.target.value)}
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
                                    value={carRegNo}
                                    onChange={(e) => setCarRegNo(e.target.value)}
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
                                    type="text"
                                    value={amount}
                                    required
                                    onChange={(e) => setAmount(e.target.value)}
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
                    <div className=" max-w-full mx-10 mb-8">
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
                                {Array.isArray(paymentTypes) && paymentTypes.length > 0 ? (
                                    paymentTypes.map((vehicle, index) => (
                                        <tr key={vehicle._id}>
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{vehicle.voucherNo}</td>
                                            <td className="border px-4 py-2">{formatDate(vehicle.date)}</td>
                                            <td className="border px-4 py-2">{vehicle.customerName}</td>
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
                                        <td colSpan="5" className="border px-4 font-semibold py-2 
                                         text-center">
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
