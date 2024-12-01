// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const ProfileCard = ({ name, icon, address, avatar, company, children  }) => {
  return (
    <>
      <div className=" duration-500 hover:scale-105 hover:shadow-xl shadow-gray-400 relative bg-white text-gray-800 shadow-lg rounded-lg  
      mx-auto w-full">
      
        <div className="p-4 mt-4 flex justify-between">
          <div className="flex-shrink-1">
            <img
              className="rounded-full h-40 w-40  object-cover"
              src={avatar}
              alt={`${name}'s Avatar`}
            />
          </div>

          <div className="mt-4">
            <div className="">Owner Name : 
              <span className="font-bold text-xl ml-4 text-Green">{name}</span>
            </div>
            <div className="">Phone No. :
            <span className="ml-14 text-slate-400">{company}</span>
            </div>
            <div className="mt-2"> Total Vehicles :
              
            <span className="ml-7 text-orange-600 font-bold">{address}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
