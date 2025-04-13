import React, { useState } from 'react'
import { getOTP } from './utils/axios'
import { toast } from 'sonner'
import { useUserContext } from '../../common/contexts/UserProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate  = useNavigate();
  const user = useUserContext()
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault();
    if(!(email.trim())){
      return toast.error("Email cannot be empty.")
    }
    const data = await getOTP(email);
    user.setName(data.name);
    user.setCreatedAt(data.date_of_creation)
    user.setEmail(email);
    navigate("/otp")
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[#24517E]'>
      <form className='flex flex-col p-10 bg-[#E5E6ED] text-center rounded-lg min-w-80 shadow-2xl' onSubmit={handleSubmit}>
        <span className='text-2xl mb-10 font-semibold'>Dimention Bank</span>
        
        <input className='text-center h-10 border-1 mb-5 rounded-md outline-none' type="email" required placeholder='Login with email' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>

        <input className='p-2 bg-[#dedfe6] rounded-sm hover:bg-[#cdced4] text-slate-800' type='submit' value={"Get OTP"}/>
      </form>
    </div>
  )
}

export default Login