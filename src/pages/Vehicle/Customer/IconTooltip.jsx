/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";

 const IconTooltip = ({ icon, tooltipText }) => {
    const [showTooltip, setShowTooltip] = useState(false);
  
    return (
      <div
        className=""
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="cursor-pointer absolute top-3 right-3 bg-red text-white px-2 font-semibold 
        py-1 rounded-full text-xs">{icon}</span>
        {showTooltip && (
          <div
            className="absolute bottom-full left-[80%] transform -translate-x-1/2 
            whitespace-nowrap bg-[#0096ff] text-white text-sm px-2 py-1 
            rounded shadow-lg z-10"
          >
            {tooltipText}
          </div>
        )}
      </div>
    );
  };

  export default IconTooltip;