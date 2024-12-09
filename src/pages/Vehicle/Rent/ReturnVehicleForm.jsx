import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotateLoader } from "react-spinners";
import SaveVehicle from "./SaveVehilce";
import {Link, useParams} from 'react-router-dom';

const ReturnVehicleForm = ({ vehicleId, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Today's date
    time: new Date().toTimeString().slice(0, 5), // Correct format HH:mm
    condition: "",
    balanceAmount: "",  // Ensure it's properly validated as a number if required
});
const [isLoading, setIsLoading] = useState(false); // Loader
const [isVisible, setIsVisible] = useState(false);
const [isSaved, setIsSaved] = useState(false); // Track if form is saved
const id = useParams();

useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Smooth modal opening
    return () => clearTimeout(timer);
}, []);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e, id) => {
    e.preventDefault();

    // Ensure balanceAmount is properly parsed or validated
    const parsedBalanceAmount = parseFloat(formData.balanceAmount);
    if (isNaN(parsedBalanceAmount)) {
        alert("Balance amount must be a valid number.");
        return; // Prevent submission if the balanceAmount is invalid
    }

    const submitData = {
        date: formData.date,
        time: formData.time,
        balanceAmount: parsedBalanceAmount, // Send as a number if required
        condition: formData.condition,
        rentReceiptId: '674c0914523f3daae0187f79', // Ensure you're passing other fields too
    };

    setIsLoading(true); // Show loader while request is in progress

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/vehicle-details/save-form/${id}`,
            submitData
        );
        console.log('Response:', response.data);
        setIsSaved(true); // Mark form as saved
        setIsLoading(false); // Hide loader
    } catch (error) {
        console.error("Error returning vehicle:", error);
        setIsLoading(false); // Hide loader
        alert("Error submitting the form: " + error.message); // Show error message
    }
};



  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center mt-48 min-h-screen">
          <RotateLoader color="#0fdaee" size={15} margin={5} />
        </div>
      ) : isSaved ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Vehicle Saved Successfully!
          </h2>
          <SaveVehicle />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
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
              />
            </label>

            <div className="mt-4 flex justify-between">
              {/* Cancel button closes the form */}
              <button
                type="button"
                onClick={() => {
                  setIsVisible(false); // Close modal animation
                  setTimeout(onClose, 300); // Close after animation delay
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              
              <Link to='/save-vehicle'> 
              <button
                type="submit"
                className="bg-[#0096FF] hover:font-bold text-white px-4 py-2 rounded hover:bg-[#4a32b3] transition-all"
              >
                Save
              </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReturnVehicleForm;
