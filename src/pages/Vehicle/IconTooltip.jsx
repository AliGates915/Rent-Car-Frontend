/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
 const IconTooltip = ({ icon, tooltipText }) => {
    const [showTooltip, setShowTooltip] = useState(false);
  
    return (
      <div
        className="relative flex items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="cursor-pointer">{icon}</span>
        {showTooltip && (
          <div
            className="absolute left-1/2 top-full mb-2 transform -translate-x-1/2 
            whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg z-10"
          >
            {tooltipText}
          </div>
        )}
      </div>
    );
  };

  export default IconTooltip;