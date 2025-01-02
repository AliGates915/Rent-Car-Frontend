/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

function NewCustomer() {
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
    const [cnicPhotos, setCnicPhotos] = useState([]); // Array to store front and back CNIC images
    const [drivingLicenseUrl, setDrivingLicenseUrl] = useState("");
    const [file, setFile] = useState(null);
    const [regDate, setRegDate] = useState('')
    const [ownerCode, setOwnerCode] = useState('');
   
    const [customerName, setCustomerName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [address, setAddress] = useState('');
    const [cinc, setCNIC] = useState('');
    const [city, setCity] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [referenceName, setReferenceName] = useState("")
    const [referenceAddress, setReferenceAddress] = useState('');
    const [referenceCity, setReferenceCity] = useState('')
    const [referenceMobile, setReferenceMobile] = useState('')
    const [referencePhone, setReferencePhone] = useState('')
    const [referenceCINC, setReferenceCINC] = useState('')

    const [Loading, setLoading] = useState(false);

    // Handle All the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            regDate,
            ownerCode,
            customerName,
            fatherName,
            address,
            cinc,
            mobileNo,
            phone,
            profession,
            referenceName,
            referenceAddress,
            referenceCity,
            referenceMobile,
            referencePhone,
            referenceCINC,
            profilePhotoUrl: profilePhotoUrl,
            CINCPhotos: cnicPhotos,
            DrivingLicense: drivingLicenseUrl,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/customer-details`,
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
    const handleFileChange = async (e, setUrlCallback, isMultiple = false) => {
        const files = Array.from(e.target.files); // Convert file list to array
    
        if (isMultiple && files.length !== 2) {
            alert("Please select exactly 2 images for CNIC (front and back).");
            return;
        }
    
        if (isMultiple) {
            try {
                // Upload multiple files
                const uploadedUrls = await Promise.all(
                    files.map(async (file) => {
                        const data = new FormData();
                        data.append("file", file);
                        data.append("upload_preset", "upload"); // Cloudinary preset
                        const uploadRes = await axios.post(
                            "https://api.cloudinary.com/v1_1/daexycwc7/image/upload",
                            data
                        );
                        return uploadRes.data.secure_url;
                    })
                );
                setUrlCallback(uploadedUrls); // Set both uploaded URLs for CNIC
            } catch (err) {
                console.error("Error uploading CNIC images:", err);
            }
        } else {
            // Handle single file upload if necessary
            await handleUpload(files[0], setUrlCallback);
        }
    };
    
    
    const handleUpload = async (file, setUrlCallback) => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload"); // Cloudinary preset
    
            // Upload to Cloudinary
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/daexycwc7/image/upload",
                data
            );
    
            const imageUrl = uploadRes.data.secure_url;
            setUrlCallback(imageUrl); // Set the uploaded image URL
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };
    // Reset form fields
    const resetForm = () => {
        setFile(null);
        setRegDate('');
        setOwnerCode('');
        setAddress('')
        setCNIC('')
        setCity('')
        setCnicPhotos('')
        setCustomerName('')
        setDrivingLicenseUrl('')
        setFatherName('')
        setMobileNo('')
        setProfilePhotoUrl('')
        setProfession('')
        setReferenceCity('')
        setProfilePhotoUrl('')
        setReferenceCity('')
        setReferenceMobile('')
        setReferenceMobile('')
        setReferenceName('')
    };


    // owner code generate 
    useEffect(() => {
        const fetchNextOwnerCode = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer-details`);

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
                    CUSTOMER INFO
                </div>

                <Link to='/customer-details'>
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
                <form onSubmit={handleSubmit} onClick={handleUpload}>


                    <div className="bg-white mx-auto w-[44rem] border my-4 p-6 shadow-xl rounded-md z-50 relative">
                        <div className="grid grid-cols-8 gap-3">
                            {/* Owner Code */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Customer Code</label>
                                <input
                                    type="text"
                                    value={ownerCode}
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    readOnly
                                />
                            </div>

                            {/* Registration Date */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Reg. Date</label>
                                <input
                                    type="date"
                                    value={regDate}
                                    onChange={(e) => setRegDate(e.target.value)}
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Profile Image */}
                            <div className="col-span-2">
                                <label htmlFor="file" className="flex items-center gap-2 
                                cursor-pointer text-gray-800 font-semibold">
                                    Profile Photo
                                    <DriveFolderUploadOutlinedIcon
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setProfilePhotoUrl)} // Select the file
                                    style={{ display: "none" }}
                                />


                                {/* Image Preview */}
                                <div className="absolute mt-4">
                                    <img
                                        src={profilePhotoUrl || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* customer Name */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Customer Name</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
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
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
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
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="04440xxxxxx"
                                />
                            </div>

                            {/* Residence Phone */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="+923xxxxxxx"
                                />
                            </div>
                            {/* Front and back cnic */}
                            <div className="mt-6 col-span-2">
                                <label htmlFor="cnic" className="flex items-center  cursor-pointer text-gray-800 font-semibold">
                                    Front & Back CNIC Images
                                    <DriveFolderUploadOutlinedIcon
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="cnic"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setCnicPhotos, true)}
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
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter Profession"
                                />
                            </div>

                            {/* CINC No. */}
                            <div className="col-span-3">
                                <label className="block text-gray-700 font-semibold mb-2">CINC No.</label>
                                <input
                                    type="text"
                                    value={cinc}
                                    onChange={(e) => setCNIC(e.target.value)}
                                    className="w-[11rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="35xxx-xxxxxxxx-x"
                                />
                            </div>
                            {/*  Driving License Image */}
                            <div className="mt-6 col-span-2">
                                <label htmlFor="drivingLicense" className="flex items-center  cursor-pointer text-gray-800 font-semibold">
                                    Add Driving License Image
                                    <DriveFolderUploadOutlinedIcon
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="drivingLicense"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, setDrivingLicenseUrl)}
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
                                        value={referenceName}
                                        onChange={(e) => setReferenceName(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="my-4 grid grid-cols-5 gap-3">

                                {/* Address */}
                                <div className="col-span-4 ">
                                    <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={referenceAddress}
                                        onChange={(e) => setReferenceAddress(e.target.value)}
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
                                    value={referenceCity}
                                    onChange={(e) => setReferenceCity(e.target.value)}
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
                                        value={referenceMobile}
                                        onChange={(e) => setReferenceMobile(e.target.value)}
                                        className="w-[12rem] bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="04440xxxxxx"
                                    />
                                </div>

                                {/* Residence Phone */}
                                <div className="col-span-3">
                                    <label className="block text-gray-700 font-semibold mb-2">Residence Phone</label>
                                    <input
                                        type="text"
                                        value={referencePhone}
                                        onChange={(e) => setReferencePhone(e.target.value)}
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
                                    value={referenceCINC}
                                    onChange={(e) => setReferenceCINC(e.target.value)}
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
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}

export default NewCustomer;
