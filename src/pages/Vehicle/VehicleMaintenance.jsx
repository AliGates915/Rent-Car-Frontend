/* eslint-disable react/react-in-jsx-scope */
import { useState,useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function VehicleMaintenanceType() {
    const [vehicleMaintenance, setVehicleMaintenanceTypes] = useState("");
    const [fetchVehicleMaintenance, setFetchVehicleMaintenance] = useState([]);
    const [openHead, setOpenHead] = useState(false)
    
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicleMaintenance`);

                console.log("Response Data:", response.data); // Log the response data

                if (Array.isArray(response.data)) {
                    console.log("Data is an array.");
                    setFetchVehicleMaintenance(response.data);
                } else {
                    console.error("Data is not an array. Resetting to empty array.");
                    setFetchVehicleMaintenance([]); // Set as empty array if response isn't an array
                }
            } catch (error) {
                console.error("Error fetching vehicle types:", error.message);
                setFetchVehicleMaintenance([]); // Fallback to prevent error
            }
        };

        fetchVehicleTypes();


    }, [vehicleMaintenance]);

    const handleSave = async () => {
        if (!vehicleMaintenance) {
            alert("Enter vehicle maintenance types");
            return;
        }

        const dataToSend = {
            vehicleMaintenance,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/vehicleMaintenance`, dataToSend);
            setVehicleMaintenanceTypes([...vehicleMaintenance, response.data]);
            setVehicleMaintenanceTypes('')
            alert("Data is successfully saved.");
        } catch (error) {
            console.error("Error saving head:", error);
            alert(error);
        }
    };

    const handleEdit = async (id) => {
        const updatedVehicle = prompt("Enter the new vehicleMaintenance name:");
        if (!updatedVehicle) return;
    
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/vehicleMaintenance/${id}`,
            { vehicleTypes: updatedVehicle }
          );
    
          if (response.status === 200) {
            // Update the specific item in the list
            setFetchVehicleMaintenance((prevList) =>
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
    if (!window.confirm("Are you sure you want to delete this vehicleMaintenance?"))
      return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/vehicleMaintenance/${id}`);
      setFetchVehicleMaintenance((prevList) =>
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
                    Vehicle Maintenance Types
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
                                Vehicle Maintenance Type
                            </label>

                            <div
                                className="flex items-center justify-between w-[22rem] border rounded 
                                    px-2 py-2 cursor-pointer"
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none
                                        w-full"
                                    value={vehicleMaintenance}
                                    onChange={(e) => setVehicleMaintenanceTypes(e.target.value)}

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
                            <th className="border px-1 py-1">VEHICLE MAINTENANCE TYPE</th>
                            <th className="border px-2 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.isArray(fetchVehicleMaintenance) && fetchVehicleMaintenance.length > 0 ? (
                            fetchVehicleMaintenance.map((vehicle, index) => (
                                <tr key={vehicle._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{vehicle.vehicleMaintenance}</td>
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

export default VehicleMaintenanceType;
