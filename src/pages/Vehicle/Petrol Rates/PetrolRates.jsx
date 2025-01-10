import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import './petrolRate.css';
import axios from "axios";
import { CurrencyContext } from "../../../context/CurrencyContext";
import { FadeLoader } from "react-spinners";

function PetrolRates() {
  const { convertPrice, currency, currencySymbols } = useContext(CurrencyContext);
  
  const [fuelRates, setFuelRates] = useState({
    "Petrol (Super)": 2521,
    "High-speed diesel": 2552,
    "Light-speed diesel": 2400,
    Kerosene: 2100,
    "Liquified petroleum gas (LPG)": 2000,
    "Compressed Natural gas (CNG)": 1800,
  }); // Default rates
  const [fuelType, setFuelType] = useState("");
  const [newRate, setNewRate] = useState(""); 
  const [isEditing, setIsEditing] = useState(null); // Tracks which fuel type is being edited

  const [isLoading, setIsLoading] = useState(false);

  // Handle fuel type selection
  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
    setNewRate(""); // Reset rate input
  };

  // Handle rate input
  const handleRateChange = (event) => {
    setNewRate(event.target.value);
  };

  // Save new rate
  const saveRate = () => {
    if (fuelType && newRate) {
      setFuelRates((prevRates) => ({
        ...prevRates,
        [fuelType]: Number(newRate),
      }));
      setFuelType(""); // Reset selection
      setNewRate(""); // Reset input
    }
  };

  // Edit existing rate
  const handleEdit = (type) => {
    setIsEditing(type); // Set the fuel type being edited
    setNewRate(fuelRates[type]); // Populate input with the existing rate
  };

  // Save edited rate
  const saveEdit = () => {
    if (isEditing && newRate) {
      setFuelRates((prevRates) => ({
        ...prevRates,
        [isEditing]: Number(newRate),
      }));
      setIsEditing(null); // Exit edit mode
      setNewRate(""); // Reset input
    }
  };

  // Delete a rate
  const handleDelete = (type) => {
    if (window.confirm(`Are you sure you want to delete ${type}?`)) {
      setFuelRates((prevRates) => {
        const updatedRates = { ...prevRates };
        delete updatedRates[type];
        return updatedRates;
      });
    }
  };

  return (
    <>
      <nav className="flex justify-between my-4 mx-10">
        <div className="text-2xl font-extrabold text-[#0096FF] tracking-wide">
          Petrol Rates
        </div>

        <button
          className="bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
          onClick={() => setFuelType("")}
        >
          +
        </button>
      </nav>
      <hr className="bg-gray-400 mb-4" />

      <div className="bg-white mx-auto w-[24rem] border my-4 p-4 shadow-xl rounded-md z-50 relative">
        <div className="mb-4">
          {/* Fuel Type Dropdown */}
          <div>
            <label className="text-gray-800 font-semibold my-4">
              {isEditing ? "Edit Fuel Rate" : "Add New Fuel Rate"}
            </label>
            <div>
              <select
                id="fuelType"
                value={fuelType || isEditing || ""}
                onChange={handleFuelTypeChange}
                disabled={!!isEditing}
                className="dropdown"
              >
                <option value="">Select Type</option>
                {Object.keys(fuelRates).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {fuelType || isEditing ? (
                <div className="price-input">
                  <label htmlFor="price">Enter Rate</label>
                  <input
                    type="number"
                    id="price"
                    value={newRate}
                    onChange={handleRateChange}
                    placeholder={`Enter rate for ${fuelType || isEditing}`}
                    className="input-field"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          {isEditing ? (
            <button
              className="bg-[#0096FF] hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full"
              onClick={saveEdit}
            >
              Save Edit
            </button>
          ) : (
            <button
              className="bg-[#0096FF] hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80 text-white 
               text-md font-bold w-40 py-2 mt-2 rounded-full"
              onClick={saveRate}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-48 min-h-screen">
          <FadeLoader color="#0fdaee" size={15} margin={5} />
        </div>
      ) : (
        <div className="max-w-full mx-10 mb-10">
          <table className="min-w-full shadow-xl border-collapse border border-gray-200">
            <thead className="text-sm bg-[#0096FF] text-gray-50">
              <tr>
                <th className="border w-14 px-1 py-1">SR.#</th>
                <th className="border px-1 py-1">FUEL TYPE</th>
                <th className="border px-1 py-1">RATE</th>
                <th className="border w-40 px-2 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {Object.keys(fuelRates).length > 0 ? (
                Object.keys(fuelRates).map((type, index) => (
                  <tr key={type}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{type}</td>
                    <td className="border px-4 py-2">
                      {`${currencySymbols[currency]} ${convertPrice(fuelRates[type])}`}
                    </td>
                    <td className="border px-4 py-3 flex justify-center space-x-4">
                      <FaEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleEdit(type)}
                        aria-label={`Edit ${type}`}
                      />
                      <FaTrashAlt
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(type)}
                        aria-label={`Delete ${type}`}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 font-semibold py-2 text-center">
                    No fuel rates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default PetrolRates;
