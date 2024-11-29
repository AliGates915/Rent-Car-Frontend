/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function Head() {
    const [head, setHead] = useState("");
    const [headCode, setHeadCode] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [headTypes, setHeadTypes] = useState([]);
    const [fectchingHeadTypes, setfetchingHeadTypes] = useState([]);
    const [companyTypes, setCompanyTypes] = useState([]);
    const [isCompanyTypeDropdownOpen, setIsCompanyTypeDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState("");
    const [description, setDescription] = useState('');
    const [openHead, setOpenHead] = useState(false);

    const dropdownRef = useRef(null);

    const toggleCompanyTypeDropdown = () => {
        setIsCompanyTypeDropdownOpen((prev) => !prev);
    };

    const closeDropdowns = () => {
        setIsCompanyTypeDropdownOpen(false);
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

    const handleCompanyTypeSelect = (companyName) => {
        const selectedCompany = companyTypes.find(company => company.companyName === companyName);

        if (selectedCompany) {
            setSelectedCompanyType(companyName);
            setCompanyCode(selectedCompany.companyCode);
        }

        setIsCompanyTypeDropdownOpen(false);
    };

    const handleHeadChange = (e) => {
        setHead(e.target.value);
    };

    useEffect(() => {
        fetchCompanyTypes();
        fetchHead();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdowns();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                <div className='text-2xl font-extrabold text-[#7339ff] tracking-wide '>
                    MAIN HEADS
                </div>

                <button className='bg-[#5239c3] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#4a32b3]/80'
                    onClick={() => setOpenHead(true)}
                >
                    +
                </button>

            </nav>
            <hr className='bg-gray-400 mb-4' />

            {openHead && (
                <div className="bg-white mx-auto w-[40rem] border my-4 p-4 shadow-xl rounded-md z-50 relative">
                    <button onClick={() => setOpenHead(false)} className="absolute top-2 
                    right-4 text-[#4a32b3] text-xl hover:text-red font-extrabold">
                        X
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Company */}
                        <div>
                            <label className="text-gray-800 font-semibold">Company</label>
                            <div ref={dropdownRef} className="relative">
                                <div
                                    className="flex items-center justify-between w-[22rem] border rounded px-2 py-2 cursor-pointer"
                                    onClick={toggleCompanyTypeDropdown}
                                >
                                    <input
                                        type="text"
                                        className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                        value={selectedCompanyType || "Select Company Name"}
                                        readOnly
                                    />
                                    <span className="ml-2 text-gray-800">▼</span>
                                </div>
                                {isCompanyTypeDropdownOpen && (
                                    <div className="absolute mt-1 w-[22rem] bg-white shadow-xl rounded max-h-40 overflow-auto z-50">
                                        <ul className="divide-y divide-gray-100">
                                            {companyTypes.map((company, index) => (
                                                <li
                                                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                    key={index}
                                                    onClick={() => handleCompanyTypeSelect(company.companyName)}
                                                >
                                                    {company.companyName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Company Code */}
                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={companyCode}
                                    className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Head */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-gray-800 font-semibold">Head</label>
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none w-[22rem] border rounded px-2 py-2"
                                placeholder="Enter Head"
                                value={head}
                                onChange={handleHeadChange}
                            />
                        </div>
                        {/* Head Code */}
                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    placeholder='Auto Generate'
                                    value={headCode}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-transparent text-sm text-gray-800 outline-none w-[34.5rem] border rounded px-2 py-2"
                                placeholder="Enter Description"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-[#5239c3] hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#4a32b3]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className=" max-w-full mx-10">
                <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                    <thead className="text-sm bg-[#7339ff] text-gray-50">
                        <tr>
                            <th className="border px-1 py-1">SR.#</th>
                            <th className="border px-1 py-1">CODE</th>
                            <th className="border px-4 py-1">COMPANY</th>
                            <th className="border px-5 py-2">HEAD</th>
                            <th className="border px-6 py-2">DESCRIPTION</th>
                            <th className="border px-2 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.isArray(fectchingHeadTypes) && fectchingHeadTypes.length > 0 ? (
                            fectchingHeadTypes.map((head, index) => (
                                <tr key={head._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{head.headCode}</td>
                                    <td className="border px-4 py-2">{head.companyName}</td>
                                    <td className="border px-4 py-2">{head.headName}</td>
                                    <td className="border px-4 py-2">{head.description || ""}</td>
                                    <td className="border px-4 py-3 flex justify-center space-x-4">
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(head._id)}
                                            aria-label={`Edit ${head.head}`}
                                        />
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(head._id)}
                                            aria-label={`Delete ${head.head}`}
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
        </>
    );
}

export default Head;
