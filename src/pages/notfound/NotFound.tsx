import React from 'react'
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col justify-center items-center h-dvh'>
            <div className="flex flex-col justify-center items-center p-10 ">
                <span className="text-3xl">404 : Page Not Found </span>
                <span className="ml-auto cursor-pointer text-[#2a2a2a] hover:text-black" onClick={() => navigate("/")}>Go Home</span>
            </div>
        </div>
    )
}

export default NotFound