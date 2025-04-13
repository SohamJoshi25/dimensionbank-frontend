import React, { useState, forwardRef } from "react";
import { deleteAccount } from "../../utils/axios";
import { useUserContext } from "../../../../common/contexts/UserProvider";
import { toast } from "sonner";

const DeleteAccount = forwardRef((props, ref) => {
  const [id, setId] = useState("")
  const user = useUserContext()
  const handleSubmit = async ( ) => {
    if(!(id.trim())){
      toast.error("ID Cannot be null");
      return
    }
    await deleteAccount(user.token,id);
  }
  return (
    <div className="bg-transparent backdrop-blur-[2px] w-full absolute h-screen">
      <div className="flex flex-row justify-center items-center h-full">
        <div
          className="flex flex-col p-10 bg-white text-center rounded-lg min-w-80 shadow-2xl"
          ref={ref}
        >
          <span className="text-2xl mb-10 font-semibold">Delete an Account</span>
          <input
            className="text-center h-10 border mb-5 rounded-md outline-none"
            type="text"
            placeholder="AccountId"
            value={id}
            onChange={(e)=>{setId(e.target.value)}}
          />
          <button className="p-2 bg-[#dedfe6] rounded-sm hover:bg-[#cdced4] text-slate-800" onClick={handleSubmit}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
});

export default DeleteAccount;
