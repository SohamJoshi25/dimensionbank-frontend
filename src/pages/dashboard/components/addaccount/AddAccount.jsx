import React, { forwardRef, useState } from "react";
import { createAccount } from "../../utils/axios";
import { useUserContext } from "../../../../common/contexts/UserProvider";


const AddAccount = forwardRef((props, ref) => {
  const user = useUserContext();

  const [balance, setBalance] = useState(0)

  const handle = async () => {
    await createAccount(user.token,balance)
    window.location.reload();
  }
  return (
    <div className="bg-transparent backdrop-blur-[2px] w-full absolute h-screen">
      <div className="flex flex-row justify-center items-center h-full">
        <div
          className="flex flex-col p-10 bg-white text-center rounded-lg min-w-80 shadow-2xl"
          ref={ref}
        >
          <span className="text-2xl mb-10 font-semibold">Add an Account</span>
          <input
            className="text-center h-10 border mb-5 rounded-md outline-none"
            type="number"
            placeholder="Initial Balance"
            value={balance}
            onChange={(e) => {setBalance(e.target.value)}}
          />
          <button className="p-2 bg-[#dedfe6] rounded-sm hover:bg-[#cdced4] text-slate-800" onClick={handle}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
});

export default AddAccount;
