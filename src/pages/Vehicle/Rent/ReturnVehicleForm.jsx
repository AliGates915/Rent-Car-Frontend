import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotateLoader  } from "react-spinners";
import SaveVehicle from "./SaveVehilce";

const ReturnVehicleForm = ({ vehicleId, onClose }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0], // Setting today's date
        time: new Date().toTimeString().slice(0, 5), // Correct format HH:mm
        condition: "",
        balanceAmount: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Loader should be false initially
    const [isVisible, setIsVisible] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // State to track if the form is saved

    useEffect(() => {
        // Delay to ensure smooth opening of the modal
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Start the loading state when submitting the form
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/vehicle-details/return-vehicle/${vehicleId}`,
                formData
            );

            console.log("Vehicle returned:", response.data);
            setIsLoading(false); // Stop the loader once the request is complete
            setIsSaved(true); // Set form as saved
            onClose(); // Close the modal on successful submission
        } catch (error) {
            console.error("Error returning vehicle:", error);
            setIsLoading(false); // Stop the loader in case of error
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            style={{
                visibility: isVisible ? "visible" : "hidden",
                opacity: isVisible ? 1 : 0,
            }}
        >
            {isLoading ? (
                <div className="flex justify-center mt-48 min-h-screen">
                    <RotateLoader  color="#0fdaee" size={15} margin={5} />
                </div>
            ) : isSaved ? (
                // Show SaveVehicle component once form is saved
                <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] transition-transform duration-300 transform scale-100">
                    <h2 className="text-2xl font-bold mb-4 text-center">Vehicle Saved Successfully!</h2>
                    <SaveVehicle />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] transition-transform duration-300 transform scale-100">
                    <h2 className="text-2xl font-bold mb-4 text-center">Return Vehicle</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                disabled={isSaved} // Disable inputs after saving
                            />
                        </label>

                        <label className="block mb-2">
                            Time:
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                disabled={isSaved} // Disable inputs after saving
                            />
                        </label>

                        <label className="block mb-2">
                            Condition:
                            <input
                                type="text"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                placeholder="Enter vehicle condition"
                                className="w-full p-2 border rounded"
                                disabled={isSaved} // Disable inputs after saving
                            />
                        </label>

                        <label className="block mb-2">
                            Balance Amount:
                            <input
                                type="number"
                                name="balanceAmount"
                                value={formData.balanceAmount}
                                onChange={handleChange}
                                placeholder="Enter balance amount"
                                className="w-full p-2 border rounded"
                                disabled={isSaved} // Disable inputs after saving
                            />
                        </label>

                        <div className="mt-4 flex justify-between">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                disabled={isSaved} // Disable Cancel button after saving
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#0096FF] hover:font-bold text-white px-4 py-2 rounded hover:bg-[#4a32b3] transition-all"
                                disabled={isSaved} // Disable Save button after saving
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ReturnVehicleForm;
