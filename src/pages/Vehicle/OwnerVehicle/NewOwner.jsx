/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
import { FaRegRegistered } from "react-icons/fa6";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function NewOwner() {

    const [pictureUrl, setPictureUrl] = useState(""); 
    const [file, setFile] = useState(null);
    const [regDate, setRegDate] = useState('')
    const [ownerCode, setOwnerCode] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [address, setAddress] = useState('');
    const [cinc, setCNIC] = useState('');
    const [city, setCity] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [vehicleInfo, setVehiclesInfo] = useState([]);
    const [selectedRegistration, setSelectedRegistration] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState({
        carType: "",
        carMake: "",
        carModel: ""
    });


    const [Loading, setLoading] = useState(false);

    // Handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            ownerCode,
            regDate,
            ownerName,
            fatherName,
            cinc,
            address,
            city,
            mobileNo,
            phone,
            profession,
            selectedRegistration,
            carType: selectedVehicle.carType,
            carModel: selectedVehicle.carModel,
            carMake: selectedVehicle.carMake,
            profilePhotoUrl: pictureUrl, // Image URL from Cloudinary
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/owner-details`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Vehicle data submitted successfully:', response.data);

            // Optional: Simulated delay for UX purposes (optional)
            setTimeout(() => {
                setLoading(false);
                alert('Data saved successfully!');
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


    // current date
    useEffect(() => {
        // Current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split('T')[0];
        setRegDate(currentDate);
    }, []);

    // picture upload on the cloudinary 
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error("No file selected");
            return;
        }

        try {
            // Create a FormData object
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload"); // Cloudinary preset

            // Upload to Cloudinary
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/daexycwc7/image/upload",
                data
            );

            // Get the uploaded image URL
            const imageUrl = uploadRes.data.secure_url;

            // Update the state with the uploaded image URL
            setPictureUrl(imageUrl);

            // Reset the file input
            setFile(null);
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setFile(null);
        setRegDate('');
        setOwnerCode('');
        setOwnerName('');
        setFatherName('');
        setAddress('');
        setCNIC('');
        setCity('');
        setMobileNo('');
        setPhone('');
        setPictureUrl('')
        setProfession('');
        setSelectedRegistration('');
        setSelectedVehicle({
            carType: "",
            carMake: "",
            carModel: "",
        });
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

    //   handle registration selection
    const handleRegistrationSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedRegistration(selectedValue);

        const selectedVehicleData = vehicleInfo.find(
            (vehicle) => vehicle.registrationNo === selectedValue
        );

        if (selectedVehicleData) {
            setSelectedVehicle({
                carType: selectedVehicleData.carType,
                carMake: selectedVehicleData.carMake,
                carModel: selectedVehicleData.carModel
            });
        }
    };

    // owner code generate 
    useEffect(() => {
        const fetchNextOwnerCode = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/owner-details`);
            
            if (response.data.length === 0) {
              // If no data, start with ownerCode = 1
              setOwnerCode(1);
            } else {
              // Fetch the owner with the highest ownerCode and increment by 1
              const lastOwner = response.data[response.data.length - 1];
              const lastOwnerCode = lastOwner?.ownerCode || 0;
              setOwnerCode(lastOwnerCode + 1);
            }
            
            console.log("Fetched data:", response.data);
          } catch (error) {
            console.error("Error fetching owner code:", error);
            setOwnerCode(1); // Default to 1 if there's an error fetching data
          }
        };
      
        fetchNextOwnerCode();
      }, []);
      

    return (
        <>
            <nav className='flex justify-between my-4 mx-10'>
                <div className='text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                    OWNER INFO
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
                {Loading ? (
                    <div className=" flex justify-center mt-48 min-h-screen">
                        <FadeLoader
                            color="#0095ff"
                            radius={2}
                        />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-8 gap-3">
                            {/* Owner Code */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Owner Code</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    value={ownerCode}
                                />
                            </div>

                            {/* Registration Date */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Reg. Date</label>
                                <input
                                    type="date"
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    value={regDate}
                                    onChange={(e) => setRegDate(e.target.value)}
                                />
                            </div>
                            {/* Profile Image */}
                            <div className="col-span-2">
                                <label htmlFor="file" className="flex items-center gap-2 cursor-pointer text-gray-800 font-semibold">
                                    Profile Photo
                                    <DriveFolderUploadOutlinedIcon 
                                        onClick={handleUpload} 
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])} // Select the file
                                    style={{ display: "none" }}
                                />

                                {/* Image Preview */}
                                <div className="absolute mt-4">
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file) // Show the preview before upload
                                                : pictureUrl || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" // Show the uploaded image or a placeholder
                                        }
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Owner Name */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Owner Name</label>
                                <input
                                    type="text"
                                    className="w-[27rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter Owner Name"
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
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
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
                                />
                            </div>

                            {/* CNIC No */}
                            <div className="ml-[12rem] col-span-4">
                                <label className="block text-gray-700 font-semibold mb-2">CNIC No.</label>
                                <input
                                    type="text"
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter CNIC No."
                                    value={cinc}
                                    onChange={(e) => setCNIC(e.target.value)}
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-8 gap-3">
                            {/* Mobile No */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Mobile No.</label>
                                <input
                                    type="text"
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter Mobile No."
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                />
                            </div>

                            {/* Residence Phone */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                                <input
                                    type="text"
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter Residence Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Profession */}
                        <div className="mt-4 col-span-4">
                            <label className="block text-gray-700 font-semibold mb-2">Profession</label>
                            <input
                                type="text"
                                className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter Profession"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            />
                        </div>

                        <div className='my-2 text-2xl font-extrabold text-[#0096FF] tracking-wide '>
                            VEHICLE INFORMATION
                        </div>

                        <div>
                            {/* Registration No */}
                            <div>
                                <label className="text-gray-800 font-semibold my-4">
                                    <div className="flex justify-start gap-1">
                                        <FaRegRegistered className="mt-[1px] font-bold items-center" />
                                        Registration No
                                    </div>
                                </label>

                                <div
                                    className="flex items-center justify-between w-[12rem] border rounded 
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
                            <div className="my-3 grid grid-cols-4 gap-6">
                                {/* Car Type */}
                                <div>
                                    <label className=" text-gray-800 font-semibold ">
                                        <div className="flex justify-start gap-1">Car Type</div>
                                    </label>
                                    <div className="flex items-center justify-between 
                                border rounded px-2 py-2 cursor-pointer w-[12rem]">
                                        <input
                                            type="text"
                                            value={selectedVehicle.carType}
                                            readOnly
                                            className="bg-transparent text-gray-800 text-sm outline-none"

                                        />
                                    </div>
                                </div>

                                {/* Car Make */}
                                <div className="ml-16">
                                    <label className="text-gray-800 font-semibold my-4">
                                        <div className="flex justify-start gap-1">Car Make</div>
                                    </label>
                                    <div className="w-[12.5rem] flex items-center justify-between 
                                border rounded px-2 py-2 cursor-pointer">
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedVehicle.carMake}
                                            className="bg-transparent text-gray-800 text-sm 
                                        outline-none 
                                        "
                                        />
                                    </div>
                                </div>

                                {/* Car Model  */}
                                <div className="col-span-2 ml-28">
                                    <label className="text-gray-800 font-semibold my-4">
                                        <div className="flex justify-start gap-1">Car Model</div>
                                    </label>
                                    <div className="flex items-center justify-between border rounded px-2 py-2 cursor-pointer">
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedVehicle.carModel}
                                            className="bg-transparent text-gray-800 text-sm outline-none w-full"

                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-[#0096FF] hover:bg-[#0096FF] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                                
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default NewOwner;
