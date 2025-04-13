import React, { forwardRef } from "react";
import { useUserContext } from "../../../../common/contexts/UserProvider";

const UserDetail = forwardRef((props, ref) => {
    const user = useUserContext();
  return (
    <div className="bg-transparent backdrop-blur-[2px] w-full absolute h-screen">
      <div className="flex flex-row justify-center items-center h-full">
        <div
          className="flex flex-col p-10 bg-white text-center rounded-lg min-w-80 shadow-2xl"
          ref={ref}
        >
          <span className="text-2xl mb-10 font-semibold">User Detail</span>
          <div className="flex flex-col text-left text-lg gap-2">
            <span>Name : {user.name}</span>
            
            <span>Email : {user.email}</span>
            <span>Date of Creation : {user.createdAt}</span>
            <button className="bg-red-200 hover:bg-red-300 w-fit p-2 rounded-md text-sm ml-auto mt-4">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserDetail;
