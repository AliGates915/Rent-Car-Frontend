/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function VehicleType() {
    const [vehicleTypes, setVehicleTypes] = useState("");
    const [vehicleTypeList, setVehicleTypeList] = useState([]);
    const [openHead, setOpenHead] = useState(false)


    const handleSave = async () => {
        if (!vehicleTypes) {
          alert("Enter vehicle type");
          return;
        }
    
        const dataToSend = {
          vehicleTypes,
        };
    
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/vehicleType`,
            dataToSend
          );
          setVehicleTypeList([...vehicleTypeList, response.data]); // Append the new item to the list
          setVehicleTypes(""); // Reset input field
          alert("Data is successfully saved.");
        } catch (error) {
          console.error("Error saving vehicle type:", error);
          alert("Error saving vehicle type.");
        }
      };
    

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/vehicleType");

                console.log("Response Data:", response.data); // Log the response data

                if (Array.isArray(response.data)) {
                    console.log("Data is an array.");
                    setVehicleTypeList(response.data);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setVehicleTypeList([]); // Set as empty array if response isn't an array
                }
            } catch (error) {
                console.error("Error fetching vehicle types:", error.message);
                setVehicleTypeList([]); // Fallback to prevent error
            }
        };

        fetchVehicleTypes();


    }, [vehicleTypes]);


    const handleEdit = async (id) => {
        const updatedVehicle = prompt("Enter the new Vehicle name:");
        if (!updatedVehicle) return;
    
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/vehicleType/${id}`,
            { vehicleTypes: updatedVehicle }
          );
    
          if (response.status === 200) {
            // Update the specific item in the list
            setVehicleTypeList((prevList) =>
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/vehicleType/${id}`);
      setVehicleTypeList((prevList) =>
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
                    Vehicle Types
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
                    <div className="mb-4">
                        {/* Company */}
                        <div>
                            <label className="text-gray-800 font-semibold my-4">
                                Vehicle Type
                            </label>

                            <div
                                className="flex items-center justify-between w-[22rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={vehicleTypes}
                                    onChange={(e) => setVehicleTypes(e.target.value)}

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
                </div>
            )}

            <div className=" max-w-full mx-10">
                <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                    <thead className="text-sm bg-[#0096FF] text-gray-50">
                        <tr>
                            <th className="border px-1 py-1">SR.#</th>
                            <th className="border px-1 py-1">VEHICLE TYPE</th>
                            <th className="border px-2 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.isArray(vehicleTypeList) && vehicleTypeList.length > 0 ? (
                            vehicleTypeList.map((vehicle, index) => (
                                <tr key={vehicle._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{vehicle.vehicleTypes}</td>
                                    <td className="border px-4 py-3 flex justify-center space-x-4">
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(vehicle._id)}
                                            aria-label={`Edit ${vehicle.vehicle}`}
                                        />
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(vehicle._id)}
                                            aria-label={`Delete ${vehicle.vehicle}`}
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

export default VehicleType;
