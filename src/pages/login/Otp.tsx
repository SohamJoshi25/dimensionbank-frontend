import React, { useState } from 'react'
import { useUserContext } from '../../common/contexts/UserProvider';
import { toast } from 'sonner';
import { validateOTP } from './utils/axios';
import { useNavigate } from 'react-router-dom';


const otp = () => {

  const navigate = useNavigate();
  const user = useUserContext()

  const [otp, setOtp] = useState("");
  const [name,setName] = useState(user.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!(otp.trim())){
      return toast.error("OTP cannot be empty.")
    }
    const token = await validateOTP(otp,name,user.email);

    if(!token){
      setOtp("");
      return toast.error("Authentication Failed")
    }

    localStorage.setItem("token",token)
    user.setToken(token);
    user.setName(name)

    toast.success("Authentication Successful")
    navigate("/dashboard")
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[#24517E]'>
    <form className='flex flex-col p-10 bg-[#E5E6ED] text-center rounded-lg min-w-80 shadow-2xl' onSubmit={handleSubmit}>
      <span className='text-2xl mb-10 font-semibold'>Dimention Bank</span>
      <input className='text-center h-10 border-1 mb-5 rounded-md outline-none' type="text" placeholder='Enter Your Name' disabled={user.name ? true : false} value={name} onChange={(event)=>{setName(event.target.value)}}/>
      <input className='text-center h-10 border-1 mb-5 rounded-md outline-none' type="number" placeholder='Enter 6 Digit OTP' value={otp} onChange={(event)=>{setOtp(event.target.value)}}/>
      <input className='p-2 bg-[#dedfe6] rounded-sm hover:bg-[#cdced4] text-slate-800' type='submit' value="Login"/>
    </form>
  </div>
  )
}

export default otp