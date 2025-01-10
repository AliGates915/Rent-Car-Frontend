import React, { useState } from "react";

const AddPromotion = () => {
  const [status, setStatus] = useState(false);

  const handleSave = () => {
    // Logic for saving the promotion
    console.log("Promotion Saved");
  };

  const handleReset = () => {
    // Logic for resetting the form
    console.log("Form Reset");
  };

  return (
     <> 
      <nav className="flex justify-between my-4 mx-10">
        <div className="text-2xl font-extrabold text-[#0096FF] tracking-wide">
          Add Promotion
        </div>

        <button
          className="bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
          
        >
          +
        </button>
      </nav>
      <hr className="bg-gray-400 mb-4" />

        
    <div className="p-6 min-h-screen">
    <div className="max-w-lg mx-auto bg-gray-100 shadow-md rounded-lg p-6">
        <form>
          {/* Promotion Title */}
          <div className="mb-4">
            <label htmlFor="promotionTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Title
            </label>
            <input
              type="text"
              id="promotionTitle"
              placeholder="e.g. Weekly Discount, Eid Offer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Discount Percentage */}
          <div className="mb-4">
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage
            </label>
            <input
              type="number"
              id="discountPercentage"
              placeholder="Enter Percentage"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Vehicle Select */}
          <div className="mb-4">
            <label htmlFor="vehicleSelect" className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Select
            </label>
            <select
              id="vehicleSelect"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
            >
              <option>Select Vehicles</option>
              {/* Add vehicle options dynamically */}
            </select>
          </div>

          {/* Vehicle Registration */}
          <div className="mb-4">
            <label htmlFor="vehicleRegistration" className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Registration No
            </label>
            <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
              Reg: CA-678_XYZ
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descriptions
            </label>
            <textarea
              id="description"
              placeholder="Enter Expense Details"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300"
              rows="4"
            ></textarea>
          </div>

          {/* Status */}
          <div className="mb-4 flex items-center">
            <label htmlFor="status" className="text-sm font-medium text-gray-700 mr-3">
              Status
            </label>
            <input
              type="checkbox"
              id="status"
              checked={status}
              onChange={() => setStatus(!status)}
              className="toggle-checkbox"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddPromotion;
