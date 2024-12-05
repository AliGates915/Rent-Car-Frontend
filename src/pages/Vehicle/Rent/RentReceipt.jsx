/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
import jsPDF from 'jspdf';

function RentVehicle() {
    const navigate = useNavigate();
    const [regDate, setRegDate] = useState('')
    const [serialNo, setSerialNo] = useState();
    const [customerInfo, setCustomerInfo] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState({
        customerName: "",
        cinc: "",
        address: "",
        city: "",
        DrivingLicense: "",
        mobileNo: "",
        phone: "",
        referenceName: "",
        profilePhotoUrl: "",
        referenceMobile: "",

    });
    const [vehicleInfo, setVehiclesInfo] = useState([]);
    const [rentInfo, setRentInfo] = useState([]);
    const [selectedRegistration, setSelectedRegistration] = useState("");
    const [selectedRent, setSelectedRent] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState({
        registrationNo:"",
        carType: "",
        carMake: "",
        carModel: "",
        color: "",
        yearOfModel: "",
        transmissionType: "",
        engineCapacity: "",
        chassisNo: "",
        engineNo: "",
        ratePerDay: "",
        photos: "",

    });
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
    const [wheelPanna, setWheelPanna] = useState(false)
    const [mudFlaps, setMudFlaps] = useState(false)
    const [floorMat, setFloorMat] = useState(false)
    const [selfDriver, setSelfDriver] = useState(false)
    const [withDriver, setWithDriver] = useState(false)
    const [dateFrom, setDateFrom] = useState("");
    const [cityFrom, setCityFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [totalDays, setTotalDays] = useState(0);
    const [meterReading, setMeterReading] = useState("");
    const [vehicleOutDate, setVehicleOutDate] = useState("");
    const [vehicleOutTime, setVehicleOutTime] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [advanceAmount, setAdvanceAmount] = useState("");
    const [balanceAmount, setBalanceAmount] = useState("");

    const [ratePerDay, setRatePerDay] = useState(selectedVehicle?.ratePerDay || 1000);
    const [Loading, setLoading] = useState(false);

    // Handle All the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            regDate,
            serialNo,
            rentInfo: selectedRent,
            customerInfo: selectedCustomerInfo,
            vehicleInfo: selectedVehicle,
            features: {
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
                selfDriver,
                withDriver,
                floorMat,
            },
            rentalInfo: {
                dateFrom,
                cityFrom,
                dateTo,
                cityTo,
                totalDays,
                meterReading,
                vehicleOutDate,
                vehicleOutTime,
                totalAmount,
                advanceAmount,
                balanceAmount,
            },
        };

        console.log("data send ",formData)

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/rent-receipt`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            // Generate PDF after successful submission
            generatePDF(formData);
            console.log('Vehicle data submitted successfully:', response.data);
            navigate('/rent-vehicle')

            // Optional: Simulated delay for UX purposes (optional)
            setTimeout(() => {
                setLoading(false);
                // alert('Data saved successfully!');
                resetForm()
            }, 2000);

        } catch (error) {
            console.error(
                'Error:',
                error.response?.data || error.message // Log detailed error message
            );
            alert(error.response?.data?.message || "An error occurred. Please try again.");
            setLoading(false); // Ensure loading is stopped in case of an error
        }
    };

    console.log("Vehicle Info", selectedVehicle)
    // current date
    useEffect(() => {
        // Current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];
        setRegDate(currentDate);
    }, []);
    // Reset form fields
    const resetForm = () => {

    };

    // Customer Data fetch
    useEffect(() => {
        const fetchDataForCustomer = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);
                console.log("Response ", response.data)
                if (Array.isArray(response.data)) {
                    setCustomerInfo(response.data); // Update the vehicleInfo state
                }
            } catch (error) {
                console.error("Error fetching vehicle data:", error.message);
            }
        };

        fetchDataForCustomer();
    }, []);

    //   handle customer selection
    const handleCustomerSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedCustomer(selectedValue);

        const selectedCustomerData = customerInfo.find(
            (customer) => customer.customerName === selectedValue
        );

        if (selectedCustomerData) {
            setSelectedCustomerInfo({
                customerName: selectedCustomerData.customerName,
                cinc: selectedCustomerData.cinc,
                address: selectedCustomerData.address,
                carModel: selectedCustomerData.carModel,
                DrivingLicense: selectedCustomerData.DrivingLicense,
                city: selectedCustomerData.city,
                mobileNo: selectedCustomerData.mobileNo,
                phone: selectedCustomerData.phone,
                referenceName: selectedCustomerData.referenceName,
                referenceMobile: selectedCustomerData.referenceMobile,
                profilePhotoUrl: selectedCustomerData.profilePhotoUrl,
            });
        }
    };

    // registration base data fetch
    useEffect(() => {
        const fetchDataForCarType = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle-details`);
                console.log("Response ", response.data)
                if (Array.isArray(response.data)) {
                    setVehiclesInfo(response.data); // Update the vehicleInfo state
                }
            } catch (error) {
                console.error("Error fetching vehicle data:", error.message);
            }
        };

        fetchDataForCarType();
    }, []);

    // rent base data fetch
    useEffect(() => {
        const fetchDataForCarType = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rentType`);
                console.log("Response ", response.data)
                if (Array.isArray(response.data)) {
                    setRentInfo(response.data); // Update the vehicleInfo state
                }
            } catch (error) {
                console.error("Error fetching vehicle data:", error.message);
            }
        };

        fetchDataForCarType();
    }, []);

    //   handle registration selection
    const handleRegistrationSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedRegistration(selectedValue);

        const selectedVehicleData = vehicleInfo.find(
            (vehicle) => vehicle.registrationNo === selectedValue
        );

        if (selectedVehicleData) {
            setSelectedVehicle({
                yearOfModel: selectedVehicleData.yearOfModel,
                registrationNo: selectedVehicleData.registrationNo,
                color: selectedVehicleData.color,
                carType: selectedVehicleData.carType,
                carMake: selectedVehicleData.carMake,
                carModel: selectedVehicleData.carModel,
                transmissionType: selectedVehicleData.transmissionType,
                engineCapacity: selectedVehicleData.engineCapacity,
                chassisNo: selectedVehicleData.chassisNo,
                engineNo: selectedVehicleData.engineNo,
                ratePerDay: selectedVehicleData.ratePerDay,
                photos: selectedVehicleData.photos[0],
            });
            console.log(ratePerDay);

        }
    };

    //   handle Rent selection
    const handleRentSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedRent(selectedValue);
    };

    // serial no generate 
    useEffect(() => {
        const fetchSerialNo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rent-receipt`);
                console.log("Response:", response.data);

                if (response.data.length === 0) {
                    setSerialNo(1); // Start from 1 if no data exists
                } else {
                    // Find the highest serialNo in the array of objects
                    const lastSerial = response.data.reduce((max, item) => {
                        if (item.serialNo != null) {
                            // Convert serialNo to a number explicitly
                            const serialNumber = Number(item.serialNo);
                            return serialNumber > max ? serialNumber : max;
                        }
                        return max;
                    }, 0);

                    setSerialNo(lastSerial + 1); // Increment by 1
                    console.log("serial", lastSerial + 1); // Ensure serial is updated correctly
                }
            } catch (error) {
                console.error("Error fetching serial number:", error);
                setSerialNo(1); // Default to 1 in case of error
            }
        };


        fetchSerialNo();
    }, [serialNo]);

    console.log("data", selectedCustomerInfo);

    // Function to handle date change and calculate total days
    const handleDateChange = (from, to) => {
        if (from && to) {
            const startDate = new Date(from);
            const endDate = new Date(to);
            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include the end date
            setTotalDays(diffDays >= 0 ? diffDays : 0); // Ensure no negative days
        } else {
            setTotalDays(0); // Reset total days if either date is missing
        }
    };


    // Effect to recalculate total amount when dates or rate change
    useEffect(() => {
        const total = totalDays * ratePerDay;
        console.log("Amount", totalDays);

        setTotalAmount(total);
        setBalanceAmount(total - advanceAmount); // Recalculate balance
    }, [totalDays, ratePerDay, advanceAmount]);

    useEffect(() => {
        setRatePerDay(selectedVehicle.ratePerDay); // Update rate per day if it changes
    }, [selectedVehicle]);



    // Generate PDF
    const generatePDF = async (data) => {
        const doc = new jsPDF();
        const margin = 20; // Consistent margin
        const pageWidth = doc.internal.pageSize.getWidth();
        const lineSpacing = 8; // Consistent line spacing
        let yPosition = margin + 5;
      
        // Format Date Function
        const formatDate = (dateString) => {
          if (!dateString) return 'N/A';
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
      
        // ====== PAGE 1: Title Section ====== //
        doc.setFontSize(12);
        doc.text(`Serial No.: ${data.serialNo || 'N/A'}`, 20, 28);
      
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Vehicle Rental Receipt', pageWidth / 2, margin, { align: 'center' });
      
        // Separator Line
        doc.setLineWidth(0.5);
        doc.line(margin, 30, pageWidth - margin, 30);
        yPosition = 40;
      
        // ====== CUSTOMER INFORMATION ====== //
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Customer Information', margin, yPosition);
        yPosition += lineSpacing;
      
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(`Name: ${selectedCustomerInfo.customerName || 'N/A'}`, margin, yPosition);
        doc.text(`CINC: ${selectedCustomerInfo.cinc || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Mobile: ${selectedCustomerInfo.mobileNo || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Address: ${selectedCustomerInfo.address || 'N/A'}`, margin, (yPosition += lineSpacing));
      
        // Customer Image (if available)
        if (selectedCustomerInfo.profilePhotoUrl) {
          doc.addImage(selectedCustomerInfo.profilePhotoUrl, 'JPEG', pageWidth - 70, margin + 10, 50, 50);
        } else {
          doc.text('Profile Photo not available.', margin, (yPosition += lineSpacing));
        }
      
        yPosition += 14;
      
        // ====== VEHICLE INFORMATION ====== //
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Vehicle Information', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        yPosition += lineSpacing;
      
        doc.text(`Car Make: ${selectedVehicle.carMake || 'N/A'}`, margin, yPosition);
        doc.text(`Car Model: ${selectedVehicle.carModel || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Year of Model: ${selectedVehicle.yearOfModel || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Car Color: ${selectedVehicle.color || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Engine No: ${selectedVehicle.engineNo || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Chassis No: ${selectedVehicle.chassisNo || 'N/A'}`, margin, (yPosition += lineSpacing));
      
        // Vehicle Image (if available)
        if (selectedVehicle.photos) {
          doc.addImage(selectedVehicle.photos, 'JPEG', pageWidth - 70, yPosition - 50, 60, 50);
        } else {
          doc.text('Vehicle Photo not available.', margin, (yPosition += 60));
        }
      
        yPosition += 12;
      
        // ====== RENTAL INFORMATION ====== //
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Rental Information', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        yPosition += lineSpacing;
      
        doc.text(`Date From: ${formatDate(data.rentalInfo.dateFrom)}`, margin, yPosition);
        doc.text(`Date To: ${formatDate(data.rentalInfo.dateTo)}`, margin, (yPosition += lineSpacing));
        doc.text(`Total Days: ${data.rentalInfo.totalDays || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`From City: ${data.rentalInfo.cityFrom || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`To City: ${data.rentalInfo.cityTo || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Meter Reading: ${data.rentalInfo.meterReading || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Total Amount: ${data.rentalInfo.totalAmount || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Advance Amount: ${data.rentalInfo.advanceAmount || 'N/A'}`, margin, (yPosition += lineSpacing));
        doc.text(`Balance Amount: ${data.rentalInfo.balanceAmount || 'N/A'}`, margin, (yPosition += lineSpacing));
         
        yPosition += 12;    
        // ====== DRIVING LICENSE ====== //
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Driving License Certificate', margin, yPosition);
        yPosition += lineSpacing;
      
        if (selectedCustomerInfo.DrivingLicense) {
          doc.addImage(selectedCustomerInfo.DrivingLicense, 'JPEG', pageWidth - 150, yPosition + 5, 70, 45);
        } else {
          doc.text('Driving License not available.', margin, (yPosition += 30));
        }

        // ====== NEW PAGE ====== //
        doc.addPage();
      
        yPosition = margin;
      
        // ====== FEATURES SECTION ====== //
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Features', margin, yPosition);
        yPosition += lineSpacing;
      
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        Object.keys(data.features).forEach((feature) => {
          const featureStatus = data.features[feature] ? 'Yes' : 'No';
          doc.text(`${feature}: ${featureStatus}`, margin, (yPosition += lineSpacing));
        });
      
        // ====== Save PDF ====== //
        doc.save(`Rental_Receipt_${data.serialNo}.pdf`);
      };
      
    // Total Amount Calculation depend on the Days x RatePerDay

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


            {Loading ? (
                <div className=" flex justify-center mt-48 min-h-screen">
                    <FadeLoader
                        color="#0095ff"
                        radius={2}
                    />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="bg-white mx-auto w-[60rem] border my-4 p-6 shadow-xl rounded-md z-50 relative">
                        <div className="grid grid-cols-8 gap-3 px-4">
                            {/* Serial No. */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Serial No.</label>
                                <input
                                    type="number"
                                    readOnly
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    value={serialNo}
                                />
                            </div>

                            {/* Registration Date */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Date</label>
                                <input
                                    type="date"
                                    value={regDate}
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
                                        className="w-full bg-transparent border-none focus:outline-none cursor-pointer t
                                ext-gray-700"
                                        value={selectedCustomer}
                                        required
                                        onChange={handleCustomerSelect}
                                    >
                                        <option value="" disabled>
                                            Customer Name
                                        </option>
                                        {customerInfo.length > 0 ? (
                                            customerInfo.map((customer, index) => (
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
                        </div>

                        <div className="mt-4 grid grid-cols-8 gap-3 px-4">
                            {/* CINC No. */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold 
                                mb-2">CINC No.</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedCustomerInfo.cinc || "N/A"}
                                    className="w-[11rem] bg-white border border-gray-300 
                                    rounded-md px-3 py-2 text-sm focus:outline-none "
                                />
                            </div>
                            {/*  Driving License Image */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Driving License Image
                                </label>
                                {selectedCustomerInfo ? (
                                    selectedCustomerInfo.DrivingLicense ? (
                                        <img
                                            src={selectedCustomerInfo.DrivingLicense}
                                            alt="Driving License"
                                            className="w-[11rem] h-auto border border-gray-300 rounded-md"
                                        />
                                    ) : (
                                        <div className="absolute top-40 right-40 w-[14rem] h-[8rem] flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
                                            <p className="text-gray-500 text-sm font-semibold">
                                                Driving License is not Available
                                            </p>
                                        </div>
                                    )
                                ) : null}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-5 gap-3 px-4">

                            {/* Address */}
                            <div className="col-span-4 ">
                                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                <input
                                    type="text"
                                    className="w-[39rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                                    value={selectedCustomerInfo.address || "N/A"}
                                />
                            </div>
                        </div>


                        {/* City */}
                        <div className=" mt-4 col-span-4 px-4">
                            <label className="block text-gray-700 font-semibold mb-2">City</label>
                            <input
                                type="text"
                                readOnly
                                className="w-[12rem] bg-white border border-gray-300 rounded-md
                                 px-3 py-2 text-sm focus:outline-none "
                                value={selectedCustomerInfo.city || "N/A"}
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-8 gap-3 px-4">
                            {/* Mobile No */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Mobile No.</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-[12rem] bg-white border border-gray-300 
                                    rounded-md px-3 py-2 text-sm focus:outline-none "

                                    value={selectedCustomerInfo.mobileNo || "N/A"}
                                />
                            </div>

                            {/* Residence Phone */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-[11rem] bg-white border border-gray-300
                                     rounded-md px-3 py-2 text-sm focus:outline-none "
                                    value={selectedCustomerInfo.phone || "N/A"}
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
                                    className="flex items-center justify-between w-[20rem] "
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-[39rem] bg-white border border-gray-300 
                                        rounded-md px-3 py-2 text-sm focus:outline-none "
                                        value={selectedCustomerInfo.referenceName}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-8 gap-3">
                                {/* Mobile No */}
                                <div className="col-span-3">
                                    <label className="block text-gray-700 font-semibold mb-2">Mobile No.</label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-[12rem] bg-white border border-gray-300 
                                        rounded-md px-3 py-2 text-sm focus:outline-none"
                                        value={selectedCustomerInfo.referenceMobile || "N/A"}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className='my-3 text-2xl px-4 font-extrabold text-[#0096FF] tracking-wide '>
                            Vehicle Information
                        </div>

                        <div className="mb-4 px-4 grid  grid-cols-8 gap-3">
                            {/* Registration No. */}
                            <div className="col-span-2">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Registration No.
                                </label>
                                <div
                                    className="flex items-center justify-between w-[13rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                                >
                                    <select
                                        className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                        value={selectedRegistration}
                                        required
                                        onChange={handleRegistrationSelect}
                                    >
                                        <option value="" disabled>
                                            Registration No.
                                        </option>
                                        {vehicleInfo.length > 0 ? (
                                            vehicleInfo.map((vehicle, index) => (
                                                <option key={index} value={vehicle.registrationNo}>
                                                    {vehicle.registrationNo}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No registration numbers available</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            {/* Rent Type. */}
                            <div className=" ml-4 col-span-2">
                                <label className="block text-gray-700 font-semibold mb-2">
                                        Rent Type
                                </label>
                                <div
                                    className="flex items-center justify-between w-[12rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                                >
                                    <select
                                        className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                        value={selectedRent}
                                        required
                                        onChange={handleRentSelect}
                                    >
                                        <option value="" disabled>
                                            Rent Types
                                        </option>
                                        {rentInfo.length > 0 ? (
                                            rentInfo.map((vehicle, index) => (
                                                <option key={index} value={vehicle.rentTypes}>
                                                    {vehicle.rentTypes}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No registration numbers available</option>
                                        )}
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
                                    px-2 py-2 "
                                >
                                    <input
                                        type="text"

                                        readOnly
                                        className="bg-transparent text-gray-800 
                                        text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.carType}

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
                                    px-2 py-2 "
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.carMake}
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
                                    px-2 py-2"
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.carModel}
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
                                    px-2 py-2"
                                >
                                    <div
                                        className="w-full bg-transparent border-none focus:outline-none cursor-pointer text-gray-700"
                                    >
                                        <input
                                            type="text"
                                            readOnly
                                            className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                            value={selectedVehicle.transmissionType}
                                        />

                                    </div>
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
                                    px-2 py-2 "
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.engineCapacity}
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
                                    px-2 py-2 "
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.chassisNo}
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
                                    px-2 py-2"
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        value={selectedVehicle.engineNo}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex ml-4 flex-wrap my-3 border-2 px-2 py-2 mr-10 gap-3">
                            {/* Checkbox 1 */}
                            <div className="flex items-center mr-12">
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
                            <div className="flex items-center ml-12 mr-2">
                                <label className="text-gray-800 font-semibold">
                                    Heater
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-14 h-[18px] w-5 focus:ring"
                                        checked={heater}
                                        onChange={(e) => setHeater(e.target.checked)}
                                    />
                                </label>
                            </div>

                            {/* Checkbox 3 */}
                            <div className="flex items-center mx-12">
                                <label className="text-gray-800 font-semibold">
                                    Sun Roof
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[44px] h-[18px] w-5 focus:ring"
                                        checked={sunRoof}
                                        onChange={(e) => setSunRoof(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 4 */}
                            <div className="flex items-center ml-2">
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
                            <div className="flex items-center mr-12">
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
                            <div className="flex items-center mx-12">
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
                            <div className="flex items-center mx-2">
                                <label className="text-gray-800 font-semibold">
                                    Rear Camera
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[16px] h-[18px] w-5 focus:ring"
                                        checked={rearCamera}
                                        onChange={(e) => setRearCamera(e.target.checked)}
                                    />
                                </label>
                            </div>

                            {/* Checkbox 8 */}
                            <div className="flex items-center ml-10">
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
                            <div className="flex items-center mr-12">
                                <label className="text-gray-800 font-semibold">
                                    Sterring Lock
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[20px] h-[18px] w-5 focus:ring"
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
                                        className="form-checkbox pt-3 ml-4 h-[18px] w-5 focus:ring"
                                        checked={wheelCup}
                                        onChange={(e) => setWheelCup(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 11 */}
                            <div className="flex items-center mx-3">
                                <label className="text-gray-800 font-semibold">
                                    Spare Wheel
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[12px] h-[18px] w-5 focus:ring"
                                        checked={spareWheel}
                                        onChange={(e) => setSpareWheel(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 12 */}
                            <div className="flex items-center ml-10">
                                <label className="text-gray-800 font-semibold">
                                    Air Compressor
                                    <input
                                        type="checkbox"
                                        className="form-checkbox ml-[14px] h-[18px] w-5 focus:ring"
                                        checked={airCompressor}
                                        onChange={(e) => setAirCompressor(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 13 */}
                            <div className="flex items-center mr-14">
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
                            <div className="flex items-center mx-6">
                                <label className="text-gray-800 font-semibold">
                                    Mud Flaps
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-7 h-[18px] w-5 focus:ring"
                                        checked={mudFlaps}
                                        onChange={(e) => setMudFlaps(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 16 */}
                            <div className="flex items-center ml-8">
                                <label className="text-gray-800 font-semibold">
                                    Floor Mats
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[44px] h-[18px] w-5 focus:ring"
                                        checked={floorMat}
                                        onChange={(e) => setFloorMat(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 17 */}
                            <div className="flex items-center">
                                <label className="text-gray-800 font-semibold">
                                    Self Driven
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[36px] h-[18px] w-5 focus:ring"
                                        checked={selfDriver}
                                        onChange={(e) => setSelfDriver(e.target.checked)}
                                    />
                                </label>
                            </div>
                            {/* Checkbox 18 */}
                            <div className="flex items-center ml-24">
                                <label className="text-gray-800 font-semibold">
                                    With Driver
                                    <input
                                        type="checkbox"
                                        className="form-checkbox pt-3 ml-[22px] h-[18px] w-5 focus:ring"
                                        checked={withDriver}
                                        onChange={(e) => setWithDriver(e.target.checked)}
                                    />
                                </label>
                            </div>
                        </div>


                        {/* Date to from */}
                        <div className="my-5 px-4 grid grid-cols-4">

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
                                        value={dateFrom}
                                        onChange={(e) => {
                                            setDateFrom(e.target.value);
                                            handleDateChange(e.target.value, dateTo);
                                        }}
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

                                        value={dateTo}
                                        onChange={(e) => {
                                            setDateTo(e.target.value);
                                            handleDateChange(dateFrom, e.target.value);
                                        }}
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
                                        value={totalDays}
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

                                        value={cityFrom}
                                        onChange={(e) => setCityFrom(e.target.value)}
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

                                        value={cityTo}
                                        onChange={(e) => setCityTo(e.target.value)}
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

                                        value={meterReading}
                                        onChange={(e) => setMeterReading(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Out Date & Time */}
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

                                        value={vehicleOutDate}
                                        onChange={(e) => setVehicleOutDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Vehicle Out Time */}
                            <div>
                                <label className="text-gray-800 font-semibold my-4">
                                    <div className="flex justify-start gap-1">
                                        Vehicle Out Time
                                    </div>
                                </label>

                                <div
                                    className="flex items-center justify-between w-[13rem] border rounded 
                px-2 py-2 cursor-pointer"
                                >
                                    <input type="time"
                                        className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                        placeholder="HH:MM"
                                        value={vehicleOutTime}
                                        onChange={(e) => setVehicleOutTime(e.target.value)}
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
                                        value={totalAmount}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Advance & Balance */}
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
                                        value={advanceAmount}
                                        onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
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
                                        value={balanceAmount}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Save */}
                        <div className="flex justify-center">
                            <button
                                className="bg-[#0096FF] hover:bg-[#0096FF] 
                                hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
                                text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
       
        </>
    );
}

export default RentVehicle;
